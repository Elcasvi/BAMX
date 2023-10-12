import {Button, Text, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import UserDetails from "../components/Users/UserDetails";
import {BASE_URL} from "../config";
import axios from "axios";


export default function (){
    const route=useRoute();
    const{params}=route;
    const user=params.user;
    const job=params.job;

    const hireEmployee=()=>
    {
        assignJobOfferToUser()
        deleteJobOffer()
    }
    const declineEmployee=()=>
    {
        console.log("Decline Employee")
        const url=BASE_URL+"/UserJobOffer/"+job.id+"/"+user.id
        axios.delete(url)
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    const assignJobOfferToUser=()=>
    {
        const url=BASE_URL+"/AssignedJob/"+user.id
        const jobDto={
            Title:job.title,
            Description:job.description,
            Created:job.created,
            Enterprise:job.enterprise,
            JobOfferPicture:job.jobOfferPicture
        }
        axios.post(url,jobDto)
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            });
    }
    const deleteJobOffer=()=>
    {
        const url=BASE_URL+"/JobOffer/delete/"+job.id
        axios.delete(url)
            .then(res => {
                //console.log(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            });
    }

    return(
        <View>
            <Text>User profile screen</Text>
            <UserDetails user={user}/>
            <Button title="Hire" onPress={hireEmployee}/>
            <Button title="Decline" onPress={declineEmployee}/>
        </View>
    )
}