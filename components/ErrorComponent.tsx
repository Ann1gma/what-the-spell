import { RootState } from "@/app/store";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ErrorComponent = () => {
	const error = useSelector((state: RootState) => state.error.errorMessage);

	return (
		<View style={styles.container}>
			<Text style={styles.textBold}>ERROR</Text>
			<Text>{error}</Text>
		</View>
	);
};

export default ErrorComponent;

const styles = StyleSheet.create({
	container: {
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
		position: "absolute",
		backgroundColor: "rgba(224, 214, 197, 0.8)",
	},
	textBold: {
		fontFamily: "NunitoBlack",
		fontSize: 20,
		color: "#990000",
		textAlign: "center",
	},
	text: {
		fontFamily: "NunitoRegular",
		fontSize: 20,
		color: "#2b2b2b",
		textAlign: "center",
	},
});
