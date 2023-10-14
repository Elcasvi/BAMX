import { SafeAreaView, View} from "react-native";
import axios from "axios";
import {BASE_URL} from "../../config";
import {useFocusEffect} from "@react-navigation/native";
import * as React from "react";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {JobAssigned} from "../../components/Jobs/Job";
import { Divider, List, Text } from "@ui-kitten/components";
import CustomNavigationBar from "../../navigation/CustomNavigationBar";
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
        <>
        <CustomNavigationBar/>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <List
                style={{ width: "100%" }}
                data={assignedJobs}
                ItemSeparatorComponent={Divider}
                renderItem={({item}) => <JobAssigned job={item}/>}
                keyExtractor={item => item.id}
                ListEmptyComponent={<View style={{ height: 200, width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}><Text appearance='hint' category='s1'>No assigned Jobs</Text></View>}
                />
        </SafeAreaView>
        </>
    )
}