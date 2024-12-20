import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

const LoadingComponent = () => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("../assets/images/loading_dice.gif")}
				placeholder="Spinning d20"
				contentFit="cover"
				transition={1000}
			/>
			<Text style={styles.text}>Loading...</Text>
		</View>
	);
};

export default LoadingComponent;

const styles = StyleSheet.create({
	container: {
		zIndex: 10,
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
		position: "absolute",
		backgroundColor: "rgba(224, 214, 197, 0.8)",
	},
	image: {
		width: 150,
		height: 150,
	},
	text: {
		fontFamily: "Inter",
		fontWeight: "900",
		fontSize: 22,
		color: "#990000",
		textAlign: "center",
	},
});
