import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import AppNavigation from "./AppNavigation";


const LoginStack = createNativeStackNavigator();
export default function LoginScreenStackNavigator()
{
    return(
        <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={Login} options={{headerShown: true,headerTitle:""}}/>
            <LoginStack.Screen name="Register" component={Register} options={{headerShown: true,headerTitle:""}}/>
        </LoginStack.Navigator>
    )
}