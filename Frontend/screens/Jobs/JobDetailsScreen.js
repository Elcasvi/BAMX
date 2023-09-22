import {Button, SafeAreaView, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import JobContent from "../../components/Jobs/JobContent";
import {useContext, useLayoutEffect} from "react";
import {AuthContext} from "../../context/AuthContext";
import {BASE_URL} from "../../config";
import axios from "axios";

export default function JobDetailsScreen() {
    const {userInformation}=useContext(AuthContext)
    const navigation=useNavigation();
    const route=useRoute();
    const{params}=route;

    useLayoutEffect(()=>
        {
            navigation.setOptions({
                headerTitle:params.job.name
            })
        }
        ,[])

    const handelApplyBtn=()=>
    {
        console.log("in handleApplyBtn")
        const userBody={
            Name:userInformation.name,
            Email:userInformation.email,
            Password:userInformation.password,
            Role:userInformation.role,
            Gender:userInformation.gender,
            Rating:userInformation.rating,
            ProfilePic:userInformation.profilePic
        }
        const url=BASE_URL+"/update/"+params.job.id
        axios.post(url,userBody)
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{params.job.id}</Text>
            <JobContent job={params.job}/>

            {userInformation.role==="admin"?
                <Button title="See users apliying"/>:
                <Button title="Aply" onPress={handelApplyBtn}/>}
        </View>
    )
}