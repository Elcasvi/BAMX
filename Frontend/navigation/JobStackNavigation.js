import {createNativeStackNavigator} from "@react-navigation/native-stack";
import JobsFeed from "../screens/Jobs/JobsFeed";
import CreateJobScreen from "../screens/Admin/Jobs/CreateJobScreen";
import JobDetailsScreen from "../screens/Jobs/JobDetailsScreen";
import UserProfile from "../screens/UserProfile";
import {TopTabGroupJobs} from "./DrawerNavigation";
import {Image, Pressable, View,Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import AppliedJobs from "../screens/Jobs/AppliedJobs";
import AssignedJobs from "../screens/Jobs/AssignedJobs";
import UsersApplyingToJob from "../screens/Jobs/UsersApplyingToJob";
import UserProfileScreen from "../screens/UserProfileScreen";
import AssignedJobDetailsScreen from "../screens/Jobs/AssignedJobDetailsScreen";
import {Icon} from "@ui-kitten/components";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import logo from "../lib/images/bamx.png"

const JobFeedStack = createNativeStackNavigator();
export default function JobStackNavigation() {
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
            <Text>Trabajos</Text>
        </View>
    );

    const{userInformation}=useContext(AuthContext)
    const navigation=useNavigation();
    return(
        <JobFeedStack.Navigator>
            <JobFeedStack.Screen name="JobsFeed" component={TopTabGroupJobs}
                                 options={{ headerTitle: () => <CustomHeaderTitle />,headerRight:()=>(
                                         <Pressable onPress={()=> navigation.openDrawer()}>
                                             {
                                                 userInformation.profilePictureUrl!==null?(<Image
                                                     source={{ uri: userInformation.profilePictureUrl }}
                                                     style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                                                 />):(PersonIcon)
                                             }
                                         </Pressable>
                                     )}}/>
            <JobFeedStack.Screen name="CreateJobScreen" component={CreateJobScreen}
                                 options={{headerTitle:"Trabajos"}}/>

            <JobFeedStack.Screen name="JobDetailsScreen" component={JobDetailsScreen}
                                 options={{headerTitle:"Trabajos!!!"}}/>

            <JobFeedStack.Screen name="AssignedJobDetailsScreen" component={AssignedJobDetailsScreen}
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