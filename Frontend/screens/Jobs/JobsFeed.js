import * as React from 'react';
import {FlatList, Image, Pressable, SafeAreaView, Text} from "react-native";
import {JobsDummy} from "../../data/JobsDummy";
import Job from "../../components/Jobs/Job";
import {useNavigation} from "@react-navigation/native";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {UserDummy} from "../../data/UserDummy";
import {BASE_URL} from "../../config";
import axios from "axios";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {AuthContext} from "../../context/AuthContext";
import { Button } from 'react-native-paper';
export default function JobsFeedScreen() {
    const USER=UserDummy
    const[jobOffers,setJobOffers]=useState(null)
    const {userInformation} = useContext(AuthContext)
    const navigation=useNavigation();
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

    useEffect(() => {
        getJobOffers()
    }, []);
    const getJobOffers=()=>
    {
        const url=BASE_URL+"/JobOffer"
        axios.get(url)
            .then(res => {
                setJobOffers(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
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


