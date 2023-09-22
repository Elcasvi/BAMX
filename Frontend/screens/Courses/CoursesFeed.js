import {Button, FlatList, Image, Pressable, SafeAreaView, Text, View} from "react-native";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import * as React from "react";
import {CoursesDummy} from "../../data/CoursesDummy";
import Course from "../../components/Courses/Course";
import {UserDummy} from "../../data/UserDummy";
import {BASE_URL} from "../../config";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";


export default function CoursesFeedScreen() {
    const [courses,setCourses]=useState(null)
    const {userInformation} = useContext(AuthContext)
    const navigation=useNavigation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <Pressable onPress={()=> navigation.openDrawer()}>
                    <Image
                        source={require("../../assets/profile.jpeg")}
                        style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                    />
                </Pressable>
            ),
        });
    },[]);

    useEffect(() => {
        getCourses()
    }, []);
    const getCourses=()=>
    {
        const url=BASE_URL+"/Course"
        axios.get(url)
            .then(res => {
                setCourses(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{userInformation.role==="admin"?
            <Button
                title="New Course"
                onPress={()=>navigation.navigate("CreateCourseScreen")}
            />:<></>
        }
          <FlatList
              data={courses}
              renderItem={({item}) => <Course course={item}/>}
              keyExtractor={item => item.id}
          />
      </SafeAreaView>
    );
}