import {Text, View} from "react-native";
import {useEffect, useState} from "react";

export default function UserProfile({navigation}) {

    const url = "https://bamx.azurewebsites.net/user/1"
    const[data,setData]=useState({})
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color:"#FFF"}}>User profile!</Text>
            <Text style={{color:"#FFF"}}>{data.name}</Text>

        </View>
    );
}

