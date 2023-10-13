import * as React from 'react';
import {FlatList, SafeAreaView, View } from "react-native";
import {BASE_URL} from "../../config";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {JobApplication} from "../../components/Jobs/Job";
import {useFocusEffect} from "@react-navigation/native";
import { Divider, List, Text } from '@ui-kitten/components';

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
        <List
                style={{ width: "100%" }}
                data={jobOffers}
                ItemSeparatorComponent={Divider}
                renderItem={({item}) => <JobApplication job={item}/>}
                ListEmptyComponent={<View style={{ height: 200, width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}><Text appearance='hint' category='s1'>No applied Jobs</Text></View>}
                />
        </SafeAreaView>
    )
}
