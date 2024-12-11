import { Text, View, TextInput, ImageBackground, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "expo-router";
import { useState } from "react";
import { LoginData } from "@/types/User.types";
import { FirebaseError } from "firebase/app";
import useAuth from "@/hooks/useAuth";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Login = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { login } = useAuth();
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

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<SafeAreaProvider>
					<SafeAreaView style={styles.formsWrapper}>
						{error && (
							<View>
								<Text>{error}</Text>
							</View>
						)}
						<View>
							<Text style={styles.title}>Login</Text>
						</View>
						<View>
							<Text style={styles.text}>Emailadress*</Text>
							<Controller
								control={control}
								rules={{
									required: {
										value: true,
										message: "You must enter a valid email",
									},
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={[styles.inputText, styles.input]}
										placeholder="Enter email e.g. user@mail.com"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										inputMode="email"
									/>
								)}
								name="email"
							/>
							{errors.email && <Text style={styles.text}>{errors.email.message || "Invalid"}</Text>}
						</View>

						<View>
							<Text style={styles.text}>Password*</Text>
							<Controller
								control={control}
								rules={{
									required: {
										value: true,
										message: "You must enter a valid password",
									},
									minLength: {
										message: "Enter at least a few characters",
										value: 3,
									},
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={[styles.inputText, styles.input]}
										placeholder="password"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										secureTextEntry
									/>
								)}
								name="password"
							/>
							{errors.password && <Text style={styles.text}>{errors.password.message || "Invalid"}</Text>}
						</View>

						<Pressable style={styles.button} onPress={handleSubmit(onLogin)} disabled={submitting}>
							<Text style={styles.buttonText}>Login</Text>
						</Pressable>
					</SafeAreaView>
				</SafeAreaProvider>
			</ImageBackground>
		</View>
	);
};

export default Login;

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
