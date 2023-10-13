import { Image, useColorScheme, View } from "react-native";
import { Input, Button, Icon } from '@ui-kitten/components';
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import logo from "../lib/images/bamx.png"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LogInIcon = (props) => (
    <Icon
        {...props}
        name='log-in-outline'
    />
);

export default function Login()
{
    const {login}= useContext(AuthContext);
    const navigation=useNavigation();
    const theme=useColorScheme();
    const [user,setUser]=useState({})
    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    return (
        <KeyboardAwareScrollView>
            <View style={{ flex: 1, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20 }}>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={logo}
                />
                <Input size="large" status="primary" label="E-Mail" style={{width: "100%", marginBottom: 10 }} placeholder={"E-Mail"} onChange={setEmail} value={email}/>
                <Input size="large" status="primary" label="Password" secureTextEntry={true} style={{width: "100%" }} placeholder={"Password"} onChange={setPassword} value={password}/>
                <Button accessoryRight={LogInIcon} style={{width: 142, marginTop: 10, marginBottom: 5 }} onPress={()=>login({email,password})}>Login</Button>
                <Button style={{width: 142 }} size="small" appearance='ghost' onPress={() => navigation.navigate("Register")}>go to Register</Button>
            </View>
        </KeyboardAwareScrollView>
    );
};
