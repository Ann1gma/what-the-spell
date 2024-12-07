import { View, Text, StyleSheet, Pressable, FlatList, SafeAreaView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { SpellsByLevelOverview } from "@/types/DnD5e_API.types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

interface AccordionProps {
	title: string;
	data: SpellsByLevelOverview[];
}

const Accordion: React.FC<AccordionProps> = ({ title, data }) => {
	const [open, setOpen] = useState(false);

	const handlePress = () => {
		setOpen(!open);
	};

	return (
		<>
			<View>
				<Pressable style={styles.headerContainer} onPress={handlePress}>
					<Text style={styles.header}>{title}</Text>
					<Entypo name={!open ? "chevron-down" : "chevron-up"} size={24} color={!open ? "#990000" : "#2b2b2b"} />
				</Pressable>
			</View>
			{open && (
				<SafeAreaView>
					{data.map((item) => (
						<Pressable style={styles.itemContainer} key={item.index}>
							<View>
								<View style={styles.titleContainer}>
									<Text style={styles.itemTitle}>{item.name}</Text>
									<Text style={styles.itemText}>{item.level === 0 ? `- cantrip` : `- level ${item.level}`}</Text>
								</View>
								<Text style={styles.itemText}>{item.school.name}</Text>
							</View>
							<View style={styles.iconContainer}>
								{!item.heal_at_slot_level && !item.damage && !item.attack_type && (
									<View style={styles.iconTextContainer}>
										<Ionicons name="sparkles" size={24} color="#2b2b2b" style={styles.icons} />
										<Text>utility</Text>
									</View>
								)}
								{item.heal_at_slot_level && (
									<View style={styles.iconTextContainer}>
										<MaterialIcons name="healing" size={24} color="#2b2b2b" style={styles.icons} />
										<Text>healing</Text>
									</View>
								)}
								{item.damage && (
									<View style={styles.iconTextContainer}>
										<MaterialCommunityIcons name="sword" size={24} color="#2b2b2b" style={styles.icons} />
										<Text>damage</Text>
									</View>
								)}
								{item.attack_type === "RANGED" && (
									<View style={styles.iconTextContainer}>
										<MaterialCommunityIcons name="bow-arrow" size={24} color="#2b2b2b" style={styles.icons} />
										<Text>ranged</Text>
									</View>
								)}
								{item.attack_type === "MELEE" && (
									<View style={styles.iconTextContainer}>
										<MaterialCommunityIcons name="sword-cross" size={24} color="#2b2b2b" style={styles.icons} />
										<Text>melee</Text>
									</View>
								)}
								{item.ritual && (
									<View style={styles.iconTextContainer}>
										<MaterialCommunityIcons name="pentagram" size={24} color="#2b2b2b" style={styles.icons} />
										<Text>ritual</Text>
									</View>
								)}
								{item.concentration && (
									<View style={styles.iconTextContainer}>
										<FontAwesome name="eye" size={24} color="#2b2b2b" style={styles.icons} />
										<Text>conc.</Text>
									</View>
								)}
							</View>
						</Pressable>
					))}
				</SafeAreaView>
			)}
		</>
	);
};

export default Accordion;

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: "#F0E4D1",
		marginTop: 15,
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
	itemContainer: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderBottomWidth: 3,
		borderBottomColor: "#F0E4D1",
		backgroundColor: "rgba(240, 228, 209, 0.4)",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	itemTitle: {
		fontFamily: "NunitoBlack",
		fontSize: 18,
		color: "#2b2b2b",
		marginRight: 5,
	},
	itemText: {
		fontFamily: "NunitoRegular",
		fontSize: 16,
		color: "#2b2b2b",
	},
	iconContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	iconTextContainer: {
		alignItems: "center",
		marginLeft: 10,
	},
	icons: {
		marginHorizontal: 5,
	},
	iconText: {
		fontFamily: "NunitoRegular",
		fontSize: 8,
		color: "#2b2b2b",
	},
});
