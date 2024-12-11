import useAuth from "@/hooks/useAuth";
import { Link, useRouter } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const Profile = () => {
	const { currentUser } = useAuth();
	const router = useRouter();

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					<View>
						<Text style={styles.title}>Profile</Text>
						<Text style={styles.subTitle}>{currentUser ? "Logged in" : "You have to logg in"}</Text>
					</View>
					<View style={styles.iconContainer}>
						<Link href="/FilterSpellbook" asChild>
							<Pressable onPress={() => router.back()}>
								<Feather name="arrow-left" size={24} color="#2b2b2b" />
							</Pressable>
						</Link>
					</View>
				</View>
				<View style={styles.profileWrapper}>
					{currentUser && (
						<Pressable style={styles.button} onPress={() => router.push("/Logout")}>
							<Text style={styles.buttonText}>Logout</Text>
						</Pressable>
					)}
					{!currentUser && (
						<Pressable style={styles.button} onPress={() => router.push("/Login")}>
							<Text style={styles.buttonText}>Login</Text>
						</Pressable>
					)}
				</View>
			</ImageBackground>
		</View>
	);
};

export default Profile;

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
	button: {
		borderRadius: 10,
		backgroundColor: "#990000",
		marginTop: 20,
		width: "80%",
	},
	buttonText: {
		fontFamily: "NunitoSemiBold",
		fontSize: 20,
		color: "#ffffff",
		textAlign: "center",
		paddingVertical: 10,
	},
	profileWrapper: {
		marginHorizontal: "auto",
		marginVertical: "auto",
	},
	iconContainer: {
		position: "absolute",
		left: "5%",
		zIndex: 1,
	},
});
