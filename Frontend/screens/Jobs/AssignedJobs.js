import {FlatList, SafeAreaView, Text, View} from "react-native";
import axios from "axios";
import {BASE_URL} from "../../config";
import {useFocusEffect} from "@react-navigation/native";
import * as React from "react";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import Job from "../../components/Jobs/Job";
import AssignedJob from "../../components/Jobs/AssignedJob";
export default function ()
{
    const {userInformation} = useContext(AuthContext)
    const[assignedJobs,setAssignedJobs]=useState({});
    const getAssignedJobs=()=>
    {
        const url=BASE_URL+"/AssignedJob/job/"+userInformation.id
        axios.get(url)
            .then(res => {
                setAssignedJobs(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })

    }
    useFocusEffect(
        React.useCallback(() => {
            getAssignedJobs();
        }, [])
    );
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
                assignedJobs.length>0?(<View style={{ paddingTop: 8 }}>
                    <FlatList data={assignedJobs}
                              renderItem={({item})=><AssignedJob job={item}/>}
                              keyExtractor={item => item.id}
                    />
                </View>):(<Text>No Assigned Jobs</Text>)
            }
        </SafeAreaView>
    )
}