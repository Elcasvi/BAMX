import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "./CustomNavigationBar";
import CoursesFeed from "../screens/Courses/CoursesFeed";
import CreateCourseScreen from "../screens/Admin/Courses/CreateCourseScreen";
import CourseDetailsScreen from "../screens/Courses/CourseDetailsScreen";
import UserProfile from "../screens/UserProfile";
import {TopTabGroupCourses, TopTabGroupJobs} from "./DrawerNavigation";
import {Image, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";

const CourseFeedStack = createNativeStackNavigator();
export default function CourseStackNavigation() {
    const navigation=useNavigation();
    return (
        <CourseFeedStack.Navigator>
            <CourseFeedStack.Screen name="JobsFeed" component={TopTabGroupCourses}
                                 options={{headerTitle:"Cursos", headerRight:()=>(
                                         <Pressable onPress={()=> navigation.openDrawer()}>
                                             <Image
                                                 source={require("../assets/profile.jpeg")}
                                                 style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                                             />
                                         </Pressable>
                                     )}}/>
            <CourseFeedStack.Screen name="CreateCourseScreen" component={CreateCourseScreen}
                                    options={{headerTitle:"Cursos"}}/>
            <CourseFeedStack.Screen name="CourseDetailsScreen" component={CourseDetailsScreen}
                                    options={{headerTitle:"Cursos"}}/>
            <CourseFeedStack.Screen name="UserProfile" component={UserProfile} />
        </CourseFeedStack.Navigator>

    );
}
