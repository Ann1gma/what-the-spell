import useAuth from "@/hooks/useAuth";
import { Character } from "@/types/Character.types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";

interface LogOutComponentProps {
	characterData: Character[] | null;
	userEmail: string | null | undefined;
	setErrorState: (state: boolean) => void;
}

const LogOutComponent: React.FC<LogOutComponentProps> = ({ characterData, userEmail, setErrorState }) => {
	const [submitting, setSubmitting] = useState(false);

	const { logout } = useAuth();

	const router = useRouter();

	const onLogout = async () => {
		setSubmitting(true);
		setErrorState(false);

		try {
			await logout();
		} catch (err) {
			setErrorState(true);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<View style={[styles.profileWrapper, { backgroundColor: "rgba(240, 228, 209, 0.5)", borderRadius: 10 }]}>
			<Text style={[styles.text, { marginBottom: 20, textAlign: "center", fontSize: 24 }]}>Welcome to your profile!</Text>
			<Text style={[styles.text, styles.textBold]}>User:</Text>
			<Text style={styles.text}>{userEmail}</Text>

			{!characterData && (
				<View>
					<Text style={[styles.text, { marginBottom: 10, marginTop: 40, textAlign: "center" }]}>
						Have you had a look at creating your own personal characters?
					</Text>

					<Text style={[styles.text, { textAlign: "center" }]}>If not take a look here:</Text>

					<Pressable onPress={() => router.push("/Characters")}>
						<Text style={styles.linkText}>Characters</Text>
					</Pressable>
				</View>
			)}

			<View style={styles.profileWrapper}>
				<Text style={styles.text}>Logout:</Text>
				<Pressable style={styles.button} onPress={onLogout} disabled={submitting}>
					<Text style={styles.buttonText}>{submitting ? "Logging out..." : "Log out"}</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default LogOutComponent;

const styles = StyleSheet.create({
	profileWrapper: {
		marginTop: 20,
		marginHorizontal: 20,
		padding: 20,
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
