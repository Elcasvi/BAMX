import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import UserProfile from "../screens/UserProfile";
import JobsFeed from "../screens/Jobs/JobsFeed";
import CoursesFeed from "../screens/Courses/CoursesFeed";
import JobDetailsScreen from "../screens/Jobs/JobDetailsScreen";
import {Ionicons} from "@expo/vector-icons";
import CourseDetailsScreen from "../screens/Courses/CourseDetailsScreen";

/*
//Top Tabs
const TopTabs=createMaterialTopTabNavigator();
function TopTabsGroup()
{
    return(
        <TopTabs.Navigator>
            <TopTabs.Screen name={}
        </TopTabs.Navigator>
    )
}
 */

//Sub navigations


const JobFeedStack = createNativeStackNavigator();
function JobFeedStackGroup() {
    return (
        <JobFeedStack.Navigator>
            <JobFeedStack.Screen name="JobsFeed" component={JobsFeed}
                                 options={{headerTitle:"Trabajos"}}/>
            <JobFeedStack.Screen name="JobDetailsScreen" component={JobDetailsScreen}
                                 options={{presentation:"modal"}}/>
            <JobFeedStack.Screen name="UserProfile" component={UserProfile} />
        </JobFeedStack.Navigator>
    );
}

const CourseFeedStack = createNativeStackNavigator();
function CourseFeedStackGroup() {
    return (
        <CourseFeedStack.Navigator>
            <CourseFeedStack.Screen name="CoursesFeed" component={CoursesFeed}
                                    options={{headerTitle:"Cursos"}}/>
            <CourseFeedStack.Screen name="CourseDetailsScreen" component={CourseDetailsScreen}
                                    options={{presentation:"modal"}}/>
        </CourseFeedStack.Navigator>
    );
}



//Tab navigation
const Tab = createBottomTabNavigator();
const TabGroup=()=>
{
    return(
        <Tab.Navigator
            screenOptions={({route,navigation})=>({
                tabBarIcon:({color,focused,size})=>{
                    let iconName;
                    if(route.name==="JobFeedStackGroup")
                    {
                        iconName="home";
                    }
                    else if(route.name==="CourseFeedStackGroup")
                    {
                        iconName="book";
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor:"#1DA1F2",
                tabBarInactiveTintColor:"gray"
            })}>
            <Tab.Screen name="JobFeedStackGroup" component={JobFeedStackGroup}
                        options={{headerShown: false,tabBarLabel:"Trabajos"}}></Tab.Screen>
            <Tab.Screen name="CourseFeedStackGroup" component={CourseFeedStackGroup}
                        options={{headerShown: false,tabBarLabel:"Cursos"}}></Tab.Screen>
        </Tab.Navigator>
    )
}

const Drawer = createDrawerNavigator();
const DrawerNav=()=>
{
    return(
        <Drawer.Navigator initialRouteName="TabGroup" screenOptions={{headerShown:false}}>
            <Drawer.Screen name="TabGroup" component={TabGroup} />
            <Drawer.Screen name="UserProfile" component={UserProfile} options={{headerShown:true}}/>
        </Drawer.Navigator>
    )
}

export default function EmployeeNavigation() {
    return(
        <DrawerNav/>
    )
}