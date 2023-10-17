import * as React from 'react';
import UserProfile from "../screens/UserProfile";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AppliedJobs from "../screens/Jobs/AppliedJobs";
import AssignedJobs from "../screens/Jobs/AssignedJobs";
import CourseStackNavigation from "./CourseStackNavigation";
import JobsFeedScreen from "../screens/Jobs/JobsFeed";
import JobStackNavigation from "./JobStackNavigation";
import CoursesFeedScreen from "../screens/Courses/CoursesFeed";
import CurrentCoursesScreen from "../screens/Courses/CurrentCoursesScreen";
import {Icon, TabBar, Tab, BottomNavigation, BottomNavigationTab} from "@ui-kitten/components";
import { createStackNavigator } from '@react-navigation/stack';

const TopTabBarJobs = ({ navigation, state }) => (
    <TabBar
    style={{ paddingVertical: 12 }}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <Tab title='Trabajos'/>
      <Tab title='Aplicando'/>
      <Tab title='Asignados'/>
    </TabBar>
  );

const TopTabJobs=createMaterialTopTabNavigator();
export const TopTabGroupJobs=()=>
{

    return(
        <TopTabJobs.Navigator tabBar={props => <TopTabBarJobs {...props} />}>
            <TopTabJobs.Screen name="Trabajos" component={JobsFeedScreen}/>
            <TopTabJobs.Screen name="Aplicando" component={AppliedJobs}/>
            <TopTabJobs.Screen name="Asignados" component={AssignedJobs}/>
        </TopTabJobs.Navigator>
    )
}

const TopTabBarCourses = ({ navigation, state }) => (
    <TabBar
    style={{ paddingVertical: 12 }}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <Tab title='Cursos'/>
      <Tab title='Cursando'/>
    </TabBar>
);

const TopTabCourses=createMaterialTopTabNavigator();
export const TopTabGroupCourses=()=>
{

    return(
        <TopTabCourses.Navigator tabBar={props => <TopTabBarCourses {...props} />}>
            <TopTabCourses.Screen name="Cursos" component={CoursesFeedScreen}/>
            <TopTabCourses.Screen name="Cursando" component={CurrentCoursesScreen}/>
        </TopTabCourses.Navigator>
    )
}

const OfferIcon = (props) => (
    <Icon
      {...props}
      name='briefcase-outline'
    />
);

const CoursesIcon = (props) => (
    <Icon
      {...props}
      name='book-outline'
    />
);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
    style={{ height: 72, paddingBottom: 12 }}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={OfferIcon} title='Trabajos'/>
      <BottomNavigationTab icon={CoursesIcon} title='Cursos'/>
    </BottomNavigation>
);

//Tab navigation
const BottomTab = createBottomTabNavigator();
export const TabGroup=()=>
{
    return(
        <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
            <BottomTab.Screen name="JobStackNavigation" component={JobStackNavigation}
                        options={{headerShown: false,tabBarLabel:"Trabajos"}}></BottomTab.Screen>
            <BottomTab.Screen name="CourseFeedStackGroup" component={CourseStackNavigation}
                        options={{headerShown: false,tabBarLabel:"Cursos"}}></BottomTab.Screen>
        </BottomTab.Navigator>
    )
}

const Stack = createStackNavigator();
const DrawerNav=()=>
{
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="TabGroup" component={TabGroup}/>
            <Stack.Screen options={{headerShown: false}} name="UserProfile" component={UserProfile}/>
        </Stack.Navigator>
    )
}

export default function DrawerNavigation() {
    return (
        <DrawerNav/>
    );
}