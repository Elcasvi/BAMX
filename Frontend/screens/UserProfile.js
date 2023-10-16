import {FlatList, Image, ScrollView, View} from "react-native";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {Button, Text, Input, Icon} from '@ui-kitten/components';
import {useFocusEffect} from "@react-navigation/native";
import * as React from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker"
import {Caption, Card, Paragraph} from "react-native-paper";
import {BASE_URL} from "../config";
import axios from "axios";
import CourseContent from "../components/Courses/CourseContent";
import Course from "../components/Courses/Course";
import AssignedJobContent from "../components/Jobs/AssignedJobContent";

export default function UserProfile({navigation}) {
    const{userInformation}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)
    const [description, setDescription] = useState(userInformation.description)
    const [image, setImage] = useState(null);
    const[assignedJobs,setAssignedJobs]=useState({})
    const[courses,setCourses]=useState({})

    useFocusEffect(
        React.useCallback(() => {
            getAssignedJobs();
            getCourses();
        }, [])
    );

    const uploadFile = () => {
        const pickDocument = async () => {
          let result = await DocumentPicker.getDocumentAsync({});
        };
        pickDocument()
    }

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
    const getAssignedJobs=()=>
    {
        const url=BASE_URL+"/AssignedJob/job/"+userInformation.id
        axios.get(url)
            .then(res => {
                setAssignedJobs(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    const getCourses=()=>
    {
        const url=BASE_URL+"/UserCourses/courses/"+userInformation.id
        axios.get(url)
            .then(res => {
                setCourses(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }


    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
                {
                    userInformation.ProfilePictureUrl!==null?(
                        <Image
                            source={{ uri: userInformation.profilePictureUrl }}
                            style={{ width: 100, height: 100, borderRadius: 100 ,margin: 10, padding: 10 }}
                        />
                    ):(
                        <Icon
                            style={{ width: 70, height: 70, margin: 10, padding: 10 }}
                            fill="#8F9BB3"
                            name='person'
                        />
                    )
                }

                <View style={{ width: "100%" }}>
                    <View style={{flexDirection:"column",alignItems:"center"}}>
                        <Text style={{ fontSize: 16, marginTop: 3, fontWeight: 'bold',}}>{userInformation.name}</Text>
                        <View style={{flexDirection:"row"}}>
                            <Text >{userInformation.rating}</Text>
                            <Icon
                                style={{ width: 20, height: 20}}
                                fill="#FFD300" name='star'/>
                        </View>

                        <Card style={{ margin: 16 }}>
                            <Card.Content>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Description</Text>
                                <Text style={{ fontSize: 16 }}>{description}</Text>
                            </Card.Content>
                        </Card>
                    </View>

                    <Text style={{ marginTop: 6 }} category='s1'>Jobs</Text>
                    <FlatList
                        data={assignedJobs}
                        horizontal={true} // Set the horizontal prop to true
                        renderItem={({ item }) => (
                            <AssignedJobContent job={item}/>
                        )}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<View style={{ height: 50, width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}><Text appearance='hint' category='s1'>No Jobs available</Text></View>}
                    />

                    <Text style={{ marginTop: 6 }} category='s1'>Courses</Text>
                    <FlatList
                        data={courses}
                        horizontal={true} // Set the horizontal prop to true
                        renderItem={({ item }) => (
                            <CourseContent course={item}/>)
                        }
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<View style={{ height: 200, width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}><Text appearance='hint' category='s1'>No Jobs available</Text></View>}
                    />


                    <Text style={{ marginTop: 6 }} category='s1'>CV</Text>
                    <Button style={{width: "50%" }} mode="contained" icon="file" onPress={uploadFile}>CV</Button>
                    <Text style={{ marginTop: 6 }} category='s1'>Profile Picture</Text>
                    <Button style={{width: "50%" }} mode="contained" icon="camera" onPress={pickImage}>Profile Picture</Button>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
                </View>
            </View>
        </ScrollView>
    );
}

