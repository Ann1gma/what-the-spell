import useAuth from "@/hooks/useAuth";
import { Character } from "@/types/Character.types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";
import ErrorComponent from "./ErrorComponent";

interface LogOutComponentProps {
	characterData: Character[] | null;
	userEmail: string | null | undefined;
}

const LogOutComponent: React.FC<LogOutComponentProps> = ({ characterData, userEmail }) => {
	const [error, setError] = useState(false);

	const { logout } = useAuth();

	const router = useRouter();

	const onLogout = async () => {
		try {
			await logout();
			setTimeout(() => {
				router.replace("/"); // Navigera när currentUser har uppdaterats
			}, 100); // Kort delay för att låta state uppdateras
		} catch (err) {
			setError(true);
		}
	};

	return (
		<View style={[styles.profileWrapper, { backgroundColor: "rgba(240, 228, 209, 0.5)", borderRadius: 10 }]}>
			{error && <ErrorComponent />}
			<View>
				<Text style={[styles.text, { marginTop: 30, textAlign: "center", fontSize: 26, fontWeight: "600" }]}>Welcome to your profile!</Text>
				<Text style={[styles.text, styles.textBold]}>User:</Text>
				<Text style={styles.text}>{userEmail}</Text>

				<View>
					<Text style={[styles.text, { marginBottom: 10, marginTop: 40, textAlign: "center" }]}>
						Have you had a look at creating your own personal characters?
					</Text>

					<Text style={[styles.text, { textAlign: "center" }]}>If not take a look here:</Text>

					<Pressable onPress={() => router.push("/Characters")}>
						<Text style={styles.linkText}>Characters</Text>
					</Pressable>
				</View>
			</View>

			<View style={{ marginBottom: 20 }}>
				<Text style={styles.text}>Logout:</Text>
				<Pressable style={styles.button} onPress={onLogout}>
					<Text style={styles.buttonText}>Log out</Text>
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
		height: "80%",
		flexDirection: "column",
		justifyContent: "space-between",
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
