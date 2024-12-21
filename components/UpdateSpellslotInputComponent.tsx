import { Spellslot } from "@/types/Character.types";
import { useMemo } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface SpellslotInputProps {
	level: number;
	onChange: (levelToChange: number, amount: number) => void;
	initialSpellslots: Spellslot[] | null;
}

const UpdateSpellslotInputComponent: React.FC<SpellslotInputProps> = ({ level, onChange, initialSpellslots }) => {
	const numOfSpellslots = useMemo(() => {
		if (initialSpellslots) {
			return initialSpellslots.filter((item) => item.level === level).length;
		}
		return 0;
	}, [initialSpellslots, level]);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Level {level}</Text>
			<TextInput
				style={styles.input}
				defaultValue={numOfSpellslots.toString()}
				placeholder="0-15"
				maxLength={15}
				keyboardType="number-pad"
				inputMode="numeric"
				onChangeText={(text) => {
					onChange(level, Number(text));
				}}
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
		fontFamily: "Inter",
		color: "#2b2b2b",
		marginBottom: 5,
		marginRight: 12,
		marginTop: 10,
		width: 50,
	},
	input: {
		backgroundColor: "#F0E4D1",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		textAlign: "center",
		fontFamily: "Inter",
		width: "35%",
	},
});