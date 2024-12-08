import { useRouter } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import DropdownComponent from "@/components/DropdownComponent";
import { SpellDetailsClassObject } from "@/types/DnD5e_API.types";

const FilterSpellbook = () => {
	const router = useRouter();

	const onFiltration = (item: SpellDetailsClassObject) => {
		console.log("selected item: ", item);
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					<View>
						<Text style={styles.title}>Filter Spellbook</Text>
					</View>
					<View style={styles.iconContainer}>
						<Pressable onPress={() => router.back()}>
							<Feather name="arrow-left" size={24} color="#2b2b2b" />
						</Pressable>
					</View>
				</View>
				<Text style={styles.text}>Filter spells by class</Text>
				<DropdownComponent onChange={(e) => onFiltration(e)} placeholder="All spells" />
			</ImageBackground>
		</View>
	);
};

export default FilterSpellbook;

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
		height: 60,
		justifyContent: "center",
		alignContent: "space-between",
	},
	title: {
		fontSize: 26,
		fontFamily: "CinzelBlack",
		color: "#990000",
		textAlign: "center",
	},
	text: {
		fontFamily: "NunitoSemiBold",
		fontSize: 20,
		color: "#2b2b2b",
		textAlign: "center",
		marginTop: 30,
	},
	iconContainer: {
		position: "absolute",
		left: "3%",
		zIndex: 1,
	},
});
