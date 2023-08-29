import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UserProfile from "../../screens/UserProfile";
import JobsFeed from "../../screens/Jobs/JobsFeed"
import JobDetailsScreen from "../../screens/Jobs/JobDetailsScreen";




const JobFeedStack = createNativeStackNavigator();
export default function EmployeeJobStackNavigation() {
    return(
        <JobFeedStack.Navigator>
            <JobFeedStack.Screen name="JobsFeed" component={JobsFeed}
                                 options={{headerTitle:"Trabajos"}}/>
            <JobFeedStack.Screen name="JobDetailsScreen" component={JobDetailsScreen}
                                 options={{presentation:"modal"}}/>
            <JobFeedStack.Screen name="UserProfile" component={UserProfile} />
        </JobFeedStack.Navigator>
    )
}