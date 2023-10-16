import {SafeAreaView, Text, View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {BASE_URL} from "../../config";
import axios from "axios";
import {Divider, List} from "@ui-kitten/components";
import {JobAssigned} from "../../components/Jobs/Job";
import * as React from "react";
import Course from "../../components/Courses/Course";

export default function CurrentCoursesScreen()
{
    const {userInformation}=useContext(AuthContext)
    const[courses,setCourses]=useState()

    function getCourses() {
        const url=BASE_URL+"/UserCourses/Courses/"+userInformation.id
        axios.get(url)
            .then(res => {
                setCourses(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    useFocusEffect(
        React.useCallback(()=>
        {
         getCourses();
        },[])
    )

    return(
          <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <List
                  style={{ width: "100%" }}
                  data={courses}
                  ItemSeparatorComponent={Divider}
                  renderItem={({item}) => <Course course={item}/>}
                  keyExtractor={item => item.id}
                  ListEmptyComponent={<View style={{ height: 200, width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}><Text appearance='hint' category='s1'>No current courses</Text></View>}
              />
          </SafeAreaView>
    );
}