import {Text, View} from "react-native";

export default function UserDetails({user})
{

    return(
        <View style={{ margin: 10 }} mode="outlined">
            <Text>User details</Text>
            <Text>{user.name}</Text>
            <Text>{user.rating}</Text>
            <Text>{user.gender}</Text>
        </View>
    )
}