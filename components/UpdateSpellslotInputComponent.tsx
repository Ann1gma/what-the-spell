import { Spellslot } from "@/types/Character.types";
import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface SpellslotInputProps {
	level: number;
	onChange: (levelToChange: number, amount: number) => void;
	spellSlots: Spellslot[] | null | undefined;
}

const UpdateSpellslotInputComponent: React.FC<SpellslotInputProps> = ({ level, onChange, spellSlots }) => {
	const [numOfSlots, setNumOfSlots] = useState(0);

	useEffect(() => {
		if (spellSlots) {
			const exsistingSlots = spellSlots.filter((slot) => slot.level === level);

			if (exsistingSlots.length > 0) {
				setNumOfSlots(exsistingSlots.length);
			}
		}
	}, [spellSlots]);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Level {level}</Text>
			<TextInput
				style={styles.input}
				placeholder="0-30"
				keyboardType="number-pad"
				inputMode="numeric"
				onChangeText={(text) => {
					onChange(level, Number(text));
					setNumOfSlots(Number(text));
				}}
				value={numOfSlots.toString()}
			/>
		</View>
	);
};

export default UpdateSpellslotInputComponent;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "baseline",
	},
	text: {
		fontSize: 14,
		fontFamily: "NunitoRegular",
		color: "#2b2b2b",
		marginBottom: 5,
		marginRight: 12,
		marginTop: 10,
	},
	input: {
		backgroundColor: "#F0E4D1",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		textAlign: "center",
		fontFamily: "NunitoRegular",
		width: "35%",
	},
});
