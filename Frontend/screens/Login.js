import {Button, SafeAreaView, Text, View} from "react-native";

export default function Login({onLogin})
{
    const userInformation={
        name:"Carlos"
    }
    const handleLogin=()=>
    {

        onLogin(userInformation)
    }

    return(
        <SafeAreaView>
            <Text>Login</Text>
            <Button onpress={handleLogin()} title={"Login!"}/>
        </SafeAreaView>

    );
};
