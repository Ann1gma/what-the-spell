import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { SpellDetails } from "@/types/DnD5e_API.types";
import { getSpellDetails } from "@/services/DnD5e_API";

export default function SpellDetailScreen() {
	const [error, setError] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [spellData, setSpellData] = useState<SpellDetails | null>(null);
	const { id } = useLocalSearchParams();
	const router = useRouter();

	const getSpellData = async (id: string) => {
		setIsLoading(true);
		setIsError(false);
		setError(null);

		try {
			const data = await getSpellDetails(id);
			setSpellData(data);
		} catch (err) {
			setIsError(true);
			setError("Failed to fetch all spells.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (typeof id === "string") {
			getSpellData(id);
		} else {
			getSpellData(id[0]);
		}
	}, [id]);

	if (isLoading) {
		return (
			<View>
				<Text>Loading ...</Text>
			</View>
		);
	}

	if (isError) {
		return (
			<View>
				<Text>ERROR!</Text>
				<Text>{error}</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					{spellData && (
						<View>
							<Text style={styles.title}>{spellData.name}</Text>
						</View>
					)}
					<View style={styles.iconContainer}>
						<Pressable onPress={() => router.back()}>
							<Feather name="arrow-left" size={24} color="#2b2b2b" />
						</Pressable>
					</View>
				</View>
				<View>
					<Text>Spell Index: {id}</Text>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: "100%",
		height: "100%",
		flex: 1,
		resizeMode: "cover",
	},
	titleContainer: {
		flexWrap: "wrap",
		backgroundColor: "#F0E4D1",
		height: 60,
		justifyContent: "center",
		alignContent: "space-between",
	},
	title: {
		fontSize: 24,
		fontFamily: "CinzelBlack",
		color: "#990000",
		textAlign: "center",
	},
	iconContainer: {
		position: "absolute",
		left: "3%",
		zIndex: 1,
	},
});
