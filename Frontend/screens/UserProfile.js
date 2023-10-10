import {FlatList, View} from "react-native";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import { Button, Text } from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";
import * as React from "react";
import {BASE_URL} from "../config";
import axios from "axios";
import assignedJobs from "./Jobs/AssignedJobs";

export default function UserProfile({navigation}) {
    const{logout}=useContext(AuthContext)
    const{userInformation}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)
    const [assignedJobs,setAssignedJobs]=useState()
    const [courses,setCourses]=useState()

    const getAssignedJobs=()=>
    {
        const url=BASE_URL+"/User/assignedJobs/"+userInformation.id
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setAssignedJobs(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    const getCourses=() =>
    {
        const url=BASE_URL+"/UserCourses/Courses/"+userInformation.id
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setCourses(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    useFocusEffect(
        React.useCallback(() => {
            //getAssignedJobs();
            getCourses();
        }, [])
    );

    return (
        <View style={{ flex: 1, alignItems: 'center', padding: 40 }}>
            <Text variant="headlineSmall">{userInformation.name}</Text>
            <Text variant="headlineSmall">{userInformation.gender}</Text>
            <Text variant="headlineSmall">{userInformation.rating}</Text>
            <Text variant="headlineSmall">{userInformation.description}</Text>
            <Text variant="headlineSmall">{userInformation.cvUrl}</Text>
            <Text variant="headlineSmall">{userInformation.profilePictureUrl}</Text>

            <FlatList
                data={assignedJobs}
                horizontal={true}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />

            <FlatList
                data={courses}
                horizontal={true}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />

            <Button style={{ margin: 10 }} mode="contained" onPress={()=>logout()}>Log out</Button>
        </View>
    );
}

