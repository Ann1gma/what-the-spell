import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getSpellDetails, getSpellsByClass, getSpellsByLevel } from "../../services/DnD5e_API";
import { SpellsByLevelOverview, SpellsByClassOverview, SpellDetails } from "../../types/DnD5e_API.types";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useGetCharacters from "../../hooks/useGetCharacters";
import useGetCharacter from "../../hooks/useGetCharacter";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Accordion from "@/components/Accordion";
import useGetSpellsByLevel from "@/hooks/useGetSpellsByLevel";

const Pergament = require("../../assets/images/background-image.jpg");

export default function Index() {
	const [subTitle, setSubtitle] = useState("All spells");
	const {
		cantripsData,
		lvlOneData,
		lvlTwoData,
		lvlThreeData,
		lvlFourData,
		lvlFiveData,
		lvlSixData,
		lvlSevenData,
		lvlEightData,
		lvlNineData,
		error,
		isError,
		isLoading,
	} = useGetSpellsByLevel();

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
							{cantripsData && <Accordion title="Cantrips" data={cantripsData} />}
							{lvlOneData && <Accordion title="Level 1" data={lvlOneData} />}
							{lvlTwoData && <Accordion title="Level 2" data={lvlTwoData} />}
							{lvlThreeData && <Accordion title="Level 3" data={lvlThreeData} />}
							{lvlFourData && <Accordion title="Level 4" data={lvlFourData} />}
							{lvlFiveData && <Accordion title="Level 5" data={lvlFiveData} />}
							{lvlSixData && <Accordion title="Level 6" data={lvlSixData} />}
							{lvlSevenData && <Accordion title="Level 7" data={lvlSevenData} />}
							{lvlEightData && <Accordion title="Level 8" data={lvlEightData} />}
							{lvlNineData && <Accordion title="Level 9" data={lvlNineData} />}
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
