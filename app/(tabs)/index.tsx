import { useEffect, useState } from "react";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Accordion from "@/components/Accordion";
import useGetSpellsByLevel from "@/hooks/useGetSpellsByLevel";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useGetSpellsByClass from "@/hooks/useGetSpellsByClass";

export default function Index() {
	const filtrationOption = useSelector((state: RootState) => state.filter.selection);
	const [subTitle, setSubtitle] = useState(filtrationOption);
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

	const {
		getAllSpellsByClass,
		cantripsDataClass,
		lvlOneDataClass,
		lvlTwoDataClass,
		lvlThreeDataClass,
		lvlFourDataClass,
		lvlFiveDataClass,
		lvlSixDataClass,
		lvlSevenDataClass,
		lvlEightDataClass,
		lvlNineDataClass,
		classError,
		isClassError,
		classIsLoading,
	} = useGetSpellsByClass();

	useEffect(() => {
		setSubtitle(filtrationOption);
		if (filtrationOption.index !== "none") {
			getAllSpellsByClass(filtrationOption.index);
		}
	}, [filtrationOption]);

	if (isLoading || classIsLoading) {
		return (
			<View>
				<Text>Loading ...</Text>
			</View>
		);
	}

	if (isError || isClassError) {
		return (
			<View>
				<Text>ERROR!</Text>
				{isError && <Text>{error}</Text>}
				{isClassError && <Text>{classError}</Text>}
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					<View>
						<Text style={styles.title}>Spellbook</Text>
						<Text style={styles.subTitle}>{subTitle.index === "none" ? subTitle.name : `Class: ${subTitle.name}`}</Text>
					</View>
					<View style={styles.slidersContainer}>
						<Link href="/FilterSpellbook" asChild>
							<Pressable>
								<FontAwesome6 name="sliders" size={24} color="#2b2b2b" />
							</Pressable>
						</Link>
					</View>
				</View>
				<SafeAreaView style={styles.scrollContainer}>
					<ScrollView>
						{filtrationOption.index === "none" && (
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
						)}
						{filtrationOption.index !== "none" && (
							<View style={styles.accordionContainer}>
								{cantripsDataClass && <Accordion title="Cantrips" data={cantripsDataClass} />}
								{lvlOneDataClass && <Accordion title="Level 1" data={lvlOneDataClass} />}
								{lvlTwoDataClass && <Accordion title="Level 2" data={lvlTwoDataClass} />}
								{lvlThreeDataClass && <Accordion title="Level 3" data={lvlThreeDataClass} />}
								{lvlFourDataClass && <Accordion title="Level 4" data={lvlFourDataClass} />}
								{lvlFiveDataClass && <Accordion title="Level 5" data={lvlFiveDataClass} />}
								{lvlSixDataClass && <Accordion title="Level 6" data={lvlSixDataClass} />}
								{lvlSevenDataClass && <Accordion title="Level 7" data={lvlSevenDataClass} />}
								{lvlEightDataClass && <Accordion title="Level 8" data={lvlEightDataClass} />}
								{lvlNineDataClass && <Accordion title="Level 9" data={lvlNineDataClass} />}
							</View>
						)}
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
