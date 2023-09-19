import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import AppNavigation from "../../navigation/AppNavigation";

export default function Welcome()
{
    const navigation = useNavigation();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
    useEffect(() => {
        if(isUserLoggedIn===true)
        {
            //Navigate to <AppNavigation/>
            navigation.navigate('AppNavigation');
        }
    }, [isUserLoggedIn]);


    return(
        <View>
            <Text>Login!!</Text>
        </View>
    );
};