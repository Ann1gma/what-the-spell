import { useRouter } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const FilterSpellbook = () => {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					<View>
						<Text style={styles.title}>Filter Spellbook</Text>
					</View>
					<View style={styles.slidersContainer}>
						<Pressable onPress={() => router.back()}>
							<Feather name="arrow-left" size={24} color="#2b2b2b" />
						</Pressable>
					</View>
				</View>
				<Text>Filter Spellbook</Text>
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
	subTitle: {
		fontSize: 18,
		fontFamily: "NunitoRegular",
		color: "#2b2b2b",
		textAlign: "center",
	},
	slidersContainer: {
		position: "absolute",
		left: "3%",
		zIndex: 1,
	},
});
