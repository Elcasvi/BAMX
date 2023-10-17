import {Image, SafeAreaView, Text, useColorScheme, View} from "react-native";
import React from "react";

export default function CourseContent({course})
{
    return(
        <Text>{course.title}</Text>
    );
}