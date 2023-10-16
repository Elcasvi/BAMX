import {useNavigation} from "@react-navigation/native";
import {Pressable} from "react-native";
import CourseContent from "./CourseContent";

import {Icon,ListItem, Text} from "@ui-kitten/components";

const OfferIcon = (props) => (
    <Icon
        style={{ width: 32, height: 32, margin: 10, padding: 10 }}
        fill="#8F9BB3"
        name='book-outline'
    />
);

export default function Course({course})
{
    const navigation=useNavigation();
    /*
    return(
        <Pressable onPress={()=>navigation.navigate("CourseDetailsScreen",{course})}>
            <CourseContent course={course}/>
        </Pressable>
    );*/

    return(
        <ListItem
            title={() => <Text category='h4'>{course.title}</Text>}
            description={() => <Text category='p1' appearance='hint'>{course.description}</Text>}
            accessoryLeft={OfferIcon}
            onPress={()=>{navigation.navigate("CourseDetailsScreen",{ course });}}
        />
    );
}