import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreateJobScreen from "../screens/Admin/Jobs/CreateJobScreen";
import JobDetailsScreen from "../screens/Jobs/JobDetailsScreen";
import UserProfile from "../screens/UserProfile";
import {TopTabGroupJobs} from "./DrawerNavigation";
import AppliedJobs from "../screens/Jobs/AppliedJobs";
import AssignedJobs from "../screens/Jobs/AssignedJobs";
import UsersApplyingToJob from "../screens/Jobs/UsersApplyingToJob";
import UserProfileScreen from "../screens/UserProfileScreen";
import AssignedJobDetailsScreen from "../screens/Jobs/AssignedJobDetailsScreen";
import CustomNavigationBar from "./CustomNavigationBar";

const JobFeedStack = createNativeStackNavigator();
export default function JobStackNavigation() {
    return(
        <JobFeedStack.Navigator>
            <JobFeedStack.Screen name="JobsFeed" component={TopTabGroupJobs}
                                 options={{ header: () => <CustomNavigationBar/> }}/>
            <JobFeedStack.Screen name="CreateJobScreen" component={CreateJobScreen}
                                 options={{ headerShown: false }}/>
            <JobFeedStack.Screen name="JobDetailsScreen" component={JobDetailsScreen}
                                 options={{ headerShown: false }}/>
            <JobFeedStack.Screen options={{ headerShown: false }} name="AssignedJobDetailsScreen" component={AssignedJobDetailsScreen}/>
            <JobFeedStack.Screen options={{ headerShown: false }} name="UsersApplyingToJob" component={UsersApplyingToJob}/>
            <JobFeedStack.Screen options={{ headerShown: false }} name="UserProfileScreen" component={UserProfileScreen} />
            <JobFeedStack.Screen options={{ headerShown: false }} name="UserProfile" component={UserProfile} />
            <JobFeedStack.Screen options={{ headerShown: false }} name="AssignedJobs" component={AssignedJobs} />
            <JobFeedStack.Screen options={{ headerShown: false }} name="AppliedJobs" component={AppliedJobs} />
        </JobFeedStack.Navigator>
    )
}