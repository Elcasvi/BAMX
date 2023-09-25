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



const TopTab=createMaterialTopTabNavigator();
export const TopTabGroup=()=>
{
    const{userInformation}=useContext(AuthContext)

    return(
        <TopTab.Navigator>
            <TopTab.Screen name="Jobs" component={JobsFeedScreen}/>
            <TopTab.Screen name="AppliedJobs" component={AppliedJobs}/>
            <TopTab.Screen name="AssignedJobs" component={AssignedJobs}/>
        </TopTab.Navigator>
    )
}


//Tab navigation
const Tab = createBottomTabNavigator();
export const TabGroup=()=>
{
    const{userInformation}=useContext(AuthContext)
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
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen name="TabGroup" component={TabGroup}/>
            <Drawer.Screen name="UserProfile" component={UserProfile} options={{headerShown:true}}/>
        </Drawer.Navigator>
    )
}

export default function DrawerNavigation() {
    return (
        <DrawerNav/>
    );
}