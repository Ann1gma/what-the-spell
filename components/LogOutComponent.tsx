import useAuth from "@/hooks/useAuth";
import { Character } from "@/types/Character.types";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";
import ErrorComponent from "./ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseError } from "firebase/app";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { RootState } from "@/app/store";

interface LogOutComponentProps {
	characterData: Character[] | null;
	userEmail: string | null | undefined;
}

const LogOutComponent: React.FC<LogOutComponentProps> = ({ characterData, userEmail }) => {
	const dispatch = useDispatch();

	const errorState = useSelector((state: RootState) => state.error.isError);

	const { logout } = useAuth();

	const router = useRouter();

	const onLogout = async () => {
		try {
			await logout();
			setTimeout(() => {
				router.replace("/");
			}, 100);
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Error on log out"));
			dispatch(changeIsError(true));
		}
	};

	return (
		<View style={[styles.profileWrapper, { backgroundColor: "rgba(240, 228, 209, 0.5)", borderRadius: 10 }]}>
			{errorState && <ErrorComponent />}
			<View>
				<Text style={[styles.text, { marginTop: 30, textAlign: "center", fontSize: 26, fontWeight: "600" }]}>Welcome to your profile!</Text>

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
				<Text style={styles.textBold}>Logout:</Text>
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
		fontSize: 20,
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
		backgroundColor: "#615151",
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
