import {FlatList, Pressable, SafeAreaView, Text, View} from "react-native";
import {useLayoutEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import * as React from "react";
import {CoursesDummy} from "../../data/CoursesDummy";
import Course from "../../components/Courses/Course";


export default function CoursesFeedScreen() {
    const DATA=CoursesDummy
    const navigation=useNavigation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <Pressable onPress={()=> navigation.openDrawer()}>
                    <Text>Image</Text>
                </Pressable>
            ),
        });
    },[]);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Courses Feed!</Text>
          <FlatList
              data={DATA}
              renderItem={({item}) => <Course course={item}/>}
              keyExtractor={item => item.id}
          />
      </SafeAreaView>
    );
}