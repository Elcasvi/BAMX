import * as React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AppliedJobs from "../screens/Jobs/AppliedJobs";
import AssignedJobs from "../screens/Jobs/AssignedJobs";
import JobsFeedScreen from "../screens/Jobs/JobsFeed";
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateJobScreen from '../screens/Admin/Jobs/CreateJobScreen';
import JobDetailsScreen from '../screens/Jobs/JobDetailsScreen';
import AssignedJobDetailsScreen from '../screens/Jobs/AssignedJobDetailsScreen';
import UsersApplyingToJob from '../screens/Jobs/UsersApplyingToJob';
import UserProfile from '../screens/UserProfile';


const OfferIcon = (props) => (
    <Icon
      {...props}
      name='briefcase-outline'
    />
);

const ApplicationIcon = (props) => (
    <Icon
        {...props}
        name='clock-outline'
    />
);

const AssignedIcon = (props) => (
    <Icon
        {...props}
        name='checkmark-circle-outline'
    />
);

const BottomTab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
    style={{ height: 66, marginBottom: 12 }}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={OfferIcon} title='Jobs'/>
      <BottomNavigationTab icon={ApplicationIcon} title='Applied Jobs'/>
      <BottomNavigationTab icon={AssignedIcon} title='Assigned Jobs'/>
    </BottomNavigation>
);
  
export const TabNavigator = () => (
<BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen options={{ headerShown: false }} name='Jobs' component={JobStackNavigation}/>
    <BottomTab.Screen options={{ headerShown: false }} name='Applied Jobs' component={ApplicationStackNavigation}/>
    <BottomTab.Screen options={{ headerShown: false }} name='Assigned Jobs' component={AppliedStackNavigation}/>
</BottomTab.Navigator>
);

const Stack = createNativeStackNavigator();
function JobStackNavigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name='JobsFeedScreen' component={JobsFeedScreen}/> 
            <Stack.Screen name="JobDetailsScreen" component={JobDetailsScreen}
                                 options={{headerShown: false }}/>
            <Stack.Screen options={{ headerShown: false }} name='UserProfile' component={UserProfile}/> 
        </Stack.Navigator>
    )
}

function ApplicationStackNavigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name='AppliedJobs' component={AppliedJobs}/>
            <Stack.Screen name="UsersApplyingToJob" component={UsersApplyingToJob}
                        options={{headerShown: false}}/>
            <Stack.Screen options={{ headerShown: false }} name='UserProfile' component={UserProfile}/> 
        </Stack.Navigator>
    )
}

function AppliedStackNavigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name='AssignedJobs' component={AssignedJobs}/>
            <Stack.Screen name="AssignedJobDetailsScreen" component={AssignedJobDetailsScreen}
                                 options={{headerShown: false}}/>
            <Stack.Screen options={{ headerShown: false }} name='UserProfile' component={UserProfile}/> 
        </Stack.Navigator>
    )
}