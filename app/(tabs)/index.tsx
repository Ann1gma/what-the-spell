import { useEffect, useRef, useState } from "react";
import { ScrollView, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AccordionComponent from "@/components/AccordionComponents";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import useGetSpellOverview from "@/hooks/useGetSpellOverview";
import AddSpellComponent from "@/components/AddSpellComponent";

const Index = () => {
	const showAddSpells = useSelector((state: RootState) => state.addSpell.showAddSpells);
	const filtrationOption = useSelector((state: RootState) => state.filter.selection);

	const isError = useSelector((state: RootState) => state.error.isError);

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
		fetchAllSpells,
		getAllSpellsByClass,
		loading: loadingSpells,
	} = useGetSpellOverview();

	useEffect(() => {
		setSubtitle(filtrationOption);
		if (filtrationOption.index !== "none") {
			getAllSpellsByClass(filtrationOption.index);
		} else {
			fetchAllSpells();
		}
	}, [filtrationOption]);

	const spellData = [
		{ title: "Cantrips", data: cantripsData },
		{ title: "Level 1", data: lvlOneData },
		{ title: "Level 2", data: lvlTwoData },
		{ title: "Level 3", data: lvlThreeData },
		{ title: "Level 4", data: lvlFourData },
		{ title: "Level 5", data: lvlFiveData },
		{ title: "Level 6", data: lvlSixData },
		{ title: "Level 7", data: lvlSevenData },
		{ title: "Level 8", data: lvlEightData },
		{ title: "Level 9", data: lvlNineData },
	];

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

				{isError && <ErrorComponent />}
				{loadingSpells && <LoadingComponent />}
				{showAddSpells && <AddSpellComponent />}

				<ScrollView style={styles.scrollContainer}>
					{spellData &&
						spellData.map((item, index) => (
							<View key={item.title} style={styles.accordionContainer}>
								{item.data && item.data.length > 0 && <AccordionComponent title={item.title} data={item.data} />}
							</View>
						))}

					<View style={styles.footerContainer}>
						<Text style={styles.footerText}>All spell data is from</Text>
						<Text style={styles.footerTextItalic}>D&D 5e SRD API</Text>
					</View>
				</ScrollView>
			</ImageBackground>
		</View>
	);
};

export default Index;

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
		fontFamily: "Inter",
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
	},
	footerContainer: {
		flexDirection: "row",
		padding: 40,
		justifyContent: "center",
	},
	footerText: {
		fontFamily: "Inter",
		fontSize: 16,
		color: "#2b2b2b",
		marginRight: 5,
	},
	footerTextItalic: {
		fontFamily: "Inter",
		fontSize: 16,
		color: "#990000",
		fontStyle: "italic",
		fontWeight: "700",
	},
});
