import { Character } from "@/types/Character.types";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface PrepareButtonComponentProps {
	spellId: string;
	character: Character;
	submitting: boolean;
	handlePress: () => void;
}

const PrepareButtonComponent: React.FC<PrepareButtonComponentProps> = ({ spellId, character, submitting, handlePress }) => {
	const [spellPrepared, setSpellPrepared] = useState(false);

	useEffect(() => {
		const spellIsPrepared = character.prepared_spells?.find((spell) => spell.index === spellId);

		if (spellIsPrepared) {
			setSpellPrepared(true);
		}
	}, [character.prepared_spells, spellId]);

	if (!spellPrepared) {
		return (
			<Pressable style={styles.prepareButton} onPress={handlePress} disabled={submitting}>
				<Text style={styles.prepareText}>PREPARE</Text>
			</Pressable>
		);
	}

	return (
		<Pressable style={styles.preparedButton}>
			<Text style={styles.preparedText}>PREPARED</Text>
		</Pressable>
	);
};

export default PrepareButtonComponent;

const styles = StyleSheet.create({
	prepareButton: {
		backgroundColor: "#990000",
		padding: 5,
		borderRadius: 5,
	},
	preparedButton: {
		backgroundColor: "#615151",
		padding: 5,
		borderRadius: 5,
	},
	prepareText: {
		fontFamily: "NunitoRegular",
		fontSize: 12,
		color: "#ffffff",
	},
	preparedText: {
		fontFamily: "NunitoRegular",
		fontSize: 12,
		color: "#E0E0E0",
	},
});
