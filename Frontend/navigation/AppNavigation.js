import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import JobsFeed from "../screens/JobsFeed";
import UserProfile from "../screens/UserProfile";
import CoursesFeed from "../screens/CoursesFeed";
import {createDrawerNavigator} from "@react-navigation/drawer";
import { Entypo , Foundation } from '@expo/vector-icons';


//Sub navigations
const JobFeedStack = createNativeStackNavigator();
function JobFeedStackScreen() {
    return (
        <JobFeedStack.Navigator>
            <JobFeedStack.Screen name="JobsFeed" component={JobsFeed} />
            <JobFeedStack.Screen name="UserProfile" component={UserProfile} />
        </JobFeedStack.Navigator>
    );
}

const CourseFeedStack = createNativeStackNavigator();
function CourseFeedStackScreen() {
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
            <Drawer.Screen name="JobFeedStackScreen" component={JobFeedStackScreen}/>
            <Drawer.Screen name="CourseFeedStackScreen" component={CourseFeedStackScreen}/>
        </Drawer.Navigator>
    )

}
//Tab navigation
const Tab = createBottomTabNavigator();
const MyTab=()=>
{
    return(
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="JobsFeed" component={JobFeedStackScreen}
                            options={{tabBarIcon:()=><Foundation name="home" size={24} color="black" />}}></Tab.Screen>
                <Tab.Screen name="CoursesFeed" component={CourseFeedStackScreen}
                            options={{tabBarIcon:()=><Entypo name="book" size={24} color="black" />
                }}></Tab.Screen>
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