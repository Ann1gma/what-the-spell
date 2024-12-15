import { SpellDetails } from "@/types/DnD5e_API.types";
import { View, Text, StyleSheet } from "react-native";

interface SpellDetailsInfoProps {
	spellData: SpellDetails;
}

const SpellDetailsInfoComponent: React.FC<SpellDetailsInfoProps> = ({ spellData }) => {
	return (
		<View>
			<View style={styles.infoContainer}>
				<Text style={styles.boldText}>Level:</Text>
				<Text style={styles.text}>{spellData.level === 0 ? "Cantrip" : spellData.level}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.boldText}>Casting time:</Text>
				<Text style={styles.text}>{spellData.casting_time}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.boldText}>Duration:</Text>
				<Text style={styles.text}>{spellData.duration}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.boldText}>Components:</Text>
				{spellData.components.map((component, index) => (
					<Text style={styles.text} key={index}>
						{component}
						{spellData.components.length > 1 && index != spellData.components.length - 1 && ","}
					</Text>
				))}
			</View>
			{spellData.material && (
				<View style={styles.infoContainer}>
					<Text style={styles.boldText}>Material:</Text>
					<Text style={styles.text}>{spellData.material}</Text>
				</View>
			)}
			<View style={styles.infoContainer}>
				<Text style={styles.boldText}>Ritual:</Text>
				<Text style={styles.text}>{spellData.ritual ? "Yes" : "No"}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.boldText}>Concentration:</Text>
				<Text style={styles.text}>{spellData.concentration ? "Yes" : "No"}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.boldText}>Range:</Text>
				<Text style={styles.text}>{spellData.range}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.boldText}>School of magic:</Text>
				<Text style={styles.text}>{spellData.school.name}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.boldText}>Classes:</Text>
				{spellData.classes.map((className, index) => (
					<Text style={styles.text} key={className.index}>
						{className.name}
						{spellData.classes.length > 1 && index != spellData.classes.length - 1 && ","}
					</Text>
				))}
			</View>
		</View>
	);
};

export default SpellDetailsInfoComponent;

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
