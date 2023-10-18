import {Image, ScrollView, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {BASE_URL} from "../config";
import axios from "axios";
import { StackActions } from '@react-navigation/native';
import {Divider, Layout, TopNavigation, TopNavigationAction,Icon, Button , Text, Input} from "@ui-kitten/components";

const BackIcon = (props) => (
    <Icon
      {...props}
      name='arrow-back'
    />
  );

export default function (){
    const route=useRoute();
    const navigation=useNavigation();
    const{params}=route;
    const user=params.user;
    const job=params.job;

    const hireEmployee=()=>
    {
        assignJobOfferToUser()
        deleteJobOffer()
    }
    const declineEmployee=()=>
    {
        console.log("Decline Employee")
        const url=BASE_URL+"/UserJobOffer/"+job.id+"/"+user.id
        axios.delete(url)
            .then(res => {
                console.log(res.data)
                navigation.goBack()

            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    const assignJobOfferToUser=()=>
    {
        const url=BASE_URL+"/AssignedJob/"+user.id

        const jobDto={
            Title:job.title,
            Description:job.description,
            Created:job.created,
            Enterprise:job.enterprise,
            JobOfferPicture:job.jobOfferPicture
        }
        axios.post(url,jobDto)
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            });
    }
    const deleteJobOffer=()=>
    {
        const url=BASE_URL+"/JobOffer/delete/"+job.id
        axios.delete(url)
            .then(res => {
                //console.log(res.data)
                navigation.goBack();
                navigation.dispatch(
                    StackActions.replace('JobsFeed')
                );
            })
            .catch((error) => {
                alert("Error: "+error)
            });
    }

    return (
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
        <ScrollView style={{ backgroundColor: "#F7F9FC" }}>
            <View style={{ width: "100%", paddingVertical: 18 }}>
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 30 }}>
              <View style={{ width: "100%" }}>
                <View style={{ flex: 1, alignItems: "center" }} >
                  <Image source={{ uri: user.profilePictureUrl }} style={{ width: 100, height: 100, marginTop: 20, borderRadius: 100, borderWidth: 2, borderColor: "gray" }} />
                  <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                  <Text category="h5">{user.rating}</Text>
                  <Icon
                    style={{ width: 24, height: 24, }}
                    fill='orange'
                    name='star'
                  />
                </View>
                </View>
                <Input size="large" status="primary" label="Name" style={{width: "100%", marginVertical: 4 }} value={user.name}/>
                <Input size="large" status="primary" label="E-Mail" style={{width: "100%", marginVertical: 4 }} value={user.email}/>
                <Input size="large" status="primary" label="Gender" style={{width: "100%", marginVertical: 4 }} value={user.gender}/>
                <Input size="large" status="primary" label="Personal descripción" textStyle={{minHeight: 175}} multiline={true} style={{width: "100%", marginVertical: 4}} value={user.description}/>
                
            </View>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
                <Button size="large" status='danger' style={{ marginHorizontal: 5, width: "48%" }} mode="contained" onPress={declineEmployee}>Decline</Button>
                <Button size="large" status='success' style={{ marginHorizontal: 5, width: "48%"}} mode="contained" onPress={hireEmployee}>Hire</Button>
            </View>
            </View>
            </View>
        </ScrollView>
        </>
    );
}