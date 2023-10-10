import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useContext, useLayoutEffect, useState} from "react";
import {SafeAreaView,View} from "react-native";
import CourseContent from "../../components/Courses/CourseContent";
import {Button, Text} from "react-native-paper";
import * as React from "react";
import {AuthContext} from "../../context/AuthContext";
import {BASE_URL} from "../../config";
import axios from "axios";

export default function CourseDetailsScreen() {
    const navigation=useNavigation();
    const route=useRoute();
    const{params}=route;
    const course=params.course;
    const {userInformation}=useContext(AuthContext)
    const[alreadyEnrolled,setAlreadyEnrolled]=useState(true);


    useLayoutEffect(()=>
        {
            navigation.setOptions({
                headerTitle:course.name
            })
        }
        ,[])

    useFocusEffect(
        React.useCallback(() => {
            isUserEnrolled();
        }, [])
    );

    const handelEnrollBtn=()=>
    {
        const url=BASE_URL+"/UserCourses/update/"+course.id+"/"+userInformation.id
        axios.post(url)
            .then(res => {
                navigation.goBack();
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    const isUserEnrolled=()=>
    {
        const url=BASE_URL+"/UserCourses/"+course.id
        axios.get(url)
            .then(res => {
                userExistsInList(res.data)?setAlreadyEnrolled(true):setAlreadyEnrolled(false);
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
        <View style={{ alignItems: 'center', width: "100%", paddingVertical: 8, paddingHorizontal: 40 }}>
            <Text style={{ fontWeight: "500" }} variant="headlineMedium">{course.title}</Text>
            <Text style={{ fontWeight: "400" }} variant="titleMedium">{course.description}</Text>

            {userInformation.role==="admin"?
                <Button icon="account-group" mode="contained" style={{ width: "50%", marginTop: 8 }} onPress={()=>{navigate("UsersApplyingToJob",{job});}}>User</Button>:
                (
                    alreadyEnrolled?
                        <Text>Application in process...</Text>
                        :
                        <Button icon="pencil" mode="contained" style={{ width: "50%", marginTop: 8 }} onPress={handelEnrollBtn}>Enroll</Button>
                )
            }
        </View>
    )
}