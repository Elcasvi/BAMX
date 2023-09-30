import { Card, Text } from "react-native-paper";

export default function UserDetails({user})
{

    return(
        <Card style={{ marginHorizontal: 8, marginVertical: 2 }} mode="outlined">
            <Card.Title titleStyle={{ fontWeight: "500" }} titleVariant="headlineMedium" title={user.name} />
            <Card.Content>
                <Text variant="bodyMedium">Rating: {user.rating}</Text>
                <Text variant="bodyMedium">Gender: {user.gender}</Text>
            </Card.Content>
        </Card>
    )
}