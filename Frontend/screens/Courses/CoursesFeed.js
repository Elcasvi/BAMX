import {Button, FlatList, Image, Pressable, SafeAreaView, Text, View} from "react-native";
import {useLayoutEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import * as React from "react";
import {CoursesDummy} from "../../data/CoursesDummy";
import Course from "../../components/Courses/Course";
import {UserDummy} from "../../data/UserDummy";


export default function CoursesFeedScreen() {
    const USER=UserDummy
    const DATA=CoursesDummy
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

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{USER.role==="admin"?
            <Button
                title="New Course"
                onPress={()=>navigation.navigate("CreateCourseScreen")}
            />:<></>
        }
          <FlatList
              data={DATA}
              renderItem={({item}) => <Course course={item}/>}
              keyExtractor={item => item.id}
          />
      </SafeAreaView>
    );
}