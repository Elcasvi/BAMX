import * as React from 'react';
import {FlatList, SafeAreaView, Text, View} from "react-native";
import {BASE_URL} from "../../config";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import Job from "../../components/Jobs/Job";
import {useFocusEffect} from "@react-navigation/native";

export default function AppliedJobs()
{
    const [jobOffers,setJobOffers]=useState({})
    const [jobAssigned,setJobAssigned]=useState(false)
    const {userInformation} = useContext(AuthContext)

    useFocusEffect(
        React.useCallback(() => {
            getJobOffersByUser()
        }, [])
    );


    const getJobOffersByUser=()=>
    {
        const url=BASE_URL+"/User/jobOffers/"+userInformation.id
        axios.get(url)
            .then(res => {
                setJobOffers(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
            jobOffers.length>0?(<View style={{ paddingTop: 8 }}>
                <FlatList data={jobOffers}
                          renderItem={({item})=><Job job={item}/>}
                />
            </View>):(<Text>No Applied Jobs</Text>)
        }
        </SafeAreaView>
    )
}
