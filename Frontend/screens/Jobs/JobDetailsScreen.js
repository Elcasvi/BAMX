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
    const {navigate}=useNavigation();

    const route=useRoute();
    const{params}=route;
    const job=params.job;

    useLayoutEffect(()=>
        {
            navigation.setOptions({
                headerTitle:job.name
            })
        }
        ,[])

    const handelApplyBtn=()=>
    {
        const userBody={
            Id:userInformation.id,
            Name:userInformation.name,
            Email:userInformation.email,
            Password:userInformation.password,
            Role:userInformation.role,
            Gender:userInformation.gender,
            Rating:userInformation.rating,
            ProfilePic:userInformation.profilePic
        }
        const url=BASE_URL+"/User/update/"+job.id+"/"+userInformation.id
        axios.post(url)
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{job.id}</Text>
            <JobContent job={job}/>

            {userInformation.role==="admin"?
                <Button title="See users apliying" onPress={()=>{navigate("UsersApplyingToJob",{job});}}/>:
                <Button title="Aply" onPress={handelApplyBtn}/>}
        </View>
    )
}