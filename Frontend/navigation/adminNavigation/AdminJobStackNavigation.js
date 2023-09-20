import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UserProfile from "../../screens/UserProfile";
import JobsFeed from "../../screens/Jobs/JobsFeed"
import CoursesFeed from "../../screens/Courses/CoursesFeed"
import CreateJobScreen from "../../screens/Admin/Jobs/CreateJobScreen";
import CreateCourseScreen from "../../screens/Admin/Courses/CreateCourseScreen";
import JobDetailsScreen from "../../screens/Jobs/JobDetailsScreen";
import CourseDetailsScreen from "../../screens/Courses/CourseDetailsScreen";
import CustomNavigationBar from "../CustomNavigationBar";

//Sub navigations



const JobFeedStack = createNativeStackNavigator();
export default function AdminJobStackNavigation() {
    return(
        <JobFeedStack.Navigator
        screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}
        >
            <JobFeedStack.Screen name="JobsFeed" component={JobsFeed}
                                 options={{headerTitle:"Trabajos"}}/>
            <JobFeedStack.Screen name="CreateJobScreen" component={CreateJobScreen}
                                 options={{headerTitle:"Trabajos"}}/>
            <JobFeedStack.Screen name="JobDetailsScreen" component={JobDetailsScreen}
                                 options={{presentation:"modal"}}/>
            <JobFeedStack.Screen name="UserProfile" component={UserProfile} />
        </JobFeedStack.Navigator>
    )
}