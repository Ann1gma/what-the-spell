import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SignupData } from "@/types/User.types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import useAuth from "@/hooks/useAuth";

const SignupFormComponent = () => {
	const [submitting, setSubmitting] = useState(false);

	const { signup } = useAuth();

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

	return (
		<View>
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
					<TextInput style={styles.input} placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value} inputMode="email" />
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
					<TextInput style={styles.input} placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} secureTextEntry />
				)}
				name="password"
			/>
			{errors.password && (
				<Text style={styles.error}>
					Password is required. The password must be at least 8 characters. At least one of the characters must be a number or a special
					character.
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
		</View>
	);
};

export default SignupFormComponent;

const styles = StyleSheet.create({
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
