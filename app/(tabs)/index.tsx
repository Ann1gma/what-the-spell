import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AccordionComponent from "@/components/AccordionComponents";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import useGetSpellOverview from "@/hooks/useGetSpellOverview";
import useAuth from "@/hooks/useAuth";
import useGetCharacters from "@/hooks/useGetCharacters";
import AddSpellComponent from "@/components/AddSpellComponent";

//@CodeScene(disable:"Complex Method")
const Index = () => {
	const { currentUser } = useAuth();
	const { data, loading: loadingCharacters } = useGetCharacters(currentUser?.uid);

	const showAddSpells = useSelector((state: RootState) => state.addSpell.showAddSpells);
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
		fetchAllSpells,
		getAllSpellsByClass,
		loading: loadingSpells,
		error: spellError,
	} = useGetSpellOverview();

	useEffect(() => {
		setSubtitle(filtrationOption);
		if (filtrationOption.index !== "none") {
			getAllSpellsByClass(filtrationOption.index);
		} else {
			fetchAllSpells();
		}
	}, [filtrationOption]);

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

				{spellError && <ErrorComponent />}
				{loadingSpells && <LoadingComponent />}
				{showAddSpells && <AddSpellComponent />}

				<SafeAreaView style={styles.scrollContainer}>
					<View style={styles.accordionContainer}>
						<FlatList
							data={[
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
							]}
							renderItem={({ item }) => item.data && <AccordionComponent title={item.title} data={item.data} />}
							keyExtractor={(item) => item.title}
							initialNumToRender={9}
							maxToRenderPerBatch={9}
							windowSize={2}
						/>
					</View>
				</SafeAreaView>
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
