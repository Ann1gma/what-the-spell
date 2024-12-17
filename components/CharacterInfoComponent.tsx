import { Character } from "@/types/Character.types";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import CharacterSpellslotComponent from "./CharacterSpellslotComponent";

interface CharacterInfoComponentProps {
	character: Character;
}

const CharacterInfoComponent: React.FC<CharacterInfoComponentProps> = ({ character }) => {
	const [showSpellslots, setShowSpellslots] = useState(false);

	return (
		<View style={styles.characterInfoContainer}>
			<View style={styles.rowContainer}>
				<Text style={styles.classText}>{character.class_name}</Text>
				<Text style={styles.text}> - lvl {character.character_level}</Text>
			</View>
			<View style={styles.rowWrapContainer}>
				{character.spell_attack_modifier && <Text style={styles.text}>Attack mod: {character.spell_attack_modifier}</Text>}
				{character.spell_save_dc && <Text style={styles.text}>Save dc: {character.spell_save_dc}</Text>}
			</View>
			{character.spellslots && (
				<View>
					<Pressable onPress={() => setShowSpellslots(!showSpellslots)} style={styles.spellslotButtonContainer}>
						<Text style={styles.textBold}>Spellslots</Text>
						<Entypo name={showSpellslots ? "minus" : "plus"} size={24} color="#ffff" />
					</Pressable>
					{showSpellslots && <CharacterSpellslotComponent characterId={character._id} spellslots={character.spellslots} />}
				</View>
			)}
			<View style={styles.addIconContainer}>
				<Pressable>
					<MaterialCommunityIcons name="book-plus" size={28} color="#2b2b2b" />
				</Pressable>
			</View>
		</View>
	);
};

export default CharacterInfoComponent;

const styles = StyleSheet.create({
	characterInfoContainer: {
		backgroundColor: "rgba(224, 214, 197, 0.5)",
		paddingHorizontal: 30,
		paddingVertical: 10,
	},
	rowContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "baseline",
	},
	classText: {
		fontFamily: "NunitoBlack",
		fontSize: 22,
		color: "#990000",
	},
	text: {
		fontFamily: "NunitoRegular",
		fontSize: 16,
		color: "#2b2b2b",
	},
	rowWrapContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		marginTop: 8,
	},
	spellslotButtonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: "#990000",
		marginTop: 20,
		marginBottom: 10,
		marginRight: 10,
		width: "48%",
		paddingTop: 3,
		paddingBottom: 5,
		borderRadius: 10,
	},
	textBold: {
		fontFamily: "NunitoBold",
		fontSize: 20,
		color: "#ffff",
		marginRight: 10,
	},
	addIconContainer: {
		flex: 1,
		flexDirection: "row-reverse",
	},
});
