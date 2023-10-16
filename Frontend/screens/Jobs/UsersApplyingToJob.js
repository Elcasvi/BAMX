import {Button, FlatList, View} from "react-native";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import Job from "../../components/Jobs/Job";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../config";
import User from "../../components/Users/User";
import { Text } from "@ui-kitten/components"
import UserDetails from "../../components/Users/UserDetails";





export default function UsersApplyingToJob()
{
    const route=useRoute();
    const{params}=route;
    const job=params.job;
    const[users,setUsers]=useState({});

    useFocusEffect(
        useCallback(() => {
            getUsers()
        }, [])
    );
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
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10,margin:10}}>Usuarios</Text>
            {
                users.length!==0?(<FlatList
                    data={users}
                    renderItem={({item})=>
                        <User user={item} job={job}/>

                }
                    keyExtractor={item => item.id}

                />):(
                    <Text>No users applying</Text>
                )
            }
        </View>
    )
}