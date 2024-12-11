import useAuth from "@/hooks/useAuth";
import useGetCharacters from "@/hooks/useGetCharacters";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const Characters = () => {
	const { currentUser } = useAuth();
	const { data, loading } = useGetCharacters(currentUser?.uid);

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
					<Text style={styles.title}>Characters</Text>
				</View>
				<View>
					{data && data.length > 0 && (
						<TouchableWithoutFeedback>
							<View>
								<FlatList
									keyExtractor={(item) => item._id}
									data={data}
									style={{ flexGrow: 0 }}
									renderItem={({ item }) => (
										<TouchableOpacity activeOpacity={0.8}>
											<View>
												<Text>Characters name: {item.character_name}</Text>
												<Text>Characters lvl: {item.character_level}</Text>
												<Text>Character class: {item.class_name}</Text>
											</View>
										</TouchableOpacity>
									)}
								/>
							</View>
						</TouchableWithoutFeedback>
					)}
					{data && data.length <= 0 && (
						<TouchableWithoutFeedback>
							<View>
								<Text>You don't have any characters, maybe you should create one! 😊</Text>
							</View>
						</TouchableWithoutFeedback>
					)}
				</View>
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
});
