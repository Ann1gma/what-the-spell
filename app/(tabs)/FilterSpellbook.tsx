import { useRouter } from "expo-router";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import DropdownComponent from "@/components/DropdownComponent";
import { ClassObject } from "@/types/DnD5e_API.types";
import { useDispatch } from "react-redux";
import { changeFilter } from "@/features/filtration/filtrationSlice";
import useGetAllClasses from "@/hooks/useGetAllClasses";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";

const FilterSpellbook = () => {
	const dispatch = useDispatch();

	const router = useRouter();

	const { options, loading, error } = useGetAllClasses([{ index: "none", name: "All spells" }]);

	const onFiltration = (item: ClassObject) => {
		dispatch(changeFilter(item));
		router.back();
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

				{error && <ErrorComponent />}
				{loading && <LoadingComponent />}

				<ScrollView>
					<View style={styles.formWrapper}>
						<Text style={styles.text}>Filter spells by class</Text>
						<DropdownComponent options={options} onChange={(e) => onFiltration(e)} placeholder="All spells" />
					</View>
				</ScrollView>
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
		marginTop: 10,
		marginBottom: 10,
	},
	iconContainer: {
		position: "absolute",
		left: "3%",
		zIndex: 1,
	},
	formWrapper: {
		justifyContent: "center",
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 20,
		backgroundColor: "rgba(240, 228, 209, 0.3)",
		marginHorizontal: 20,
		marginTop: 20,
		borderRadius: 10,
	},
});
