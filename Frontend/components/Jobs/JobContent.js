import { useColorScheme, View} from "react-native";
import { Card, Text } from "react-native-paper";

export default function JobContent({job}) {
    const theme=useColorScheme();
    return(
        <Card style={{ margin: 2 }} mode="outlined">
            <Card.Title title={job.title} />
            <Card.Content>
                <Text variant="bodyMedium">{job.description}</Text>
            </Card.Content>
        </Card>
    );
}