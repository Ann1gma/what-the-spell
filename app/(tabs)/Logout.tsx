import { Text, View, ImageBackground, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import useAuth from "@/hooks/useAuth";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Logout = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { logout } = useAuth();

	const onLogout = async () => {
		setSubmitting(true);
		setError(null);
		try {
			await logout();
			router.replace("/(tabs)/Profile");
		} catch (err) {
			if (err instanceof FirebaseError) {
				setError(err.message);
			} else if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Unknown error occured");
			}
		}
		setSubmitting(false);
	};

	if (error) {
		return (
			<View>
				<Text>{error}</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					<View>
						<Text style={styles.title}>Logout</Text>
					</View>
				</View>
				<SafeAreaProvider>
					<SafeAreaView style={styles.formsWrapper}>
						<Pressable style={styles.button} onPress={onLogout} disabled={submitting}>
							<Text style={styles.buttonText}>Logout</Text>
						</Pressable>
					</SafeAreaView>
				</SafeAreaProvider>
			</ImageBackground>
		</View>
	);
};

export default Logout;

const styles = StyleSheet.create({
	container: {
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
	},
	formsWrapper: {
		width: "80%",
		marginHorizontal: "auto",
		marginVertical: "auto",
	},
	input: {
		paddingVertical: 10,
		backgroundColor: "#F0E4D1",
		borderRadius: 10,
		width: "100%",
		marginBottom: 20,
	},
	inputText: {
		fontFamily: "NunitoSemiBold",
		fontSize: 16,
		color: "#2b2b2b",
		paddingLeft: 10,
	},
	button: {
		borderRadius: 10,
		backgroundColor: "#990000",
		marginTop: 20,
	},
	buttonText: {
		fontFamily: "NunitoSemiBold",
		fontSize: 20,
		color: "#ffffff",
		textAlign: "center",
		paddingVertical: 10,
	},
});
