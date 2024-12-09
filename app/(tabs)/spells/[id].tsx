import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function SpellDetailScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Spell Index: {id}</Text>
		</View>
	);
}
