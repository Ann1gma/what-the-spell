import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { SpellsOverview } from "@/types/DnD5e_API.types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { CharacterSpell } from "@/types/Character.types";

interface CharacterAccordionComponentProps {
	title: string;
	data: CharacterSpell[];
	characterId: string;
}

//@CodeScene(disable:"Complex Method")
const CharacterAccordionComponent: React.FC<CharacterAccordionComponentProps> = ({ title, data, characterId }) => {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleOpen = () => {
		setOpen(!open);
	};

	const handlePress = (id: string) => {
		router.push({
			pathname: "/(tabs)/spells/[id]",
			params: { id, returnCharacterId: characterId },
		});
	};

	return (
		<View>
			<View>
				<Pressable style={styles.headerContainer} onPress={handleOpen}>
					<Text style={styles.header}>{title}</Text>
					<Entypo name={!open ? "chevron-down" : "chevron-up"} size={24} color={!open ? "#990000" : "#2b2b2b"} />
				</Pressable>
			</View>
			{open && (
				<SafeAreaView>
					{data.map((item) => (
						<Pressable style={styles.itemContainer} key={item.index} onPress={() => handlePress(item.index)}>
							<View>
								<View style={styles.titleContainer}>
									<Text style={styles.itemTitle}>{item.name}</Text>
									<Text style={styles.itemText}>{item.level === 0 ? `- cantrip` : `- level ${item.level}`}</Text>
								</View>
								<View style={{ flexDirection: "row" }}>
									<Text style={styles.itemTextBold}>School of magic:</Text>
									<Text style={[styles.itemText, { marginLeft: 5 }]}> {item.school}</Text>
								</View>
							</View>
							<View style={styles.iconContainer}>
								{!item.healing && !item.damage && !item.attack_type && (
									<View style={styles.iconTextContainer}>
										<Ionicons name="sparkles" size={24} color="#2b2b2b" style={styles.icons} />
										<Text>utility</Text>
									</View>
								)}
								{item.healing && (
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
		</View>
	);
};

export default CharacterAccordionComponent;

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
		marginBottom: 5,
	},
	itemText: {
		fontFamily: "NunitoRegular",
		fontSize: 16,
		color: "#2b2b2b",
	},
	itemTextBold: {
		fontFamily: "NunitoBold",
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
	classContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 5,
	},
});
