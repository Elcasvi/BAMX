import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import * as React from "react";
import Course from "../../components/Courses/Course";
import {BASE_URL} from "../../config";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {Button, Divider, Icon, List} from "@ui-kitten/components";
import {JobOffer} from "../../components/Jobs/Job";


export default function CoursesFeedScreen() {
    const [courses,setCourses]=useState({})
    const {userInformation} = useContext(AuthContext)
    const navigation=useNavigation();
    /*
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
     */
    useFocusEffect(
        React.useCallback(() => {
            getCourses();
        }, [])
    );

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
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {userInformation.role === "admin" &&
            <TouchableOpacity
                style={{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                    zIndex: 50,
                    backgroundColor: "#00a039",
                    borderRadius: 100,
                    padding: 8
                }}
                onPress={() => navigation.navigate("CreateCourseScreen")}
            >
                <Icon style={{ width: 28, height: 28 }} name="plus-outline"/>
            </TouchableOpacity>
        }
        <List
            style={{ width: "100%" }}
            data={courses}
            ItemSeparatorComponent={Divider}
            renderItem={({item}) => <Course course={item}/>}
            keyExtractor={item => item.id}
            ListEmptyComponent={<View style={{ height: 200, width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}><Text appearance='hint' category='s1'>No Courses Available</Text></View>}
        />
    </SafeAreaView>
    );
}