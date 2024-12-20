import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { characterCol } from "@/services/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

interface ConfirmationComponentProps {
	handlePress: () => void;
	characterId: string;
}

const ConfirmationComponent: React.FC<ConfirmationComponentProps> = ({ handlePress, characterId }) => {
	const router = useRouter();

	const onDelete = async () => {
		const docRef = doc(characterCol, characterId);

		try {
			await deleteDoc(docRef);
			router.push("/(tabs)/Characters");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.confirmationContainer}>
				<Pressable style={styles.iconContainer} onPress={handlePress}>
					<AntDesign name="close" size={30} color="#990000" />
				</Pressable>

				<Text style={styles.textBold}>Are you sure?</Text>
				<Text style={styles.text}>You can't undo this action</Text>

				<View style={styles.buttonWrapper}>
					<Pressable style={styles.cancelButton} onPress={handlePress}>
						<Text style={styles.buttonText}>CANCEL</Text>
					</Pressable>
					<Pressable style={styles.deleteButton} onPress={onDelete}>
						<Text style={styles.buttonText}>DELETE</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default ConfirmationComponent;

const styles = StyleSheet.create({
	container: {
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: height,
		width: width,
		position: "absolute",
		backgroundColor: "rgba(224, 214, 197, 0.5)",
	},
	confirmationContainer: {
		backgroundColor: "#F0E4D1",
		width: "90%",
		borderRadius: 15,
	},
	textBold: {
		fontFamily: "NunitoBlack",
		fontSize: 26,
		color: "#990000",
		textAlign: "center",
		marginTop: 40,
	},
	text: {
		fontFamily: "NunitoRegular",
		fontSize: 16,
		color: "#2b2b2b",
		textAlign: "center",
		marginTop: 10,
		marginBottom: 40,
	},
	iconContainer: {
		position: "absolute",
		left: "85%",
		top: "10%",
		zIndex: 1,
	},
	buttonWrapper: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignContent: "center",
		marginBottom: 20,
	},
	cancelButton: {
		backgroundColor: "#990000",
		paddingHorizontal: 30,
		paddingVertical: 10,
		borderRadius: 10,
	},
	deleteButton: {
		backgroundColor: "#615151",
		paddingHorizontal: 30,
		paddingVertical: 10,
		borderRadius: 10,
	},
	buttonText: {
		color: "#FFFFFF",
		fontFamily: "NunitoBold",
		fontSize: 18,
		textAlign: "center",
	},
});
