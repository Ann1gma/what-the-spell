import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import useAuth from "@/hooks/useAuth";
import ErrorComponent from "@/components/ErrorComponent";
import useGetCharacters from "@/hooks/useGetCharacters";
import LogOutComponent from "@/components/LogOutComponent";
import LogInComponent from "@/components/LogInComponent";
import LoadingComponent from "@/components/LoadingComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store";

//@CodeScene(disable:"Complex Method")
//@CodeScene(disable:"Large Method")
const Profile = () => {
	const { currentUser, isLoading } = useAuth();
	const { data } = useGetCharacters(currentUser?.uid);

	const isError = useSelector((state: RootState) => state.error.isError);

	if (isLoading) {
		return <LoadingComponent />;
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Profile</Text>
						</View>
						{isError && <ErrorComponent />}

						{currentUser && <LogOutComponent characterData={data} userEmail={currentUser.email} />}
						{!currentUser && <LogInComponent />}
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
		fontFamily: "Inter",
		color: "#2b2b2b",
		marginBottom: 10,
	},
	textBold: {
		fontSize: 18,
		fontFamily: "Inter",
		fontWeight: "700",
		color: "#2b2b2b",
		marginBottom: 10,
	},
	linkText: {
		fontSize: 20,
		fontFamily: "Inter",
		fontWeight: "700",
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
		fontFamily: "Inter",
		fontWeight: "700",
		marginBottom: 5,
	},
	input: {
		backgroundColor: "#F0E4D1",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		marginBottom: 15,
		fontFamily: "Inter",
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
		fontFamily: "Inter",
		fontWeight: "500",
	},
});
