import { Image, useColorScheme, View } from "react-native";
import { Input, Button, Icon, Spinner } from '@ui-kitten/components';
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

const LoadingIndicator = (props) => (
    <View style={[props.styles]}>
      <Spinner />
    </View>
  );

export default function Login()
{
    const {login, isLoading}= useContext(AuthContext);
    const navigation=useNavigation();
    const theme=useColorScheme();
    const [user,setUser]=useState({})
    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: "#F7F9FC" }}>
            <View style={{ flex: 1, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20 }}>
                <Image
                    style={{ width: 100, height: 100, marginVertical: 20 }}
                    source={logo}
                />
                <Input size="large" status="primary" label="E-Mail" style={{width: "100%", marginBottom: 10 }} placeholder={"E-Mail"} onChangeText={setEmail} value={email}/>
                <Input size="large" status="primary" label="Password" secureTextEntry={true} style={{width: "100%" }} placeholder={"Password"} onChangeText={setPassword} value={password}/>
                {isLoading ? <Button accessoryRight={LoadingIndicator} disabled style={{width: 142, marginTop: 10, marginBottom: 5 }}>Login</Button> :
                <Button accessoryRight={LogInIcon} style={{width: 142, marginTop: 10, marginBottom: 5 }} onPress={()=>login({email,password})}>Login</Button>}
            </View>
        </KeyboardAwareScrollView>
    );
};