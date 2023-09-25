import {Text, View} from "react-native";
import {useRoute} from "@react-navigation/native";

export default function (){
    const route=useRoute();
    const{params}=route;
    const user=params.user;
    return(
        <View>
            <Text>User profile screen</Text>
            <Text>{user.name}</Text>
        </View>
    )
}