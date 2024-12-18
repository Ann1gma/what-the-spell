import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import useAuth from "@/hooks/useAuth";
import { Link, useRouter } from "expo-router";
import SignupFormComponent from "@/components/SignupFormComponent";

const Signup = () => {
	const { currentUser } = useAuth();
	const router = useRouter();

	useEffect(() => {
		const userLoggedIn = async () => {
			await new Promise((r) => setTimeout(r, 5));
			router.replace("/Profile");
		};

		if (currentUser) {
			userLoggedIn();
		}
	}, [currentUser]);

	if (currentUser) {
		return (
			<View style={styles.container}>
				<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Sign up</Text>
					</View>
					<View style={[styles.profileWrapper, { backgroundColor: "rgba(240, 228, 209, 0.5)", borderRadius: 10 }]}>
						<Text style={[styles.text, { marginBottom: 10, textAlign: "center", fontSize: 24 }]}>What are you doing here?</Text>
						<Text style={styles.text}>You're already logged in and thus, already have an account!</Text>
					</View>
				</ImageBackground>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Sign up</Text>
					</View>

					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						{!currentUser && (
							<View style={styles.formWrapper}>
								<View style={styles.subtitleWrapper}>
									<Text style={[styles.text, { textAlign: "center" }]}>
										Sign up for free to create your magic-casting characters and track their spells!
									</Text>
								</View>

								<SignupFormComponent />

								<View style={{ marginTop: 30 }}>
									<Text style={[styles.text, { textAlign: "center", marginBottom: 0 }]}>Already have an account?</Text>
									<Link href="/(tabs)/Profile" asChild>
										<Pressable>
											<Text style={styles.linkText}>Login</Text>
										</Pressable>
									</Link>
								</View>
							</View>
						)}
					</TouchableWithoutFeedback>
				</ScrollView>
			</ImageBackground>
		</View>
	);
};

export default Signup;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: "100%",
		height: "100%",
		flex: 1,
	},
	titleContainer: {
		backgroundColor: "#F0E4D1",
		paddingVertical: 10,
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontFamily: "CinzelBlack",
		color: "#990000",
	},
	subtitleWrapper: {
		marginHorizontal: 20,
	},
	profileWrapper: {
		marginTop: 30,
		marginHorizontal: 20,
		padding: 20,
	},
	formWrapper: {
		justifyContent: "center",
		padding: 20,
		backgroundColor: "rgba(240, 228, 209, 0.5)",
		marginHorizontal: 20,
		marginTop: 50,
		borderRadius: 10,
	},
	text: {
		fontSize: 18,
		fontFamily: "NunitoRegular",
		color: "#2b2b2b",
		marginBottom: 10,
	},
	textBold: {
		fontSize: 18,
		fontFamily: "NunitoBold",
		color: "#2b2b2b",
		marginBottom: 10,
	},
	linkText: {
		fontSize: 20,
		fontFamily: "NunitoBold",
		color: "#990000",
		marginBottom: 10,
		textDecorationLine: "underline",
		textAlign: "center",
	},
	error: {
		color: "red",
		marginBottom: 10,
	},
});
