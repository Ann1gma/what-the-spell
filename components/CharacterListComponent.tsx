import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Character } from "@/types/Character.types";
import { useRouter } from "expo-router";

interface AccordionComponentProps {
	data: Character[];
}

const CharacterListComponent: React.FC<AccordionComponentProps> = ({ data }) => {
	const router = useRouter();

	const handlePress = (id: string) => {
		router.push({
			pathname: "/(tabs)/characters/[id]",
			params: { id },
		});
	};

	return (
		<View>
			<FlatList
				keyExtractor={(item) => item._id}
				data={data}
				style={{ flexGrow: 0 }}
				renderItem={({ item, index }) => (
					<TouchableOpacity activeOpacity={0.8} onPress={() => handlePress(item._id)}>
						<View style={index === 0 ? styles.firstCharacterContainer : styles.characterContainer}>
							<View style={{ flexDirection: "row" }}>
								<View style={styles.logoContainer}>
									<Image source={require("../assets/images/wizard_transperent.png")} resizeMode="cover" style={styles.logo} />
								</View>
								<View>
									<Text style={styles.characterName}>{item.character_name}</Text>
									<View style={{ flexDirection: "row" }}>
										<Text style={styles.text}>{item.class.name}, </Text>
										<Text style={styles.text}>lvl {item.character_level}</Text>
									</View>
								</View>
							</View>
							<View>
								<Entypo name="chevron-small-right" size={28} color="#2b2b2b" />
							</View>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default CharacterListComponent;

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		fontFamily: "Inter",
		color: "#2b2b2b",
		marginBottom: 5,
		marginRight: 5,
	},
	firstCharacterContainer: {
		paddingHorizontal: 10,
		paddingVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		borderTopWidth: 5,
		borderTopColor: "#F0E4D1",
		borderBottomWidth: 5,
		borderBottomColor: "#F0E4D1",
		backgroundColor: "rgba(240, 228, 209, 0.5)",
		justifyContent: "space-between",
	},
	characterContainer: {
		paddingHorizontal: 10,
		paddingVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		borderTopWidth: 5,
		borderTopColor: "#F0E4D1",
		borderBottomWidth: 5,
		borderBottomColor: "#F0E4D1",
		backgroundColor: "rgba(240, 228, 209, 0.5)",
		justifyContent: "space-between",
	},
	characterName: {
		fontFamily: "CinzelBold",
		fontSize: 22,
		color: "#990000",
	},
	logoContainer: {
		marginRight: 10,
	},
	logo: {
		width: 50,
		height: 50,
	},
});
