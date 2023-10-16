import { Image, Text, useColorScheme, View} from "react-native";
import {useContext, useState} from "react";
import { Button, Icon, ProgressBar } from '@ui-kitten/components';
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import logo from "../lib/images/bamx.png"
import FirstRegister from "../components/Register/FirstRegister";
import SecondRegister from "../components/Register/SecondRegister";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SiguienteIcon = (props) => (
    <Icon
      {...props}
      name='arrow-forward-outline'
    />
);

const ProfilePictureIcon = (props) => (
    <Icon
      {...props}
      name='camera-outline'
    />
);

const CvIcon = (props) => (
    <Icon
      {...props}
      name='book-open-outline'
    />
);

const LogInIcon = (props) => (
    <Icon
        {...props}
        name='log-in-outline'
    />
);

const AtrasIcon = (props) => (
    <Icon
        {...props}
        name='arrow-back-outline'
    />
);

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
    const [formDataImg, setFormDataImg] = useState(null)
    const [formDataCV, setFormDataCV] = useState(null)
    const [cv, setCv] = useState(null)

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
            const  uri  = result.assets[0].uri;
            // Create a FormData object to send the image
            const formData = new FormData();
            formData.append('file', {
                uri: uri,
                type: 'image/jpg', // Change the MIME type as per your image type
                name: 'image.jpg',
            });
            setFormDataImg(formData);
        }
    };

    const uploadFile = async () => {
            const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
            const uri = result.assets.at(0).uri;
            const name = result.assets.at(0).name;
            setCv(uri)
            // Create a FormData object to send the document
            const formData = new FormData();
            formData.append('file', {
                uri: uri,
                type: 'application/pdf', // Change the MIME type as per your document type
                name: name,
            });
        setFormDataCV(formData);
    }

    function handleRegisterBtn() {
        const userBody={
            Name: name,
            Email: email,
            Password: password,
            Role: "employee",
            Gender: "Male",
            Rating: 0,
            Description:description,
            FormDataCV:formDataCV,
            FormDataImg:formDataImg
        };
        register({userBody})
    }
    return(
        <KeyboardAwareScrollView>
        <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <Image
                style={{ width: 100, height: 100 }}
                source={logo}
            />
            <ProgressBar
                style={{width: "80%", marginVertical: 14}}
                size="medium"
                status='success'
                progress={(page) / 3}
                />
            {page === 0 &&
                <>
                    <FirstRegister name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                        <Button accessoryLeft={AtrasIcon} style={{ marginHorizontal: 5, width: 142 }} onPress={() => navigation.navigate("Login")}>Atrás</Button>
                        <Button accessoryRight={SiguienteIcon} style={{ marginHorizontal: 5, width: 142 }} onPress={() => setPage(page => page + 1)}>Siguiente</Button>
                    </View> 
                </>
            }
            {page === 1 &&
                <>
                    <SecondRegister description={description} setDescription={setDescription}/>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                        <Button accessoryLeft={AtrasIcon} style={{ marginHorizontal: 5, width: 142 }} onPress={() => setPage(page => page - 1)}>Atrás</Button>
                        <Button accessoryRight={SiguienteIcon} style={{ marginHorizontal: 5, width: 142 }} onPress={() => setPage(page => page + 1)}>Siguiente</Button>
                    </View>   
                </>
            }
            {page === 2 &&
                <>
                    <Button accessoryLeft={ProfilePictureIcon} style={{ width: "50%" }} onPress={pickImage}>Profile Picture</Button>
                    {image ? 
                        <Image source={{ uri: image }} style={{ width: 160, height: 160, marginTop: 10, borderRadius: 100, borderWidth: 2, borderColor: "gray" }} />
                    :
                        <View style={{ width: 160, height: 160, marginTop: 10, borderRadius: 100, borderWidth: 2, justifyContent: 'center', alignItems: 'center', borderColor: "#575756" }}>
                            <Icon
                                style={{ width: 42, height: 42 }}
                                fill='#575756'
                                name='cloud-upload-outline'
                            />
                        </View>
                    }
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                        <Button accessoryLeft={AtrasIcon} style={{ marginHorizontal: 5, width: 142 }} onPress={() => setPage(page => page - 1)}>Atrás</Button>
                        <Button accessoryRight={SiguienteIcon} style={{ marginHorizontal: 5, width: 142 }} onPress={() => setPage(page => page + 1)}>Siguiente</Button>
                    </View>
                </>
            }
            {page === 3 &&
                <>
                    <Button accessoryLeft={CvIcon} style={{width: "50%" }} onPress={uploadFile}>CV</Button>
                        <View style={{ width: 160, height: 160, marginTop: 10, borderRadius: 10, borderWidth: 2, justifyContent: 'center', alignItems: 'center', borderColor: "#575756" }}>
                            {cv === null ?
                            <Icon
                                style={{ width: 42, height: 42 }}
                                fill='#575756'
                                name= 'cloud-upload-outline'
                            />
                            :
                            <Icon
                                style={{ width: 42, height: 42 }}
                                fill='#00a039'
                                name= 'checkmark-circle-outline'
                            />
                            }
                        </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                        <Button accessoryLeft={AtrasIcon} style={{ marginHorizontal: 5, width: 142 }} onPress={() => setPage(page => page - 1)}>Atrás</Button>
                        <Button accessoryRight={LogInIcon} style={{ marginHorizontal: 5, width: 142 }} onPress={handleRegisterBtn}>Register</Button>
                    </View>
                </>
            }
        </View>
        </KeyboardAwareScrollView>
    );
};