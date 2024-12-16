import useAuth from "@/hooks/useAuth";
import useGetCharacters from "@/hooks/useGetCharacters";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import LoadingComponent from "@/components/LoadingComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CharacterListComponent from "@/components/CharacterListComponent";
import ErrorComponent from "@/components/ErrorComponent";

const Characters = () => {
	const { currentUser } = useAuth();
	const { data } = useGetCharacters(currentUser?.uid);
	const isLoading = useSelector((state: RootState) => state.loading.loading);
	const isError = useSelector((state: RootState) => state.error.isError);
	const router = useRouter();

	const handleAddCharacter = () => {
		router.push({
			pathname: "/(tabs)/AddCharacter",
		});
	};

	if (isLoading) {
		return <LoadingComponent />;
	}

	if (!currentUser) {
		return (
			<View style={styles.container}>
				<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
					<View style={styles.titleContainer}>
						<View>
							<Text style={styles.title}>Characters</Text>
						</View>
						<View style={styles.iconContainer}>
							<Pressable onPress={() => router.back()}>
								<Feather name="arrow-left" size={24} color="#2b2b2b" />
							</Pressable>
						</View>
					</View>
				</ImageBackground>
				<View>
					<Text>You have to login to see and use Characters</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					<View>
						<Text style={styles.title}>Characters</Text>
					</View>
					<View style={styles.iconContainer}>
						<Pressable onPress={() => router.back()}>
							<Feather name="arrow-left" size={24} color="#2b2b2b" />
						</Pressable>
					</View>
				</View>

				{isError && <ErrorComponent />}

				<SafeAreaView style={styles.contentWrapper}>
					{data && data.length > 0 && <CharacterListComponent data={data} />}
					{data && data.length <= 0 && (
						<View style={styles.noCharacterContainer}>
							<Text style={styles.textBold}>No charachters registrered!</Text>
							<View style={{ flexDirection: "row", alignItems: "baseline" }}>
								<Text style={styles.text}>Why not add a</Text>
								<TouchableOpacity activeOpacity={0.8} onPress={handleAddCharacter}>
									<Text style={[styles.textBold, { color: "#990000" }]}>character</Text>
								</TouchableOpacity>
								<Text style={styles.text}>?</Text>
							</View>
						</View>
					)}
					<TouchableOpacity activeOpacity={0.8} onPress={handleAddCharacter}>
						<View style={styles.addCharacterContainer}>
							<Ionicons name="person-add" size={26} color="#2b2b2b" style={{ marginRight: 10 }} />
							<Text style={styles.characterName}>Add character</Text>
						</View>
					</TouchableOpacity>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
};

export default Characters;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	image: {
		width: "100%",
		height: "100%",
		flex: 1,
		resizeMode: "cover",
	},
	titleContainer: {
		backgroundColor: "#F0E4D1",
		height: 50,
		justifyContent: "center",
	},
	title: {
		fontSize: 32,
		fontFamily: "CinzelBlack",
		color: "#990000",
		textAlign: "center",
	},
	text: {
		fontSize: 16,
		fontFamily: "NunitoRegular",
		color: "#2b2b2b",
		marginBottom: 5,
		marginRight: 5,
	},
	textBold: {
		fontSize: 18,
		fontFamily: "NunitoBold",
		color: "#2b2b2b",
		marginBottom: 5,
		marginRight: 5,
	},
	iconContainer: {
		position: "absolute",
		left: "3%",
		zIndex: 1,
	},
	contentWrapper: {
		height: "90%",
		backgroundColor: "rgba(240, 228, 209, 0.3)",
		marginHorizontal: 20,
		marginTop: 10,
		marginBottom: 10,
		paddingBottom: 20,
		flexDirection: "column",
		justifyContent: "space-between",
		borderRadius: 10,
	},
	characterName: {
		fontFamily: "CinzelBold",
		fontSize: 22,
		color: "#990000",
	},
	noCharacterContainer: {
		alignItems: "center",
		marginTop: 30,
	},
	addCharacterContainer: {
		paddingHorizontal: 30,
		marginHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingVertical: 20,
		borderRadius: 10,
		backgroundColor: "#F0E4D1",
	},
	logoContainer: {
		marginRight: 10,
	},
	logo: {
		width: 50,
		height: 50,
	},
});
