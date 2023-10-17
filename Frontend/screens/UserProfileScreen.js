import {Button, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import UserDetails from "../components/Users/UserDetails";
import {BASE_URL} from "../config";
import axios from "axios";
import { StackActions } from '@react-navigation/native';



export default function (){
    const route=useRoute();
    const navigation=useNavigation();
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
                navigation.goBack()

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
                navigation.goBack();
                navigation.dispatch(
                    StackActions.replace('JobsFeed')
                );
            })
            .catch((error) => {
                alert("Error: "+error)
            });
    }

    return (
        <View style={{
            margin: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 8,
        }}>
            <UserDetails user={user} />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16,
            }}>
                <Button
                    title="Hire"
                    onPress={hireEmployee}
                    color="#00a039"
                    style={{
                        flex: 1,
                        marginHorizontal: 8,
                    }}
                />
                <Button
                    title="Decline"
                    onPress={declineEmployee}
                    color="#e3022e"
                    style={{
                        flex: 1,
                        marginHorizontal: 8,
                    }}
                />
            </View>
        </View>
    );
}