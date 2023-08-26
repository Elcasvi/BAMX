import * as React from 'react';
import {Button, FlatList, SafeAreaView, Text, View} from "react-native";
import {JobsDummy} from "../data/JobsDummy";
import Job from "../components/Job";

const DATA=JobsDummy

export default function JobsFeedScreen({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Jobs Feed!</Text>
            <Button title="Go to user profile" onPress={() => navigation.navigate('UserProfile')}></Button>

            <FlatList
                data={DATA}
                renderItem={({item}) => <Job job={item}/>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    );
}


