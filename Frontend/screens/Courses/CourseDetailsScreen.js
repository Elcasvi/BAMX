import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useContext, useLayoutEffect, useState} from "react";
import { View } from "react-native";
import {Button, Text} from '@ui-kitten/components';
import * as React from "react";
import {AuthContext} from "../../context/AuthContext";
import {BASE_URL} from "../../config";
import axios from "axios";
import {Card} from "react-native-paper";

export default function CourseDetailsScreen() {
    const navigation=useNavigation();
    const route=useRoute();
    const{params}=route;
    const course=params.course;
    const {userInformation}=useContext(AuthContext)
    const[alreadyEnrolled,setAlreadyEnrolled]=useState(false);

    useFocusEffect(
        React.useCallback(() => {
            isUserEnrolled();
        }, [])
    );

    useLayoutEffect(()=>
        {
            navigation.setOptions({
                headerTitle:""
            })
        }
        ,[])

    const isUserEnrolled=()=> {
        const url=BASE_URL+"/UserCourses/"+course.id
        axios.get(url)
            .then(res => {
                userExistsInList(res.data)?setAlreadyEnrolled(true):setAlreadyEnrolled(false);
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }



    const handleEnrollBtn=()=>
    {
        const url=BASE_URL+"/UserCourses/update/"+course.id+"/"+userInformation.id
        axios.post(url)
            .then(res => {

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


        <View style={{ width: "100%", paddingVertical: 8, paddingHorizontal: 40 }}>
            <Card style={{ marginHorizontal: 8, marginVertical: 2 }} mode="outlined">
                <Card.Title titleStyle={{ fontWeight: "500" }} titleVariant="headlineMedium" title={course.title} />
                <Card.Content>
                    <Text variant="bodyMedium">{course.author}</Text>
                </Card.Content>
            </Card>
            <Card style={{ marginHorizontal: 8, marginVertical: 2 }} mode="outlined">
                <Card.Content>
                    <Text variant="bodyMedium">{course.description}</Text>
                </Card.Content>
            </Card>

            {userInformation.role==="admin"?
                <Button style={{ width: "50%", marginTop: 8 }} onPress={()=>{navigation.navigate("UsersEnrolledToCourse",{course});}}>Usuarios</Button>:
                (
                    alreadyEnrolled?
                        <Text category='s1'>Welcome again {userInformation.name}</Text>
                        :
                        <Button style={{ width: "50%", marginTop: 8 }} onPress={handleEnrollBtn}>Enroll</Button>
                )
            }
        </View>
    )
}