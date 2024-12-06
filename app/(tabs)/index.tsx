import { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getSpellDetails, getSpellsByClass, getSpellsByLevel } from "./../services/DnD5e_API";
import { SpellsByLevelOverview, SpellsByClassOverview, SpellDetails } from "./../types/DnD5e_API.types";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useGetCharacters from "../hooks/useGetCharacters";
import useGetCharacter from "../hooks/useGetCharacter";

export default function Index() {
	const [spellData, setSpellData] = useState<null | SpellsByLevelOverview[]>(null);
	const [classSpellData, setClassSpellData] = useState<null | SpellsByClassOverview[]>(null);
	const [spellDetails, setSpellDetails] = useState<null | SpellDetails>(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	/* const { data, loading } = useGetCharacters();
	const { data: character } = useGetCharacter("ww1KyrL2O0uWVgHCCtur"); */

	const getAllSpellsByLevel = async () => {
		setIsLoading(true);
		setClassSpellData(null);
		setSpellDetails(null);
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
		setSpellDetails(null);
		try {
			const data = await getSpellsByClass("druid");
			setClassSpellData(data);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	const getSingleSpellDetails = async () => {
		setIsLoading(true);
		setClassSpellData(null);
		setSpellData(null);

		try {
			const data = await getSpellDetails("aid");
			setSpellDetails(data);
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

	const handleGetSpellDetails = () => {
		getSingleSpellDetails();
	};

	return (
		<View style={styles.container}>
			{!spellData && !classSpellData && !spellDetails && (
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
			<View>
				<Pressable
					onPress={handleGetSpellDetails}
					style={({ pressed }) => [styles.getButton, { marginVertical: 0, marginBottom: 5, opacity: pressed ? 0.5 : 1 }]}
				>
					<Text style={styles.getButtonText}>Get details of a single spell</Text>
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

			{spellDetails && (
				<SafeAreaProvider>
					<SafeAreaView style={styles.container} edges={["top"]}>
						<ScrollView>
							<View style={styles.spellContainer}>
								<Text style={styles.spellDetailTitle}>{spellDetails.name}</Text>
								<View style={styles.containerMargin}>
									<Text>Level: {spellDetails.level}</Text>
									<Text>Concentration: {spellDetails.concentration}</Text>
									<Text>Ritual: {spellDetails.ritual}</Text>
									<Text>Casting time: {spellDetails.casting_time}</Text>
									<Text>Duration: {spellDetails.duration}</Text>
									{spellDetails.material && <Text>Material: {spellDetails.material}</Text>}
									<Text>Range: {spellDetails.range}</Text>
								</View>
								<View style={styles.containerMargin}>
									<Text style={styles.spellTitle}>Description: </Text>
									<View style={styles.columnContainer}>
										{spellDetails.desc.map((item) => (
											<Text>{item}</Text>
										))}
									</View>
								</View>
								<View style={styles.containerAllInOneRow}>
									<Text style={styles.spellTitle}>Components</Text>
									<View>
										{spellDetails.components.map((item) => (
											<Text key={item}>{item},</Text>
										))}
									</View>
								</View>
								<View style={styles.containerAllInOneRow}>
									<Text style={styles.spellTitle}>Classes</Text>
									<View>
										{spellDetails.classes.map((item) => (
											<Text key={item.index}>{item.name},</Text>
										))}
									</View>
								</View>
								{spellDetails.area_of_effect && (
									<View style={styles.containerAllInOneRow}>
										<Text style={styles.spellTitle}>Area of Effect</Text>
										<View style={styles.containerAllInOneRow}>
											<Text>Type: {spellDetails.area_of_effect.type}</Text>
											<Text>Size: {spellDetails.area_of_effect.size} feet</Text>
										</View>
									</View>
								)}
								{spellDetails.heal_at_slot_level && (
									<View style={styles.SpellDetailsContainer}>
										<Text style={styles.spellTitle}>Healing</Text>
										<View>
											{spellDetails.heal_at_slot_level.map((item, index) => (
												<View key={index} style={styles.containerAllInOneRow}>
													<Text style={{ marginHorizontal: 5 }}>Level: {item.level}</Text>
													<Text style={{ marginHorizontal: 5 }}>=</Text>
													<Text style={{ marginHorizontal: 5 }}>Healing: {item.healing}</Text>
												</View>
											))}
										</View>
									</View>
								)}
								{spellDetails.damage && (
									<View style={styles.SpellDetailsContainer}>
										<Text style={styles.spellTitle}>Damage</Text>
										<Text>Damage type: {spellDetails.damage.damage_type.name}</Text>
										<Text>{spellDetails.damage.damage_type.desc}</Text>
										<View>
											{spellDetails.damage.damage_at_slot_level.map((item, index) => (
												<View key={index} style={styles.containerAllInOneRow}>
													<Text style={{ marginHorizontal: 5 }}>Level: {item.level}</Text>
													<Text style={{ marginHorizontal: 5 }}>=</Text>
													<Text style={{ marginHorizontal: 5 }}>Damage: {item.damage}</Text>
												</View>
											))}
										</View>
									</View>
								)}
								{spellDetails.higher_level && (
									<View style={styles.SpellDetailsContainer}>
										<Text style={styles.spellTitle}>At higher levels:</Text>
										{spellDetails.higher_level.map((item, index) => (
											<Text key={index}>{item}</Text>
										))}
									</View>
								)}
								{spellDetails.dc && (
									<View style={styles.SpellDetailsContainer}>
										<Text style={styles.spellTitle}>SpellDC:</Text>
										{spellDetails.dc.success && spellDetails.dc.success !== "NONE" && (
											<Text>Success: {spellDetails.dc.success}</Text>
										)}
										{spellDetails.dc.desc && <Text>{spellDetails.dc.desc}</Text>}
										{spellDetails.dc.type && <Text>Type: {spellDetails.dc.type.full_name}</Text>}
									</View>
								)}
							</View>
						</ScrollView>
					</SafeAreaView>
				</SafeAreaProvider>
			)}

			{isLoading && <ActivityIndicator size="large" />}
			{error && <Text>{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 20,
	},
	SpellDetailsContainer: {
		flex: 1,
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
		padding: 10,
		margin: 5,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "red",
	},
	spellTitle: {
		fontWeight: "bold",
		marginRight: 10,
	},
	spellDetailTitle: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 26,
		marginBottom: 10,
	},
	containerAllInOneRow: {
		flexDirection: "row",
		maxWidth: "100%",
	},
	columnContainer: {
		maxWidth: "100%",
	},
	containerMargin: {
		marginBottom: 10,
	},
});
