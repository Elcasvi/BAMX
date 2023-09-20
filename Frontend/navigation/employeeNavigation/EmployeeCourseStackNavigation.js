import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CoursesFeed from "../../screens/Courses/CoursesFeed";
import CourseDetailsScreen from "../../screens/Courses/CourseDetailsScreen";
import UserProfile from "../../screens/UserProfile";
import CustomNavigationBar from "../CustomNavigationBar";

const CourseFeedStack = createNativeStackNavigator();
export default function EmployeeCourseStackNavigation() {
    return (
        <CourseFeedStack.Navigator
        screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}
        >
            <CourseFeedStack.Screen name="CoursesFeed" component={CoursesFeed}
                                    options={{headerTitle:"Cursos"}}/>
            <CourseFeedStack.Screen name="CourseDetailsScreen" component={CourseDetailsScreen}
                                 options={{headerTitle:"Cursos"}}/>
            <CourseFeedStack.Screen name="UserProfile" component={UserProfile} />
        </CourseFeedStack.Navigator>

    );
}
