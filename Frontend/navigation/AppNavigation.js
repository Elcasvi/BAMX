import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import JobsFeed from "../screens/JobsFeed";
import UserProfile from "../screens/UserProfile";
import CoursesFeed from "../screens/CoursesFeed";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Ionicons} from '@expo/vector-icons';
import {red} from "react-native-reanimated/src";


//Sub navigations
const JobFeedStack = createNativeStackNavigator();
function JobFeedStackGroup() {
    return (
        <JobFeedStack.Navigator>
            <JobFeedStack.Screen name="JobsFeed" component={JobsFeed} />
            <JobFeedStack.Screen name="UserProfile" component={UserProfile} />
        </JobFeedStack.Navigator>
    );
}

const CourseFeedStack = createNativeStackNavigator();
function CourseFeedStackGroup() {
    return (
        <CourseFeedStack.Navigator>
            <CourseFeedStack.Screen name="CoursesFeed" component={CoursesFeed} />
        </CourseFeedStack.Navigator>
    );
}


const Drawer = createDrawerNavigator();

const DrawerNav=()=>
{
    return(
        <Drawer.Navigator initialRouteName="JobsFeed">
            <Drawer.Screen name="JobFeedStackScreen" component={JobFeedStackGroup} />
            <Drawer.Screen name="CourseFeedStackScreen" component={CourseFeedStackGroup} options={{headerShown: false}}/>
        </Drawer.Navigator>
    )

}
//Tab navigation
const Tab = createBottomTabNavigator();
const MyTab=()=>
{
    return(
            <Tab.Navigator
                screenOptions={({route,navigation})=>({
                    tabBarIcon:({color,focused,size})=>{
                        let iconName;
                        if(route.name==="JobsFeed")
                        {
                            iconName="home";
                        }
                        else if(route.name==="CoursesFeed")
                        {
                            iconName="book";
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                    tabBarActiveTintColor:"#1DA1F2",
                    tabBarInactiveTintColor:"gray"
                })}>
                <Tab.Screen name="JobsFeed" component={JobFeedStackGroup}
                            options={{headerShown: false,tabBarLabel:"Trabajos"}}></Tab.Screen>
                <Tab.Screen name="CoursesFeed" component={CourseFeedStackGroup}
                            options={{headerShown: false,tabBarLabel:"Cursos"}}></Tab.Screen>
            </Tab.Navigator>
    )
}

//const Drawer = createDrawerNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <MyTab/>
        </NavigationContainer>
    );
}