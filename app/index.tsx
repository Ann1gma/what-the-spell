import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import getSpells from "./services/DnD5e_API";
import { SpellsOverview } from "./types/DnD5e_API.types";

export default function Index() {
	const [spellData, setSpellData] = useState<null | SpellsOverview[]>();
	const [error, setError] = useState("");

	const getAllSpells = async () => {
		try {
			const data = await getSpells("NAME", "ASCENDING", 0);
			setSpellData(data);
		} catch (err) {
			setError((err as Error).message);
		}
	};

	const handlePress = () => {
		getAllSpells();
	};

	return (
		<View
			style={[
				styles.container,
				{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				},
			]}
		>
			{!spellData && (
				<>
					<Text>No spells to show right now. Try pressing the button!</Text>
					<Pressable onPress={handlePress}>
						<Text style={styles.getButton}>Get data</Text>
					</Pressable>
				</>
			)}

			{spellData && (
				<FlatList
					data={spellData}
					keyExtractor={(spell) => spell.index}
					renderItem={({ item }) => (
						<View style={styles.spellContainer}>
							<Text>
								<Text style={styles.spellTitle}>Name:</Text> {item.name}
							</Text>
							<Text>
								<Text style={styles.spellTitle}>Level:</Text> {item.level}
							</Text>
							<Text>
								<Text style={styles.spellTitle}>Ritual:</Text> {item.ritual ? "Yes" : "No"}
							</Text>
							<Text>
								<Text style={styles.spellTitle}>Concentration:</Text> {item.concentration ? "Yes" : "No"}
							</Text>
							<Text>
								<Text style={styles.spellTitle}>School of Magic:</Text> {item.school.name}
							</Text>
						</View>
					)}
				/>
			)}

			{error && <Text>{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	getButton: {
		backgroundColor: "black",
		color: "white",
		borderRadius: 5,
		padding: 10,
		marginTop: 10,
	},
	spellContainer: {
		padding: 5,
		marginTop: 5,
		marginBottom: 5,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "red",
	},
	spellTitle: {
		fontWeight: "bold",
	},
});
