import { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { getSpellsByClass, getSpellsByLevel } from "./services/DnD5e_API";
import { SpellsByLevelOverview, SpellsByClassOverview } from "./types/DnD5e_API.types";

export default function Index() {
	const [spellData, setSpellData] = useState<null | SpellsByLevelOverview[]>(null);
	const [classSpellData, setClassSpellData] = useState<null | SpellsByClassOverview[]>(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const getAllSpellsByLevel = async () => {
		setIsLoading(true);
		setClassSpellData(null);
		try {
			const data = await getSpellsByLevel("NAME", "ASCENDING", 0);
			setSpellData(data);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	const getAllSpellsByClass = async () => {
		setIsLoading(true);
		setSpellData(null);
		try {
			const data = await getSpellsByClass("druid");
			setClassSpellData(data);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGetSpellsByLevel = () => {
		getAllSpellsByLevel();
	};

	const handleGetSpellsByClass = () => {
		getAllSpellsByClass();
	};

	return (
		<View style={styles.container}>
			{!spellData && !classSpellData && (
				<View>
					<Text>No spells to show right now. Try pressing the button!</Text>
				</View>
			)}

			<View style={styles.containerAllInOneRow}>
				<Pressable onPress={handleGetSpellsByLevel} style={({ pressed }) => [styles.getButton, { opacity: pressed ? 0.5 : 1 }]}>
					<Text style={styles.getButtonText}>Get spells lvl 0</Text>
				</Pressable>
				<Pressable onPress={handleGetSpellsByClass} style={({ pressed }) => [styles.getButton, { opacity: pressed ? 0.5 : 1 }]}>
					<Text style={styles.getButtonText}>Get DRUID spells</Text>
				</Pressable>
			</View>

			{spellData && (
				<FlatList
					data={spellData}
					keyExtractor={(spell) => spell.index}
					renderItem={({ item }) => (
						<View style={styles.spellContainer}>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>Name:</Text>
								<Text>{item.name ?? "N/A"}</Text>
							</View>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>Level:</Text>
								<Text>{item.level ?? "N/A"}</Text>
							</View>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>Ritual:</Text>
								<Text>{item.ritual ? "Yes" : "No"}</Text>
							</View>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>Concentration:</Text>
								<Text>{item.concentration ? "Yes" : "No"}</Text>
							</View>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>School of Magic:</Text>
								<Text>{item.school?.name ?? "N/A"}</Text>
							</View>
						</View>
					)}
				/>
			)}

			{classSpellData && (
				<FlatList
					data={classSpellData}
					keyExtractor={(spell) => spell.index}
					renderItem={({ item }) => (
						<View style={styles.spellContainer}>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>Name:</Text>
								<Text>{item.name ?? "N/A"}</Text>
							</View>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>Level:</Text>
								<Text>{item.level ?? "N/A"}</Text>
							</View>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>Ritual:</Text>
								<Text>{item.ritual ? "Yes" : "No"}</Text>
							</View>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>Concentration:</Text>
								<Text>{item.concentration ? "Yes" : "No"}</Text>
							</View>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>School of Magic:</Text>
								<Text>{item.school?.name ?? "N/A"}</Text>
							</View>
							<View style={styles.containerAllInOneRow}>
								<Text style={styles.spellTitle}>Classes:</Text>
								<View>
									{item.classes.map((className) => (
										<Text key={className.name}>{className.name}</Text>
									))}
								</View>
							</View>
						</View>
					)}
				/>
			)}

			{isLoading && <ActivityIndicator size="large" />}
			{error && <Text>{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 20,
	},
	getButton: {
		backgroundColor: "black",
		color: "white",
		borderRadius: 5,
		padding: 10,
		marginVertical: 30,
		marginHorizontal: 5,
	},
	getButtonText: {
		color: "white",
		textAlign: "center",
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
		marginRight: 10,
	},
	containerAllInOneRow: {
		flexDirection: "row",
	},
});
