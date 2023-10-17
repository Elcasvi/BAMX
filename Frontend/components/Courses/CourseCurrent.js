import {useNavigation} from "@react-navigation/native";

import {Icon,ListItem, Text} from "@ui-kitten/components";

const OfferIcon = (props) => (
    <Icon
        style={{ width: 32, height: 32, margin: 10, padding: 10 }}
        fill="#8F9BB3"
        name='edit-2-outline'
    />
);

export default function CourseCurrent({course})
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