import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreateJobScreen from "../screens/Admin/Jobs/CreateJobScreen";
import JobDetailsScreen from "../screens/Jobs/JobDetailsScreen";
import UserProfile from "../screens/UserProfile";
import {Image, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import UsersApplyingToJob from "../screens/Jobs/UsersApplyingToJob";
import AssignedJobDetailsScreen from "../screens/Jobs/AssignedJobDetailsScreen";
import { TabNavigator } from "./TabNavigator";

const JobFeedStack = createNativeStackNavigator();
export default function JobStackNavigation() {
    const navigation=useNavigation();
    return(
        <JobFeedStack.Navigator>
            <JobFeedStack.Screen name="CreateJobScreen" component={CreateJobScreen}
                                 options={{headerTitle:"Trabajos"}}/>
            <JobFeedStack.Screen name="JobDetailsScreen" component={JobDetailsScreen}
                                 options={{presentation:"modal"}}/>
            <JobFeedStack.Screen name="AssignedJobDetailsScreen" component={AssignedJobDetailsScreen}
                                 options={{presentation:"modal"}}/>
            <JobFeedStack.Screen name="UsersApplyingToJob" component={UsersApplyingToJob}
                                 options={{presentation:"modal"}}/>
        </JobFeedStack.Navigator>
    )
}