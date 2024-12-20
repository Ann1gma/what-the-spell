import { SpellDetails } from "@/types/DnD5e_API.types";
import { View, Text, StyleSheet } from "react-native";

interface SpellDetailsHealingProps {
	spellData: SpellDetails;
}

const SpellDetailsHealingComponent: React.FC<SpellDetailsHealingProps> = ({ spellData }) => {
	if (!spellData.heal_at_slot_level) {
		return <View></View>;
	}

	return (
		<View>
			<Text style={styles.boldText}>Heal at slot level:</Text>

			{spellData.heal_at_slot_level.map((lvl, index) => (
				<View style={styles.infoContainer} key={index}>
					<Text style={styles.text}>Level {lvl.level} :</Text>
					<Text style={styles.text}>{lvl.healing}</Text>
				</View>
			))}
		</View>
	);
};

export default SpellDetailsHealingComponent;

const styles = StyleSheet.create({
	infoContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		marginLeft: "10%",
		marginTop: 3,
	},
	text: {
		fontFamily: "Inter",
		fontSize: 16,
		color: "#2b2b2b",
		marginRight: 5,
	},
	boldText: {
		fontFamily: "Inter",
		fontSize: 18,
		fontWeight: "900",
		color: "#2b2b2b",
		marginRight: 5,
		marginTop: 10,
	},
});
