import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import ErrorComponent from "@/components/ErrorComponent";
import { View, ImageBackground, TouchableWithoutFeedback, Keyboard, Text, Pressable, StyleSheet, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { ResetPasswordData } from "@/types/User.types";
import SentMessageComponent from "@/components/SentMessageComponent";

const ResetPassword = () => {
	const { resetPassword } = useAuth();
	const [submitting, setSubmitting] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const [error, setError] = useState(false);

	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ResetPasswordData>();

	const onResetPassword: SubmitHandler<ResetPasswordData> = async (data) => {
		setSubmitting(true);
		setError(false);

		try {
			await resetPassword(data.email);
			reset();
			setShowMessage(true);
		} catch (err) {
			setError(true);
		}
		setSubmitting(false);
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Reset password</Text>
						</View>

						{error && <ErrorComponent />}

						{showMessage && <SentMessageComponent />}

						<View style={styles.formWrapper}>
							<View style={styles.subtitleWrapper}>
								<Text style={[styles.text, { textAlign: "center" }]}>
									Enter the email connected to your account and submit to get an email with a link to reset your password
								</Text>
							</View>

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
										keyboardType="email-address"
										inputMode="email"
									/>
								)}
								name="email"
							/>
							{errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

							<Pressable style={styles.button} onPress={handleSubmit(onResetPassword)} disabled={submitting}>
								<Text style={styles.buttonText}>{submitting ? "Sending a new password..." : "Send me a new password"}</Text>
							</Pressable>

							<View style={{ marginTop: 30 }}>
								<Text style={[styles.text, { textAlign: "center", marginBottom: 0 }]}>Back to Login?</Text>
								<Pressable onPress={() => router.push("/(tabs)/Profile")}>
									<Text style={styles.linkText}>Login</Text>
								</Pressable>
							</View>
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</ImageBackground>
		</View>
	);
};

export default ResetPassword;

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
