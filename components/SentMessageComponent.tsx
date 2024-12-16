import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const SentMessageComponent = () => {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<View style={styles.messageContainer}>
				<Text style={styles.textBold}>Sent!</Text>
				<Text style={styles.text}>An email with a link to reset your password will be sent to your email.</Text>
				<Text style={styles.text}>Please go back to Login:</Text>
				<Pressable onPress={() => router.replace("/(tabs)/Profile")}>
					<Text style={styles.link}>Login</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default SentMessageComponent;

const styles = StyleSheet.create({
	container: {
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: height,
		width: width,
		position: "absolute",
		backgroundColor: "rgba(224, 214, 197, 0.5)",
	},
	messageContainer: {
		backgroundColor: "#F0E4D1",
		width: "80%",
		borderRadius: 15,
	},
	textBold: {
		fontFamily: "NunitoBlack",
		fontSize: 20,
		color: "#990000",
		textAlign: "center",
		marginTop: 40,
	},
	text: {
		fontFamily: "NunitoRegular",
		fontSize: 16,
		color: "#2b2b2b",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 10,
	},
	link: {
		fontSize: 20,
		fontFamily: "NunitoBold",
		color: "#990000",
		marginBottom: 60,
		textDecorationLine: "underline",
		textAlign: "center",
	},
});
