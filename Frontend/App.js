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
import {AuthProvider} from "./context/AuthContext";

const theming = {
    ...DefaultTheme,
    colors: theme.colors,
  };

export default function App() {
  const currentTheme=useColorScheme();
  return (
      <AuthProvider>
        <AppNavigation/>
      </AuthProvider>
);
}