import * as React from "react";
import {ScrollView, View} from "react-native";
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import {AuthContext} from "../../context/AuthContext";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useContext} from "react";

const BackIcon = (props) => (
    <Icon
      {...props}
      name='arrow-back'
    />
  );

const AssignedIcon = (props) => (
    <Icon
      style={{ width: 32, height: 32, margin: 10, padding: 10 }}
      fill="#8F9BB3"
      name='checkmark-circle-outline'
    />
);

export default function AssignedJobDetailsScreen() {
    const {userInformation}=useContext(AuthContext)
    const navigation=useNavigation();

    const route=useRoute();
    const{params}=route;
    const job=params.job;

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
            <ScrollView style={{ backgroundColor: "#F7F9FC" }}>
                <View style={{ width: "100%", paddingVertical: 18, paddingHorizontal: 30 }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <AssignedIcon/>
                        <Text category='h1'>{job.title}</Text>
                    </View>
                    <Text style={{ marginTop: 20, marginBottom: 6, fontWeight: 700 }} category="h6">Description</Text>
                    <Text style={{ fontWeight: "400" }} category='s1'>{job.description}</Text>
                </View>
            </ScrollView>
        </>
    )
}