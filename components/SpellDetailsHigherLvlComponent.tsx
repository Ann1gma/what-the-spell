import { SpellDetails } from "@/types/DnD5e_API.types";
import { View, Text, StyleSheet } from "react-native";

interface SpellDetailsInfoProps {
	spellData: SpellDetails;
}

const SpellDetailsHigherLvlComponent: React.FC<SpellDetailsInfoProps> = ({ spellData }) => {
	if (!spellData.higher_level) {
		return (
			<View style={styles.contentWrapper}>
				<Text style={styles.boldText}>At higher levels:</Text>
				<Text style={styles.text}>Nothing happens at higher levels.</Text>
			</View>
		);
	}

	return (
		<View style={styles.contentWrapper}>
			<Text style={styles.boldText}>At higher levels:</Text>
			{spellData.higher_level.map((paragraph, index) => (
				<View style={[styles.infoContainer, { marginBottom: 20 }]} key={index}>
					<Text style={styles.text}>{paragraph}</Text>
				</View>
			))}
		</View>
	);
};

export default SpellDetailsHigherLvlComponent;

const styles = StyleSheet.create({
	infoContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},
	contentWrapper: {
		marginVertical: 10,
	},
	text: {
		fontFamily: "Inter",
		fontSize: 16,
		color: "#2b2b2b",
		marginRight: 5,
	},
	boldText: {
		fontFamily: "Inter",
		fontWeight: "900",
		fontSize: 18,
		color: "#2b2b2b",
		marginRight: 5,
	},
});
