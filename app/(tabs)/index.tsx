import { useState } from "react";
import { ActivityIndicator, FlatList, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getSpellDetails, getSpellsByClass, getSpellsByLevel } from "../../services/DnD5e_API";
import { SpellsByLevelOverview, SpellsByClassOverview, SpellDetails } from "../../types/DnD5e_API.types";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useGetCharacters from "../../hooks/useGetCharacters";
import useGetCharacter from "../../hooks/useGetCharacter";

const Pergament = require("../../assets/images/background-image.jpg");

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

	return (
		<View style={styles.container}>
			<ImageBackground source={Pergament} resizeMode="cover" style={styles.image}>
				<SafeAreaView>
					<ScrollView></ScrollView>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	image: {
		width: "100%",
		height: "100%",
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
	},
});
