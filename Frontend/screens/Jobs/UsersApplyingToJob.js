import {FlatList, Text, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import Job from "../../components/Jobs/Job";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../config";
import User from "../../components/Users/User";

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
            <Text>Job</Text>
            <Job job={job}/>
            <Text>Users applying to the job</Text>
            <FlatList
                data={users}
                renderItem={({item})=><User user={item}/>}
                keyExtractor={item => item.id}
            />
        </View>
    )
}