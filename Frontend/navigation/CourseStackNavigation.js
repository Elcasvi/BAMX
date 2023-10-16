import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "./CustomNavigationBar";
import CoursesFeed from "../screens/Courses/CoursesFeed";
import CreateCourseScreen from "../screens/Admin/Courses/CreateCourseScreen";
import CourseDetailsScreen from "../screens/Courses/CourseDetailsScreen";
import UserProfile from "../screens/UserProfile";
import {TopTabGroupCourses, TopTabGroupJobs} from "./DrawerNavigation";
import {Image, Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import CurrentCoursesScreen from "../screens/Courses/CurrentCoursesScreen";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Icon} from "@ui-kitten/components";
import logo from "../lib/images/bamx.png";
import UsersEnrolledToCourse from "../screens/Courses/UsersEnrolledToCourse";

const CourseFeedStack = createNativeStackNavigator();
export default function CourseStackNavigation() {
    const PersonIcon = (props) => (
        <Icon
            style={{ width: 32, height: 32, margin: 10, padding: 10 }}
            fill="#8F9BB3"
            name='person'
        />
    );
    const CustomHeaderTitle = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={logo}
                style={{ width: 30, height: 30, marginRight: 10 }}
            />
            <Text>Cursos</Text>
        </View>
    );

    const{userInformation}=useContext(AuthContext)
    const navigation=useNavigation();
    return (
        <CourseFeedStack.Navigator>
            <CourseFeedStack.Screen name="JobsFeed" component={TopTabGroupCourses}
                                 options={{headerTitle: () => <CustomHeaderTitle />, headerRight:()=>(
                                         <Pressable onPress={()=> navigation.openDrawer()}>
                                             {
                                                 userInformation.profilePictureUrl!==null?(<Image
                                                     source={{ uri: userInformation.profilePictureUrl }}
                                                     style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                                                 />):(PersonIcon)
                                             }
                                         </Pressable>
                                     )}}/>
            <CourseFeedStack.Screen name="CurrentCoursesScreen" component={CurrentCoursesScreen}
                                    options={{headerTitle:"Cursando"}}/>
            <CourseFeedStack.Screen name="CreateCourseScreen" component={CreateCourseScreen}
                                    options={{headerTitle:"Cursos"}}/>
            <CourseFeedStack.Screen name="CourseDetailsScreen" component={CourseDetailsScreen}
                                    options={{headerTitle:"Cursos"}}/>
            <CourseFeedStack.Screen name="UsersEnrolledToCourse" component={UsersEnrolledToCourse}
                                    options={{headerTitle:"Cursos"}}/>
            <CourseFeedStack.Screen name="UserProfile" component={UserProfile} />
        </CourseFeedStack.Navigator>

    );
}
