import { SpellDetails } from "@/types/DnD5e_API.types";
import { View, Text, StyleSheet } from "react-native";

interface SpellDetailsDamageProps {
	spellData: SpellDetails;
}

const SpellDetailsDamageComponent: React.FC<SpellDetailsDamageProps> = ({ spellData }) => {
	if (!spellData.damage) {
		return <View></View>;
	}

	return (
		<View>
			{spellData.damage.damage_type && (
				<View style={styles.infoContainer}>
					<Text style={styles.boldText}>Damage type:</Text>
					<Text style={styles.text}>{spellData.damage.damage_type.name}</Text>
				</View>
			)}
			{spellData.damage.damage_at_slot_level && (
				<View>
					<Text style={[styles.boldText, { marginTop: 10 }]}>Damage at slot level:</Text>

					{spellData.damage.damage_at_slot_level &&
						spellData.damage.damage_at_slot_level.map((lvl, index) => (
							<View style={[styles.infoContainer, { marginLeft: "10%", marginTop: 3 }]} key={index}>
								<Text style={styles.text}>Level {lvl.level} :</Text>
								<Text style={styles.text}>{lvl.damage}</Text>
							</View>
						))}
				</View>
			)}
		</View>
	);
};

export default SpellDetailsDamageComponent;

const styles = StyleSheet.create({
	infoContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},
	text: {
		fontFamily: "NunitoRegular",
		fontSize: 16,
		color: "#2b2b2b",
		marginRight: 5,
	},
	boldText: {
		fontFamily: "NunitoBlack",
		fontSize: 16,
		color: "#2b2b2b",
		marginRight: 5,
	},
});
