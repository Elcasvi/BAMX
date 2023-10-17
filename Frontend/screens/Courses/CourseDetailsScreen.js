import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useContext, useLayoutEffect, useState} from "react";
import { ScrollView, View } from "react-native";
import {Button, Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import * as React from "react";
import {AuthContext} from "../../context/AuthContext";
import {BASE_URL} from "../../config";
import axios from "axios";

const BackIcon = (props) => (
    <Icon
      {...props}
      name='arrow-back'
    />
  );

const CourseIcon = (props) => (
    <Icon
      style={{ width: 32, height: 32, margin: 10, padding: 10 }}
      fill="#8F9BB3"
      name='book-outline'
    />
);

const EnrolledIcon = (props) => (
    <Icon
      style={{ width: 32, height: 32, margin: 10, padding: 10 }}
      fill="#8F9BB3"
      name='edit-2-outline'
    />
);

const UsersIcon = (props) => (
    <Icon
      {...props}
      name='people-outline'
    />
  );

const ApplyIcon = (props) => (
<Icon
    {...props}
    name='paper-plane-outline'
/>
);

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
                navigation.goBack()
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
        <>
        <Layout
            style={{ paddingTop: 30 }}
            level='1'
            >
            <TopNavigation
            accessoryLeft={() => <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />}
            title='Atrás'
            />
            <Divider />
        </Layout>
        <ScrollView style={{ backgroundColor: "#F7F9FC" }}>
        <View style={{ width: "100%", paddingVertical: 18, paddingHorizontal: 30 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                {alreadyEnrolled ?
                    <EnrolledIcon/> : <CourseIcon/>
                }
                <Text category='h1'>{course.title}</Text>
            </View>
            <Text style={{ marginTop: 20, marginBottom: 6, fontWeight: 700 }} category="h6">Description</Text>
            <Text style={{ fontWeight: "400" }} category='s1'>{course.description}</Text>
            {userInformation.role === "admin"?
                <Button accessoryLeft={<UsersIcon/>} size="large" style={{ width: "100%", marginTop: 20 }} onPress={() => navigation.navigate("UsersEnrolledToCourse",{course})}>Usuarios</Button>:
                (
                    !alreadyEnrolled &&
                <Button accessoryLeft={<ApplyIcon/>} size="large" style={{ width: "100%", marginTop: 20 }} onPress={handleEnrollBtn}>Enroll</Button>
                )
            }
        </View>
    </ScrollView>
    </>
    )
}