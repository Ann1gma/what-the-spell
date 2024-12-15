import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground } from "react-native";
import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { SignupData } from "@/types/User.types";
import { Link, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import ErrorComponent from "@/components/ErrorComponent";

const Signup = () => {
	const { currentUser, signup } = useAuth();
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter();

	const isError = useSelector((state: RootState) => state.error.isError);
	const errorMessage = useSelector((state: RootState) => state.error.errorMessage);

	const dispatch = useDispatch();

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<SignupData>();

	const passwordRef = useRef("");
	passwordRef.current = watch("password");

	const onSignup: SubmitHandler<SignupData> = async (data) => {
		setSubmitting(true);

		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

		try {
			await signup(data.email, data.password);
		} catch (err) {
			dispatch(changeErrorMessage("Failed to Sign up. Please check your credentials."));
			dispatch(changeIsError(true));
		}
		setSubmitting(false);
	};

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

	if (isError) {
		return <ErrorComponent />;
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Sign up</Text>
				</View>

				{!currentUser && (
					<View style={styles.formWrapper}>
						<View style={styles.subtitleWrapper}>
							<Text style={[styles.text, { textAlign: "center" }]}>
								Sign up for free to create your magic-casting characters and track their spells!
							</Text>
						</View>
						{isError && <Text style={styles.error}>{errorMessage}</Text>}

						<Text style={styles.label}>Email*</Text>
						<Controller
							control={control}
							rules={{
								required: "Email is required",
								pattern: {
									value: /\S+@\S+\.\S+/,
									message: "Entered value does not match email format",
								},
							}}
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
							rules={{
								required: "Password is required",
								minLength: {
									message: "Enter at least a 8 characters",
									value: 8,
								},
								validate: {
									containsNumberOrSpecialChar: (value) =>
										/[0-9!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one number or special character",
								},
							}}
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
						{errors.password && (
							<Text style={styles.error}>
								Password is required. The password must be at least 8 characters. At least one of the characters must be a number or a
								special character.
							</Text>
						)}

						<Text style={styles.label}>Confirm your password*</Text>
						<Controller
							control={control}
							rules={{
								required: "Password is required",
								validate: (value) => {
									return value === passwordRef.current || "The passwords do not match!";
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder="ConfirmPassword"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									secureTextEntry
								/>
							)}
							name="confirmPassword"
						/>
						{errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

						<Pressable style={styles.button} onPress={handleSubmit(onSignup)} disabled={submitting}>
							<Text style={styles.buttonText}>{submitting ? "Signing up..." : "Sign up"}</Text>
						</Pressable>

						<View style={{ marginTop: 30 }}>
							<Text style={[styles.text, { textAlign: "center", marginBottom: 0 }]}>Already have an account?</Text>
							<Link href="/Login" asChild>
								<Pressable>
									<Text style={styles.linkText}>Login</Text>
								</Pressable>
							</Link>
						</View>
					</View>
				)}
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
