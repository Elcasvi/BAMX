import JobsFeed from "../screens/Jobs/JobsFeed";
import JobDetailsScreen from "../screens/Jobs/JobDetailsScreen";
import UserProfile from "../screens/UserProfile";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";


const LoginStack = createNativeStackNavigator();
export default function LoginScreenStackNavigator()
{
    return(
        <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={Login}/>
            <LoginStack.Screen name="Register" component={Register}/>
        </LoginStack.Navigator>
    )
}