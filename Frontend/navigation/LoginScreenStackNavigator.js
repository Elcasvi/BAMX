import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import AppNavigation from "./AppNavigation";


const LoginStack = createNativeStackNavigator();
export default function LoginScreenStackNavigator()
{
    return(
        <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={Login}/>
            <LoginStack.Screen name="Register" component={Register}/>
            <LoginStack.Screen name="Drawer" component={AppNavigation} options={{headerShown:false}}/>
        </LoginStack.Navigator>
    )
}