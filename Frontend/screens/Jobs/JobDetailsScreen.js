import { View } from "react-native";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useContext, useLayoutEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {BASE_URL} from "../../config";
import axios from "axios";
import { Button, Text } from "@ui-kitten/components"
import * as React from "react";

export default function JobDetailsScreen() {
    const {userInformation}=useContext(AuthContext)
    const navigation=useNavigation();
    const {navigate}=useNavigation();

    const route=useRoute();
    const{params}=route;
    const job=params.job;
    const[alreadyApplied,setAlreadyApplied]=useState(true);
    useLayoutEffect(()=>
        {
            navigation.setOptions({
                headerTitle:job.name
            })
        }
        ,[])

    useFocusEffect(
        React.useCallback(() => {
            isUserApplying();
        }, [])
    );

    const handelApplyBtn=()=>
    {
        const url=BASE_URL+"/UserJobOffer/update/"+job.id+"/"+userInformation.id
        axios.post(url)
            .then(res => {
                navigation.goBack();
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    const isUserApplying=()=>
    {
        const url=BASE_URL+"/UserJobOffer/"+job.id
        axios.get(url)
            .then(res => {
                userExistsInList(res.data)?setAlreadyApplied(true):setAlreadyApplied(false);
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    function userExistsInList(users) {
        for(let i=0;i<users.length; i++)
        {
            if(userInformation.id===users[i].id)
            {
                return true;
            }
        }
        return false;
    }

    return(
        <View style={{ alignItems: 'center', width: "100%", paddingVertical: 8, paddingHorizontal: 40 }}>
            <Text style={{ fontWeight: "500" }} category='s1'>{job.title}</Text>
            <Text style={{ fontWeight: "400" }} category='s1'>{job.description}</Text>

            {userInformation.role==="admin"?
                <Button style={{ width: "50%", marginTop: 8 }} onPress={()=>{navigate("UsersApplyingToJob",{job});}}>User</Button>:
                (
                    alreadyApplied?
                        <Text>Application in process...</Text>
                :
                <Button style={{ width: "50%", marginTop: 8 }} onPress={handelApplyBtn}>Apply</Button>
                )
            }
        </View>
    )
}