import * as React from 'react';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from "react-native";
import {StatusBar} from "expo-status-bar";
import {UserDummy} from "../data/UserDummy";
import EmployeeNavigation from "./EmployeeNavigation";
import AdminNavigation from "./AdminNavigation";



export default function AppNavigation() {
    const user=UserDummy;
    const currentTheme=useColorScheme();
    return (
        <NavigationContainer
        theme={currentTheme==="dark"?DarkTheme:DefaultTheme}>
            <StatusBar style="auto"/>
            {user.role==="employee"?<EmployeeNavigation/>:<AdminNavigation/>}
        </NavigationContainer>
    );
}