import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { SpellDetails } from "@/types/DnD5e_API.types";
import { getSpellDetails } from "@/services/DnD5e_API";
import LoadingComponent from "@/components/LoadingComponent";

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
		return <LoadingComponent />;
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
						<View style={styles.titleWrapper}>
							<Text style={styles.title}>{spellData.name}</Text>
						</View>
					)}
					<View style={styles.iconContainer}>
						<Pressable onPress={() => router.back()}>
							<Feather name="arrow-left" size={24} color="#2b2b2b" />
						</Pressable>
					</View>
				</View>
				{spellData && (
					<SafeAreaView style={styles.scrollContainer}>
						<ScrollView>
							<View style={styles.contentWrapper}>
								<View style={styles.infoContainer}>
									<Text style={styles.boldText}>Level:</Text>
									<Text style={styles.text}>{spellData.level}</Text>
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
								{spellData.damage && (
									<View>
										<View style={styles.infoContainer}>
											<Text style={styles.boldText}>Damage type:</Text>
											<Text style={styles.text}>{spellData.damage.damage_type.name}</Text>
										</View>
										{spellData.damage.damage_at_slot_level && (
											<View>
												<Text style={[styles.boldText, { marginTop: 10 }]}>Damage at slot level:</Text>

												{spellData.damage.damage_at_slot_level.map((lvl, index) => (
													<View style={[styles.infoContainer, { marginLeft: "10%", marginTop: 3 }]} key={index}>
														<Text style={styles.text}>Level {lvl.level} :</Text>
														<Text style={styles.text}>{lvl.damage}</Text>
													</View>
												))}
											</View>
										)}
									</View>
								)}
								{spellData.heal_at_slot_level && (
									<View>
										<Text style={[styles.boldText, { marginTop: 10 }]}>Heal at slot level:</Text>

										{spellData.heal_at_slot_level.map((lvl, index) => (
											<View style={[styles.infoContainer, { marginLeft: "10%", marginTop: 3 }]} key={index}>
												<Text style={styles.text}>Level {lvl.level} :</Text>
												<Text style={styles.text}>{lvl.healing}</Text>
											</View>
										))}
									</View>
								)}
							</View>

							<View style={styles.contentWrapper}>
								<Text style={styles.boldText}>Description:</Text>
								{spellData.desc.map((paragraph, index) => (
									<View style={[styles.infoContainer, { marginBottom: 20 }]} key={index}>
										<Text style={styles.text}>{paragraph}</Text>
									</View>
								))}
							</View>

							{spellData.higher_level && (
								<View style={styles.contentWrapper}>
									<Text style={styles.boldText}>At higher levels:</Text>
									{spellData.higher_level.map((paragraph, index) => (
										<View style={[styles.infoContainer, { marginBottom: 20 }]} key={index}>
											<Text style={styles.text}>{paragraph}</Text>
										</View>
									))}
								</View>
							)}
							{!spellData.higher_level && (
								<View style={styles.contentWrapper}>
									<Text style={styles.boldText}>At higher levels:</Text>
									<Text style={styles.text}>Nothing happens at higher levels.</Text>
								</View>
							)}
						</ScrollView>
					</SafeAreaView>
				)}
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flex: 1,
		marginTop: 10,
		marginHorizontal: 15,
		padding: 20,
		backgroundColor: "rgba(240, 228, 209, 0.4)",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
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
		minHeight: 60,
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontFamily: "CinzelBlack",
		color: "#990000",
		textAlign: "center",
		paddingVertical: 8,
	},
	titleWrapper: {
		flexWrap: "wrap",
		width: "80%",
		alignContent: "center",
		alignItems: "center",
	},
	iconContainer: {
		position: "absolute",
		left: "3%",
		zIndex: 1,
	},
	contentWrapper: {
		marginVertical: 10,
	},
	infoContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},
	descriptionContainer: {},
	higerLvlContainer: {},
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
