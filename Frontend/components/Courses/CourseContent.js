import {Image, SafeAreaView, Text, useColorScheme, View} from "react-native";
import {Card} from "react-native-paper";
import React from "react";

export default function CourseContent({course})
{

    return(
        <Card style={{ margin: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Card.Content style={{ flex: 1 }}>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{course.title}</Text>
                    </View>
                    <View style={{ marginBottom: 8,flexDirection: 'row', alignItems:'center' }}>
                        <Text style={{ fontSize: 16 }}>Rating: {course.author}</Text>
                    </View>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 16 }}>Gender: {course.description}</Text>
                    </View>
                </Card.Content>
            </View>
        </Card>
    );
}