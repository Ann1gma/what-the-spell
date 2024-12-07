import { ImageBackground, StyleSheet, Text, View } from "react-native";
const Pergament = require("../../assets/images/background-image.jpg");

const Characters = () => {
	return (
		<View style={styles.container}>
			<ImageBackground source={Pergament} resizeMode="cover" style={styles.image}>
				<Text style={styles.text}>Characters</Text>
			</ImageBackground>
		</View>
	);
};

export default Characters;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	image: {
		width: "100%",
		height: "100%",
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
	},
	text: {
		fontSize: 36,
		fontFamily: "CinzelBlack",
		color: "#990000",
		textAlign: "center",
	},
});
