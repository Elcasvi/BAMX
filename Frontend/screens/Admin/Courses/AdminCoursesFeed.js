import {Button, FlatList, Pressable, SafeAreaView, Text, View} from "react-native";
import AdminJob from "../../../components/Admin/AdminJob";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import {JobsDummy} from "../../../data/JobsDummy";
import {useLayoutEffect} from "react";
import {CoursesDummy} from "../../../data/CoursesDummy";
import AdminCourse from "../../../components/Courses/AdminCourse";

export default function AdminCoursesFeed()
{
    const navigation=useNavigation();
    const DATA=CoursesDummy

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <Pressable onPress={()=> navigation.openDrawer()}>
                    <Text>Image</Text>
                </Pressable>
            ),
        });
    },[]);

    return(
        <SafeAreaView style={{ flex: 1,alignItems:"center"}}>
            <View>
                <Button
                    title="New Course" onPress={()=>navigation.navigate("CreateCourseScreen")}/>
            </View>

            <FlatList
                data={DATA}
                renderItem={({item})=><AdminCourse job={item}/>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}