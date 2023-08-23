import * as React from 'react';
import {Button, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import JobsFeedScreen from "../screens/JobFeedScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import CoursesFeedScreen from "../screens/CoursesFeedScreen";

//Sub navigations
const JobFeedStack = createNativeStackNavigator();
function JobFeedStackScreen() {
    return (
        <JobFeedStack.Navigator>
            <JobFeedStack.Screen name="JobsFeed" component={JobsFeedScreen} />
            <JobFeedStack.Screen name="UserProfile" component={UserProfileScreen} />
        </JobFeedStack.Navigator>
    );
}

const CourseFeedStack = createNativeStackNavigator();
function CourseFeedStackScreen() {
    return (
        <CourseFeedStack.Navigator>
            <CourseFeedStack.Screen name="CoursesFeed" component={CoursesFeedScreen} />
        </CourseFeedStack.Navigator>
    );
}




//Tab navigation
const Tab = createBottomTabNavigator();
const MyTab=()=>
{
    return(
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="JobsFeed" component={JobFeedStackScreen}></Tab.Screen>
                <Tab.Screen name="CoursesFeed" component={CourseFeedStackScreen}></Tab.Screen>
            </Tab.Navigator>
    )
}
export default function TabNavigation() {
    return (
        <NavigationContainer>
            <MyTab/>
        </NavigationContainer>
    );
}