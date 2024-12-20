import { Spellslot } from "@/types/Character.types";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import useSpellslots from "@/hooks/useSpellslots";

interface CharacterSpellslotComponentProps {
	spellslots: Spellslot[];
	characterId: string;
}

//@CodeScene(disable:"Complex Method")
const CharacterSpellslotComponent: React.FC<CharacterSpellslotComponentProps> = ({ spellslots, characterId }) => {
	const { useSpellslotsFunc } = useSpellslots(characterId);

	const lvlOne = spellslots.filter((slot) => slot.level === 1);
	const lvlTwo = spellslots.filter((slot) => slot.level === 2);
	const lvlThree = spellslots.filter((slot) => slot.level === 3);
	const lvlFour = spellslots.filter((slot) => slot.level === 4);
	const lvlFive = spellslots.filter((slot) => slot.level === 5);
	const lvlSix = spellslots.filter((slot) => slot.level === 6);
	const lvlSeven = spellslots.filter((slot) => slot.level === 7);
	const lvlEight = spellslots.filter((slot) => slot.level === 8);
	const lvlNine = spellslots.filter((slot) => slot.level === 9);

	return (
		<View>
			{lvlOne.length > 0 && (
				<View style={styles.container}>
					<Text style={styles.text}>Level 1</Text>
					{lvlOne.map((slot) => (
						<Pressable key={slot._id} style={styles.slot} onPress={() => useSpellslotsFunc(slot._id, !slot.used)}>
							<Ionicons name={slot.used ? "radio-button-on" : "radio-button-off"} size={28} color="#990000" />
						</Pressable>
					))}
				</View>
			)}
			{lvlTwo.length > 0 && (
				<View style={styles.container}>
					<Text style={styles.text}>Level 2</Text>
					{lvlTwo.map((slot) => (
						<Pressable key={slot._id} style={styles.slot} onPress={() => useSpellslotsFunc(slot._id, !slot.used)}>
							<Ionicons name={slot.used ? "radio-button-on" : "radio-button-off"} size={28} color="#990000" />
						</Pressable>
					))}
				</View>
			)}
			{lvlThree.length > 0 && (
				<View style={styles.container}>
					<Text style={styles.text}>Level 3</Text>
					{lvlThree.map((slot) => (
						<Pressable key={slot._id} style={styles.slot} onPress={() => useSpellslotsFunc(slot._id, !slot.used)}>
							<Ionicons name={slot.used ? "radio-button-on" : "radio-button-off"} size={28} color="#990000" />
						</Pressable>
					))}
				</View>
			)}
			{lvlFour.length > 0 && (
				<View style={styles.container}>
					<Text style={styles.text}>Level 4</Text>
					{lvlFour.map((slot) => (
						<Pressable key={slot._id} style={styles.slot} onPress={() => useSpellslotsFunc(slot._id, !slot.used)}>
							<Ionicons name={slot.used ? "radio-button-on" : "radio-button-off"} size={28} color="#990000" />
						</Pressable>
					))}
				</View>
			)}
			{lvlFive.length > 0 && (
				<View style={styles.container}>
					<Text style={styles.text}>Level 5</Text>
					{lvlFive.map((slot) => (
						<Pressable key={slot._id} style={styles.slot} onPress={() => useSpellslotsFunc(slot._id, !slot.used)}>
							<Ionicons name={slot.used ? "radio-button-on" : "radio-button-off"} size={28} color="#990000" />
						</Pressable>
					))}
				</View>
			)}
			{lvlSix.length > 0 && (
				<View style={styles.container}>
					<Text style={styles.text}>Level 6</Text>
					{lvlSix.map((slot) => (
						<Pressable key={slot._id} style={styles.slot} onPress={() => useSpellslotsFunc(slot._id, !slot.used)}>
							<Ionicons name={slot.used ? "radio-button-on" : "radio-button-off"} size={28} color="#990000" />
						</Pressable>
					))}
				</View>
			)}
			{lvlSeven.length > 0 && (
				<View style={styles.container}>
					<Text style={styles.text}>Level 7</Text>
					{lvlSeven.map((slot) => (
						<Pressable key={slot._id} style={styles.slot} onPress={() => useSpellslotsFunc(slot._id, !slot.used)}>
							<Ionicons name={slot.used ? "radio-button-on" : "radio-button-off"} size={28} color="#990000" />
						</Pressable>
					))}
				</View>
			)}
			{lvlEight.length > 0 && (
				<View style={styles.container}>
					<Text style={styles.text}>Level 8</Text>
					{lvlEight.map((slot) => (
						<Pressable key={slot._id} style={styles.slot} onPress={() => useSpellslotsFunc(slot._id, !slot.used)}>
							<Ionicons name={slot.used ? "radio-button-on" : "radio-button-off"} size={28} color="#990000" />
						</Pressable>
					))}
				</View>
			)}
			{lvlNine.length > 0 && (
				<View style={styles.container}>
					<Text style={styles.text}>Level 9</Text>
					{lvlNine.map((slot) => (
						<Pressable key={slot._id} style={styles.slot} onPress={() => useSpellslotsFunc(slot._id, !slot.used)}>
							<Ionicons name={slot.used ? "radio-button-on" : "radio-button-off"} size={28} color="#990000" />
						</Pressable>
					))}
				</View>
			)}
		</View>
	);
};

export default CharacterSpellslotComponent;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	text: {
		fontFamily: "Inter",
		fontWeight: "700",
		fontSize: 16,
		color: "#2b2b2b",
		marginRight: 10,
	},
	slot: {
		marginRight: 10,
	},
});
