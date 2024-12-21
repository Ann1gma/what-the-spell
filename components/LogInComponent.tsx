import useAuth from "@/hooks/useAuth";
import { LoginData } from "@/types/User.types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ErrorComponent from "./ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { FirebaseError } from "firebase/app";

//@CodeScene(disable:"Complex Method")
const LogInComponent = () => {
	const errorState = useSelector((state: RootState) => state.error.isError);

	const dispatch = useDispatch();

	const [submitting, setSubmitting] = useState(false);

	const router = useRouter();

	const { login } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>();

	const onLogin: SubmitHandler<LoginData> = async (data) => {
		setSubmitting(true);
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));
		try {
			await login(data.email, data.password);
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Error on login"));
			dispatch(changeIsError(true));
		}
		setSubmitting(false);
	};

	return (
		<View style={styles.formWrapper}>
			{errorState && <ErrorComponent />}
			<View style={styles.subtitleWrapper}>
				<Text style={styles.titleText}>Log in</Text>
				<Text style={[styles.text, { textAlign: "center" }]}>Please log in to access your</Text>
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
					<Text style={styles.textBold}>profile </Text>
					<Text style={styles.text}>and </Text>
					<Text style={styles.textBold}>characters</Text>
				</View>
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

			<Text style={styles.label}>Password*</Text>
			<Controller
				control={control}
				rules={{ required: "Password is required" }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput style={styles.input} placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} secureTextEntry />
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
				<Pressable onPress={() => router.push("/(tabs)/Signup")}>
					<Text style={styles.linkText}>Sign up</Text>
				</Pressable>
			</View>

			<View style={{ marginTop: 30 }}>
				<Text style={[styles.text, { textAlign: "center", marginBottom: 0 }]}>Forgotten your password?</Text>
				<Pressable onPress={() => router.push("/(tabs)/ResetPassword")}>
					<Text style={styles.linkText}>Reset password</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default LogInComponent;

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
		minHeight: "80%",
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
	titleText: {
		fontSize: 24,
		fontFamily: "CinzelBlack",
		color: "#990000",
		textAlign: "center",
		marginBottom: 10,
	},
	text: {
		fontSize: 18,
		fontFamily: "Inter",
		color: "#2b2b2b",
		marginBottom: 5,
	},
	textBold: {
		fontSize: 18,
		fontFamily: "Inter",
		fontWeight: "700",
		color: "#2b2b2b",
		marginBottom: 5,
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
