import {FlatList, Text, View} from "react-native";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import User from "../../components/Users/User";
import {useCallback, useState} from "react";
import {BASE_URL} from "../../config";
import axios from "axios";
import UserDetails from "../../components/Users/UserDetails";

export default function UsersEnrolledToCourse()
{
    const route=useRoute();
    const{params}=route;
    const course=params.course;
    const[users,setUsers]=useState({});
    useFocusEffect(
        useCallback(() => {
            getUsers()
        }, [])
    );
    const getUsers=()=>
    {
        const url=BASE_URL+"/Course/users/"+course.id
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
                    renderItem={({item})=><UserDetails user={item}/>}
                    keyExtractor={item => item.id}
                />):(
                    <Text>No users applying</Text>
                )
            }
        </View>
    );
}