import {FlatList, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import Job from "../../components/Jobs/Job";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../config";
import User from "../../components/Users/User";
import { Text } from "@ui-kitten/components"

export default function UsersApplyingToJob()
{
    const route=useRoute();
    const{params}=route;
    const job=params.job;
    const[users,setUsers]=useState();

    useEffect(() => {
        getUsers()
    }, []);
    const getUsers=()=>
    {
        const url=BASE_URL+"/JobOffer/users/"+job.id
        axios.get(url)
            .then(res => {
                setUsers(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    return(
        <View>
            <View style={{ alignItems: 'center', width: "100%", paddingVertical: 8, paddingHorizontal: 40 }}>
                <Text style={{ fontWeight: "500" }} category='s1'>{job.title}</Text>
                <Text style={{ fontWeight: "400" }} category='s1'>{job.description}</Text>
            </View>

            <FlatList
                data={users}
                renderItem={({item})=><User user={item} job={job}/>}
                keyExtractor={item => item.id}
            />
        </View>
    )
}