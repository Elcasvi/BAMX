import 'react-native-gesture-handler';
import AppNavigation from "./navigation/AppNavigation";
import {DarkTheme, DefaultTheme as DefaultThemeReact, NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import LoginScreenStackNavigator from "./navigation/LoginScreenStackNavigator";
import {useColorScheme} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
  } from 'react-native-paper';
import theme from './lib/theme.json'

const theming = {
    ...DefaultTheme,
    colors: theme.colors,
  };

export default function App() {
    const[isLogged,setIsLogged]=useState(false)
    const retrieveData=async ()=>
    {
        try {
            const data=await AsyncStorageNative.getItem("KeepLoggedIn")
            console.log("data: "+data)
            setIsLogged(data)
        }
        catch (error){

        }
    }
    useEffect(()=>{
        retrieveData();
    },[])

  const currentTheme=useColorScheme();
  return (
    <PaperProvider theme={theming}>
      <NavigationContainer
          theme={currentTheme==="dark"?DarkTheme:DefaultThemeReact}>
        <StatusBar style="auto"/>
          {isLogged?(<AppNavigation/>):(<LoginScreenStackNavigator/>)}
      </NavigationContainer>
    </PaperProvider>
);
}