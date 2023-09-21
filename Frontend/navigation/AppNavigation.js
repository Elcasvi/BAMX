import {AuthContext, AuthProvider} from "../context/AuthContext";
import {View,ActivityIndicator} from "react-native";
import React, {useContext, useEffect} from "react";
import {Drawer, PaperProvider} from "react-native-paper";
import {DarkTheme, DefaultTheme as DefaultThemeReact, NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import LoginScreenStackNavigator from "./LoginScreenStackNavigator";
import DrawerNavigation from "./DrawerNavigation";

export default function AppNavigation()
{
    const {isLoading,userInformation}=useContext(AuthContext);
    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size={"large"}/>
            </View>
        );
    }
    return(
        <NavigationContainer>
            {userInformation!==null?<DrawerNavigation/>:<LoginScreenStackNavigator/>}
        </NavigationContainer>
    );
}