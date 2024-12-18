import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import { changeIsError } from "@/features/error/errorSlice";

const { width, height } = Dimensions.get("window");

const ErrorComponent = () => {
	const errorMessage = "An error occurred.";

	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<View style={styles.errorContainer}>
				<Pressable style={styles.iconContainer} onPress={() => dispatch(changeIsError(false))}>
					<AntDesign name="close" size={30} color="#990000" />
				</Pressable>

				<Text style={styles.textBold}>ERROR</Text>
				<Text style={styles.text}>{errorMessage}</Text>
			</View>
		</View>
	);
};

export default ErrorComponent;

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
	errorContainer: {
		backgroundColor: "#F0E4D1",
		width: "80%",
		borderRadius: 15,
	},
	textBold: {
		fontFamily: "NunitoBlack",
		fontSize: 20,
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
});
