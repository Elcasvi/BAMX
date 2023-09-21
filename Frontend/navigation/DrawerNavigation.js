import * as React from 'react';
import {DarkTheme, DefaultTheme, NavigationContainer, useNavigation} from '@react-navigation/native';
import {useColorScheme} from "react-native";
import {StatusBar} from "expo-status-bar";
import {UserDummy} from "../data/UserDummy";
import {Ionicons} from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import UserProfile from "../screens/UserProfile";
import AdminJobStackNavigation from "./adminNavigation/AdminJobStackNavigation";
import AdminCourseStackNavigation from "./adminNavigation/AdminCourseStackNavigation";
import EmployeeJobStackNavigation from "./employeeNavigation/EmployeeJobStackNavigation";
import EmployeeCourseStackNavigation from "./employeeNavigation/EmployeeCourseStackNavigation";
import {useContext, useState} from "react";
import LoginScreenStackNavigator from "./LoginScreenStackNavigator";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {AuthContext} from "../context/AuthContext";



//Tab navigation
const Tab = createMaterialBottomTabNavigator();
const TabGroup=()=>
{
    const{userInformation}=useContext(AuthContext)
    return(
        <Tab.Navigator
            screenOptions={({route,navigation})=>({
                tabBarIcon:({color,focused,size})=>{
                    let iconName;
                    if(route.name==="JobFeedStackGroup")
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
            {userInformation.role==="admin"?
                <Tab.Screen name="JobFeedStackGroup" component={AdminJobStackNavigation}
                            options={{headerShown: false,tabBarLabel:"Trabajos"}}></Tab.Screen>
                :
                <Tab.Screen name="JobFeedStackGroup" component={EmployeeJobStackNavigation}
                            options={{headerShown: false,tabBarLabel:"Trabajos"}}></Tab.Screen>
            }
            {userInformation.role==="admin"?
                <Tab.Screen name="CourseFeedStackGroup" component={AdminCourseStackNavigation}
                            options={{headerShown: false,tabBarLabel:"Cursos"}}></Tab.Screen>
                :
                <Tab.Screen name="CourseFeedStackGroup" component={EmployeeCourseStackNavigation}
                            options={{headerShown: false,tabBarLabel:"Cursos"}}></Tab.Screen>
            }

        </Tab.Navigator>
    )
}

const Drawer = createDrawerNavigator();
const DrawerNav=()=>
{
    return(
        <Drawer.Navigator initialRouteName="TabGroup" screenOptions={{headerShown:false}}>
            <Drawer.Screen name="TabGroup" component={TabGroup} />
            <Drawer.Screen name="UserProfile" component={UserProfile} options={{headerShown:true}}/>
        </Drawer.Navigator>
    )
}

export default function DrawerNavigation() {
    return (
        <DrawerNav/>
    );
}