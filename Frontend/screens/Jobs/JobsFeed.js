import * as React from 'react';
import {FlatList, Image, Pressable, SafeAreaView, Text} from "react-native";
import Job from "../../components/Jobs/Job";
import {useNavigation} from "@react-navigation/native";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {BASE_URL} from "../../config";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import { Button } from 'react-native-paper';
export default function JobsFeedScreen() {
    const[jobOffers,setJobOffers]=useState({})
    const [jobOffersByUser,setJobOffersByUser]=useState({})

    const {userInformation} = useContext(AuthContext)
    const navigation=useNavigation();
    /*
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <Pressable onPress={()=> navigation.openDrawer()}>
                    <Image
                        source={require("../../assets/profile.jpeg")}
                        style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                    />
                </Pressable>
            ),
        });
    },[]);
*/
    useEffect(() => {
        getJobOffersByUser()
        getJobOffers()

    }, []);

    const getJobOffersByUser=()=>
    {
        const url=BASE_URL+"/User/jobOffers/"+userInformation.id
        axios.get(url)
            .then(res => {
                setJobOffersByUser(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    const getJobOffers=()=>
    {
        const url=BASE_URL+"/JobOffer"
        axios.get(url)
            .then(res => {
                setJobOffers(eraseAppliedJobs(res.data))
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    const eraseAppliedJobs=(jobs)=>
    {
        const filteredJobs = [];
        for(let i=0;i<jobs.length; i++)
        {
            if(!jobAlreadyApplied(jobs[i].id))
            {
                filteredJobs.push(jobs[i])
            }
        }
        return filteredJobs
    }

    const jobAlreadyApplied=(id)=>
    {
        for(let i=0;i<jobOffersByUser.length;i++)
        {
            if(jobOffersByUser[i].id===id)
            {
                return true;
            }
        }
        return false;
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {userInformation.role==="admin" && 
            <Button
                style={{ margin: 10 }}
                mode='contained'
                onPress={()=>navigation.navigate("CreateJobScreen")}
            >New Job</Button>
            }
            <FlatList
                data={jobOffers}
                renderItem={({item}) => <Job job={item}/>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    );
}


