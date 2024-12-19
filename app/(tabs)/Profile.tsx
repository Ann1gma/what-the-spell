import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { LoginData } from "@/types/User.types";
import { useRouter } from "expo-router";
import ErrorComponent from "@/components/ErrorComponent";
import useGetCharacters from "@/hooks/useGetCharacters";
import LogOutComponent from "@/components/LogOutComponent";
import LogInComponent from "@/components/LogInComponent";

//@CodeScene(disable:"Complex Method")
//@CodeScene(disable:"Large Method")
const Profile = () => {
	const [error, setError] = useState(false);

	const { currentUser } = useAuth();
	const { data } = useGetCharacters(currentUser?.uid);

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Profile</Text>
						</View>

						{error && <ErrorComponent />}
						{currentUser && <LogOutComponent characterData={data} userEmail={currentUser?.email} setErrorState={(e) => setError(e)} />}
						{!currentUser && <LogInComponent setErrorState={(e) => setError(e)} />}
					</ScrollView>
				</TouchableWithoutFeedback>
			</ImageBackground>
		</View>
	);
};

export default Profile;

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
		marginTop: 20,
		marginHorizontal: 20,
		padding: 20,
	},
	formWrapper: {
		justifyContent: "center",
		paddingHorizontal: 20,
		paddingTop: 50,
		paddingBottom: 20,
		backgroundColor: "rgba(240, 228, 209, 0.5)",
		marginHorizontal: 20,
		marginTop: 20,
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
	label: {
		fontSize: 16,
		fontFamily: "NunitoBold",
		marginBottom: 5,
	},
	input: {
		backgroundColor: "#F0E4D1",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		marginBottom: 15,
		fontFamily: "NunitoRegular",
	},
	button: {
		backgroundColor: "#990000",
		paddingVertical: 12,
		borderRadius: 5,
		alignItems: "center",
		width: "100%",
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontFamily: "NunitoSemiBold",
	},
});
