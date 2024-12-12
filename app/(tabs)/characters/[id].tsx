import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const CharacterProfile = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Text>Character with id: {id}</Text>
		</View>
	);
};

export default CharacterProfile;
