import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "./CustomNavigationBar";
import CreateCourseScreen from "../screens/Admin/Courses/CreateCourseScreen";
import CourseDetailsScreen from "../screens/Courses/CourseDetailsScreen";
import UserProfile from "../screens/UserProfile";
import {TopTabGroupCourses} from "./DrawerNavigation";
import CurrentCoursesScreen from "../screens/Courses/CurrentCoursesScreen";
import UsersEnrolledToCourse from "../screens/Courses/UsersEnrolledToCourse";

const CourseFeedStack = createNativeStackNavigator();
export default function CourseStackNavigation() {
    return (
        <CourseFeedStack.Navigator>
            <CourseFeedStack.Screen name="JobsFeed" component={TopTabGroupCourses}
                                 options={{ header: () => <CustomNavigationBar/> }}/>
            <CourseFeedStack.Screen name="CurrentCoursesScreen" component={CurrentCoursesScreen}
                                    options={{headerShown: false}}/>
            <CourseFeedStack.Screen name="CreateCourseScreen" component={CreateCourseScreen}
                                    options={{headerShown: false}}/>
            <CourseFeedStack.Screen name="CourseDetailsScreen" component={CourseDetailsScreen}
                                    options={{headerShown: false}}/>
            <CourseFeedStack.Screen name="UsersEnrolledToCourse" component={UsersEnrolledToCourse}
                                    options={{headerShown: false}}/>
            <CourseFeedStack.Screen options={{ headerShown: false }} name="UserProfile" component={UserProfile} />
        </CourseFeedStack.Navigator>

    );
}
