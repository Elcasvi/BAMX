import * as React from 'react';
import {DarkTheme, DefaultTheme, NavigationContainer, useNavigation} from '@react-navigation/native';
import {Ionicons} from "@expo/vector-icons";
import UserProfile from "../screens/UserProfile";
import {useContext, useState} from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createMaterialTopTabNavigator, MaterialTopTabBar} from "@react-navigation/material-top-tabs"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AuthContext} from "../context/AuthContext";
import AppliedJobs from "../screens/Jobs/AppliedJobs";
import AssignedJobs from "../screens/Jobs/AssignedJobs";
import CourseStackNavigation from "./CourseStackNavigation";
import {SafeAreaView} from "react-native";
import JobsFeedScreen from "../screens/Jobs/JobsFeed";
import JobStackNavigation from "./JobStackNavigation";
import CoursesFeedScreen from "../screens/Courses/CoursesFeed";
import CurrentCoursesScreen from "../screens/Courses/CurrentCoursesScreen";
import {Icon} from "@ui-kitten/components";
import CustomDrawerContent from "./CustomDrawerContent";




const TopTabJobs=createMaterialTopTabNavigator();
export const TopTabGroupJobs=()=>
{

    return(
        <TopTabJobs.Navigator>
            <TopTabJobs.Screen name="Trabajos" component={JobsFeedScreen}/>
            <TopTabJobs.Screen name="Aplicando" component={AppliedJobs}/>
            <TopTabJobs.Screen name="Asignados" component={AssignedJobs}/>
        </TopTabJobs.Navigator>
    )
}

const TopTabCourses=createMaterialTopTabNavigator();
export const TopTabGroupCourses=()=>
{

    return(
        <TopTabCourses.Navigator>
            <TopTabCourses.Screen name="Cursos" component={CoursesFeedScreen}/>
            <TopTabCourses.Screen name="Cursando" component={CurrentCoursesScreen}/>
        </TopTabCourses.Navigator>
    )
}

//Tab navigation
const Tab = createBottomTabNavigator();
export const TabGroup=()=>
{
    return(
        <Tab.Navigator
            screenOptions={({route,navigation})=>({
                tabBarIcon:({color,focused,size})=>{
                    let iconName;
                    if(route.name==="JobStackNavigation")
                    {
                        iconName="home";
                    }
                    else if(route.name==="CourseFeedStackGroup")
                    {
                        iconName="book";
                    }
                    return <Ionicons name={iconName} size={24} color={color}/>
                },
            })}>
            <Tab.Screen name="JobStackNavigation" component={JobStackNavigation}
                        options={{headerShown: false,tabBarLabel:"Trabajos"}}></Tab.Screen>
            <Tab.Screen name="CourseFeedStackGroup" component={CourseStackNavigation}
                        options={{headerShown: false,tabBarLabel:"Cursos"}}></Tab.Screen>
        </Tab.Navigator>
    )
}

const Drawer = createDrawerNavigator();
const DrawerNav=()=>
{
    return(
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent{...props}/>}
            screenOptions={{
                headerShown:false,
                drawerStyle:{
                    backgroundColor:"#FFF",
                    width:250
                },
                headerTitleStyle:{
                    fontWeight:"bold"
                },
                drawerActiveTintColor:"blue",
                drawerLabelStyle:{
                    color:"#111"
                }
        }}>
            <Drawer.Screen name="TabGroup" component={TabGroup}
            options={{title:"Principal",drawerIcon:()=>(<Icon
                    style={{ width: 20, height: 20}}
                    fill="#8F9BB3" name='home-outline'/>)}}/>


            <Drawer.Screen name="UserProfile" component={UserProfile}
                           options={{headerShown:true,title:"Perfil",drawerIcon:()=>(<Icon
                                   style={{ width: 20, height: 20}}
                                   fill="#8F9BB3" name='person'/>)}}/>
        </Drawer.Navigator>
    )
}

export default function DrawerNavigation() {
    return (
        <DrawerNav/>
    );
}