import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";

interface AccordionProps {
	title: string;
}

const Accordion: React.FC<AccordionProps> = ({ title }) => {
	const [open, setOpen] = useState(false);

	const handlePress = () => {
		setOpen(!open);
	};

	return (
		<>
			<View>
				<Pressable style={styles.headerContainer} onPress={handlePress}>
					<Text style={styles.header}>{title}</Text>
					<Entypo name={!open ? "chevron-down" : "chevron-up"} size={24} color={!open ? "#2b2b2b" : "#990000"} style={styles.chevron} />
				</Pressable>
			</View>
		</>
	);
};

export default Accordion;

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: "#F0E4D1",
		marginBottom: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	header: {
		fontFamily: "CinzelBlack",
		fontSize: 24,
		color: "#990000",
	},
	chevron: {},
});
