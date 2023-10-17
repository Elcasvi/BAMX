import {AuthContext} from "../context/AuthContext";
import {View,ActivityIndicator} from "react-native";
import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import { LoginTabNavigator } from "./LoginTabNavigator";
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
            {userInformation!==null?<DrawerNavigation/>:<LoginTabNavigator/>}
        </NavigationContainer>
    );
}