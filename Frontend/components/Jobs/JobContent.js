import { Card, Text } from "react-native-paper";

export default function JobContent({job}) {
    return(
        <Card style={{ marginHorizontal: 8, marginVertical: 2 }} mode="outlined">
            <Card.Title titleStyle={{ fontWeight: "500" }} titleVariant="headlineMedium" title={job.title} />
            <Card.Content>
                <Text variant="bodyMedium">{job.description}</Text>
            </Card.Content>
        </Card>
    );
}