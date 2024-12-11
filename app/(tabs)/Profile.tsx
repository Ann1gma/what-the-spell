import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { LoginData } from "@/types/User.types";
import { Link } from "expo-router";

const Profile = () => {
	const { currentUser, login, logout } = useAuth();
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>();

	const onLogin: SubmitHandler<LoginData> = async (data) => {
		setSubmitting(true);
		setError(null);
		try {
			await login(data.email, data.password);
		} catch (err) {
			setError("Failed to login. Please check your credentials.");
		}
		setSubmitting(false);
	};

	const onLogout = async () => {
		setSubmitting(true);
		try {
			await logout();
		} catch (err) {
			setError("Failed to logout.");
		}
		setSubmitting(false);
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Profile</Text>
				</View>

				{currentUser ? (
					<View style={[styles.profileWrapper, { backgroundColor: "rgba(240, 228, 209, 0.5)", borderRadius: 10 }]}>
						<Text style={[styles.text, { marginBottom: 10, textAlign: "center", fontSize: 24 }]}>Welcome to your profile!</Text>
						<Text style={styles.text}>Logged in</Text>
						<View style={{ flexDirection: "row", marginBottom: 40 }}>
							<Text style={[styles.text, styles.textBold, { marginRight: 5 }]}>Email:</Text>
							<Text style={styles.text}>{currentUser.email}</Text>
						</View>

						<Text style={[styles.text, { marginBottom: 10 }]}>Have you had a look at creating your own personal characters?</Text>

						<Text style={styles.text}>If not take a look here:</Text>
						<Link href="/Characters" asChild>
							<Pressable>
								<Text style={styles.linkText}>Characters</Text>
							</Pressable>
						</Link>

						<View style={styles.profileWrapper}>
							<Text style={styles.text}>Logout:</Text>
							<Pressable style={styles.button} onPress={onLogout} disabled={submitting}>
								<Text style={styles.buttonText}>{submitting ? "Logging out..." : "Log out"}</Text>
							</Pressable>
						</View>
					</View>
				) : (
					<View style={styles.formWrapper}>
						<View style={styles.subtitleWrapper}>
							<Text style={[styles.text, { textAlign: "center" }]}>Please log in to access your</Text>
							<View style={{ flexDirection: "row", justifyContent: "center" }}>
								<Text style={styles.textBold}>profile </Text>
								<Text style={styles.text}>and </Text>
								<Text style={styles.textBold}>characters</Text>
							</View>
						</View>
						{error && <Text style={styles.error}>{error}</Text>}

						<Text style={styles.label}>Email*</Text>
						<Controller
							control={control}
							rules={{ required: "Email is required" }}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder="Email"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									inputMode="email"
								/>
							)}
							name="email"
						/>
						{errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

						<Text style={styles.label}>Password*</Text>
						<Controller
							control={control}
							rules={{ required: "Password is required" }}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder="Password"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									secureTextEntry
								/>
							)}
							name="password"
						/>
						{errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

						<Pressable style={styles.button} onPress={handleSubmit(onLogin)} disabled={submitting}>
							<Text style={styles.buttonText}>{submitting ? "Logging in..." : "Login"}</Text>
						</Pressable>

						<View style={{ marginTop: 30 }}>
							<Text style={[styles.text, { textAlign: "center", marginBottom: 0 }]}>Don't have an account?</Text>
							<Text style={[styles.text, { textAlign: "center", marginBottom: 0 }]}>Sign up! - It's Free</Text>
							<Link href="/Signup" asChild>
								<Pressable>
									<Text style={styles.linkText}>Sign up</Text>
								</Pressable>
							</Link>
						</View>
					</View>
				)}
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
