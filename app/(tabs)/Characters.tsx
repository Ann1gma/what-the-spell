import useAuth from "@/hooks/useAuth";
import useGetCharacters from "@/hooks/useGetCharacters";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Pressable } from "react-native";

const Characters = () => {
	const { currentUser } = useAuth();
	const { data, loading } = useGetCharacters(currentUser?.uid);
	const router = useRouter();

	if (loading) {
		return (
			<View style={styles.container}>
				<View>
					<Text>Loading...</Text>
				</View>
			</View>
		);
	}

	if (!currentUser) {
		return (
			<View style={styles.container}>
				<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Characters</Text>
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
				<SafeAreaView style={styles.contentWrapper}>
					{data && data.length > 0 && (
						<View style={styles.charactersContainer}>
							<FlatList
								keyExtractor={(item) => item._id}
								data={data}
								style={{ flexGrow: 0 }}
								renderItem={({ item }) => (
									<TouchableOpacity activeOpacity={0.8}>
										<View style={styles.characterContainer}>
											<View style={{ flexDirection: "row" }}>
												<View style={styles.logoContainer}>
													<Image
														source={require("../../assets/images/wizard_transperent.png")}
														resizeMode="cover"
														style={styles.logo}
													/>
												</View>
												<View>
													<Text style={styles.characterName}>{item.character_name}</Text>
													<View style={{ flexDirection: "row" }}>
														<Text style={styles.text}>{item.class_name}, </Text>
														<Text style={styles.text}>lvl {item.character_level}</Text>
													</View>
												</View>
											</View>
											<View>
												<Entypo name="chevron-small-right" size={28} color="#2b2b2b" />
											</View>
										</View>
									</TouchableOpacity>
								)}
							/>
						</View>
					)}
					{data && data.length <= 0 && (
						<View>
							<Text>You don't have any characters, maybe you should create one! 😊</Text>
						</View>
					)}
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
	iconContainer: {
		position: "absolute",
		left: "3%",
		zIndex: 1,
	},
	contentWrapper: {
		height: "100%",
		backgroundColor: "rgba(240, 228, 209, 0.3)",
		marginHorizontal: 20,
		marginTop: 10,
		borderTopWidth: 5,
		borderTopColor: "#F0E4D1",
	},
	charactersContainer: {},
	characterContainer: {
		paddingHorizontal: 10,
		paddingVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		borderBottomWidth: 5,
		borderBottomColor: "#F0E4D1",
		/* backgroundColor: "rgba(153, 0, 0, 0.1)", */
		backgroundColor: "rgba(240, 228, 209, 0.3)",
		justifyContent: "space-between",
	},
	characterName: {
		fontFamily: "CinzelBold",
		fontSize: 22,
		color: "#990000",
	},
	addCharacterContainer: {},
	logoContainer: {
		marginRight: 10,
	},
	logo: {
		width: 50,
		height: 50,
	},
});
