import { Image, useColorScheme, View} from "react-native";
import { Text, TextInput, Button } from 'react-native-paper';
import {useContext, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import logo from "../lib/images/bamx.png"
import FirstRegister from "../components/Register/FirstRegister";
import SecondRegister from "../components/Register/SecondRegister";

export default function Register()
{
    const {register}=useContext(AuthContext);
    const navigation=useNavigation();
    const theme=useColorScheme();
    const [user,setUser]=useState({})
    const [loading,setLoading]=useState(false)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [description,setDescription]=useState("")
    const [page, setPage] = useState(0)
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    function handleRegisterBtn() {
        const userBody={
            Name: name,
            email: email,
            password: password,
            Role: "employee",
            Gender: "Male",
            Rating: 0
        };
        register({userBody})
    }
    return(
        <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <Image
                style={{ width: 100, height: 100 }}
                source={logo}
            />
            {page === 0 &&
                <>
                    <FirstRegister name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
                    <Button style={{width: "50%" }} mode="contained" onPress={() => setPage(page => page + 1)}>Siguiente</Button>
                </>
            }
            {page === 1 &&
                <>
                    <SecondRegister description={description} setDescription={setDescription}/>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Button style={{ marginHorizontal: 5 }} mode="contained" onPress={() => setPage(page => page - 1)}>Atrás</Button>
                        <Button style={{ marginHorizontal: 5 }} mode="contained" onPress={() => setPage(page => page + 1)}>Siguiente</Button>
                    </View>
                    
                </>
            }
            {page === 2 &&
                <>
                    <Button style={{width: "50%", marginVertical: 10 }} mode="contained" icon="camera" onPress={pickImage}>Profile Picture</Button>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Button style={{ marginHorizontal: 5 }} mode="contained" onPress={() => setPage(page => page - 1)}>Atrás</Button>
                        <Button style={{ marginHorizontal: 5 }} mode="contained" onPress={() => setPage(page => page + 1)}>Siguiente</Button>
                    </View>
                </>
            }
        </View>
    );
};