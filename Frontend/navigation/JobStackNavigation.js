import {createNativeStackNavigator} from "@react-navigation/native-stack";
import JobsFeed from "../screens/Jobs/JobsFeed";
import CreateJobScreen from "../screens/Admin/Jobs/CreateJobScreen";
import JobDetailsScreen from "../screens/Jobs/JobDetailsScreen";
import UserProfile from "../screens/UserProfile";
import {TopTabGroupJobs} from "./DrawerNavigation";
import {Image, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import AppliedJobs from "../screens/Jobs/AppliedJobs";
import AssignedJobs from "../screens/Jobs/AssignedJobs";
import UsersApplyingToJob from "../screens/Jobs/UsersApplyingToJob";
import UserProfileScreen from "../screens/UserProfileScreen";

const JobFeedStack = createNativeStackNavigator();
export default function JobStackNavigation() {
    const navigation=useNavigation();
    return(
        <JobFeedStack.Navigator>
            <JobFeedStack.Screen name="JobsFeed" component={TopTabGroupJobs}
                                 options={{headerTitle:"Trabajos", headerRight:()=>(
                                         <Pressable onPress={()=> navigation.openDrawer()}>
                                             <Image
                                                 source={require("../assets/profile.jpeg")}
                                                 style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                                             />
                                         </Pressable>
                                     )}}/>
            <JobFeedStack.Screen name="CreateJobScreen" component={CreateJobScreen}
                                 options={{headerTitle:"Trabajos"}}/>
            <JobFeedStack.Screen name="JobDetailsScreen" component={JobDetailsScreen}
                                 options={{presentation:"modal"}}/>
            <JobFeedStack.Screen name="UsersApplyingToJob" component={UsersApplyingToJob}
                                 options={{presentation:"modal"}}/>
            <JobFeedStack.Screen name="UserProfileScreen" component={UserProfileScreen} />
            <JobFeedStack.Screen name="UserProfile" component={UserProfile} />
            <JobFeedStack.Screen name="AssignedJobs" component={AssignedJobs} />
            <JobFeedStack.Screen name="AppliedJobs" component={AppliedJobs} />
        </JobFeedStack.Navigator>
    )
}