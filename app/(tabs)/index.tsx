import { useState } from "react";
import { ActivityIndicator, FlatList, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getSpellDetails, getSpellsByClass, getSpellsByLevel } from "../../services/DnD5e_API";
import { SpellsByLevelOverview, SpellsByClassOverview, SpellDetails } from "../../types/DnD5e_API.types";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useGetCharacters from "../../hooks/useGetCharacters";
import useGetCharacter from "../../hooks/useGetCharacter";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Accordion from "@/components/Accordion";

const Pergament = require("../../assets/images/background-image.jpg");

export default function Index() {
	const [subTitle, setSubtitle] = useState("All spells");

	return (
		<View style={styles.container}>
			<ImageBackground source={Pergament} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					<View>
						<Text style={styles.title}>Spellbook</Text>
						<Text style={styles.subTitle}>{subTitle}</Text>
					</View>
					<View style={styles.slidersContainer}>
						<Pressable>
							<FontAwesome6 name="sliders" size={24} color="#2b2b2b" />
						</Pressable>
					</View>
				</View>
				<SafeAreaView style={styles.scrollContainer}>
					<ScrollView>
						<View style={styles.accordionContainer}>
							<Accordion title="Cantrips" />
							<Accordion title="Level 1" />
							<Accordion title="Level 2" />
							<Accordion title="Level 3" />
							<Accordion title="Level 4" />
							<Accordion title="Level 5" />
							<Accordion title="Level 6" />
							<Accordion title="Level 7" />
							<Accordion title="Level 8" />
							<Accordion title="Level 9" />
						</View>
					</ScrollView>
				</SafeAreaView>
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
		marginTop: 30,
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
		height: 80,
		justifyContent: "center",
		alignContent: "space-between",
	},
	title: {
		fontSize: 32,
		fontFamily: "CinzelBlack",
		color: "#990000",
		textAlign: "center",
	},
	subTitle: {
		fontSize: 18,
		fontFamily: "NunitoRegular",
		color: "#2b2b2b",
		textAlign: "center",
	},
	slidersContainer: {
		position: "absolute",
		left: "90%",
		zIndex: 1,
	},
	accordionContainer: {
		marginHorizontal: 15,
		marginVertical: 15,
	},
});
