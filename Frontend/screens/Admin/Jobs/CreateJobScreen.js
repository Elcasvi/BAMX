import {Image, View} from "react-native";
import {BASE_URL} from "../../../config";
import axios from "axios";
import {useState} from "react";
import { Button, Text, Input, Icon, TopNavigation, TopNavigationAction, Layout, Divider } from "@ui-kitten/components"
import {useNavigation} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";

const BackIcon = (props) => (
    <Icon
      {...props}
      name='arrow-back'
    />
  );

export default function CreateJobScreen()
{
    const [image, setImage] = useState(null);
    const [formDataImg, setFormDataImg] = useState(null)
    const PlusIcon = (props) => (
        <Icon
            {...props}
            name='plus-outline'
        />
    );
    const ProfilePictureIcon = (props) => (
        <Icon
            {...props}
            name='camera-outline'
        />
    );
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


    const navigation=useNavigation()
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const createJob=()=>
    {
        const url=BASE_URL+"/JobOffer"
        const jobOfferBody={
            Title:title,
            Description:description,
            Created:"2019-04-28",
            Enterprise:"Virtualtek",
            JobOfferPicture:""
        }
        axios.post(url,jobOfferBody)
            .then(res => {
                console.log(res.data)
                navigation.goBack();

            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    return(
        <>
            <Layout
                style={{ paddingTop: 30 }}
                level='1'
                >
                <TopNavigation
                accessoryLeft={() => <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />}
                title='Atrás'
                />
                <Divider />
            </Layout>
        <KeyboardAwareScrollView style={{ backgroundColor: "#F7F9FC" }}>
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 40, paddingVertical: 20 }}>
                <Text category='h1'>Create Job</Text>
                <Input size="large" status="primary" label="Title" style={{width: "100%", margin: 10 }} placeholder={"Title"} onChangeText={setTitle} value={title}/>
                <Input size="large" status="primary" textStyle={{minHeight: 175}} multiline={true} label="Job descripción" style={{width: "100%" }} placeholder={"Job descripción"} onChangeText={setDescription} value={description}/>

                <Button accessoryLeft={ProfilePictureIcon} style={{ width: "50%",margin:10 }} onPress={pickImage}>Job Picture</Button>
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


                <Button size="large" accessoryLeft={PlusIcon} style={{margin: 20, width: "100%" }} onPress={createJob}>Create Job</Button>
            </View>
        </KeyboardAwareScrollView>
        </>
    );
}