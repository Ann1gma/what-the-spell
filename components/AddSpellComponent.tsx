import { View, Text, StyleSheet, Pressable, Dimensions, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import { setShowAddSpells } from "@/features/addSpell/addSpellSlice";
import { useRouter } from "expo-router";
import { Character } from "@/types/Character.types";
import { RootState } from "@/app/store";
import useIsSpellKnown from "@/hooks/useIsSpellKnown";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import useGetCharacters from "@/hooks/useGetCharacters";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

//@CodeScene(disable:"Complex Method")
const AddSpellComponent = () => {
	const { currentUser } = useAuth();
	const { data, loading } = useGetCharacters(currentUser?.uid);

	const router = useRouter();
	const dispatch = useDispatch();

	const spellId = useSelector((state: RootState) => state.addSpell.spellToAdd);

	const { charactersKnowsSpell, isSpellKnown } = useIsSpellKnown();

	const handleNavigation = () => {
		router.push("/Characters");
		dispatch(setShowAddSpells(false));
	};

	useEffect(() => {
		if (data && typeof spellId.level === "number") {
			isSpellKnown(data, spellId.index, spellId.level);
		}
	}, [data, spellId]);

	const renderItem = ({ item }: { item: Character }) => (
		<View style={styles.listContainer}>
			<Text style={styles.characterText}>{item.character_name}</Text>
			{charactersKnowsSpell.map((spell) => {
				if (spell.character_name === item.character_name && spell.knowsSpell === true) {
					return <MaterialCommunityIcons key={spell.character_name} name="checkbox-marked" size={24} color="#990000" />;
				} else if (spell.character_name === item.character_name && spell.knowsSpell === false) {
					return <MaterialCommunityIcons key={spell.character_name} name="checkbox-blank-outline" size={24} color="#990000" />;
				}
			})}
		</View>
	);

	if (!data || data.length <= 0) {
		return (
			<View style={styles.container}>
				<View style={styles.addContainer}>
					<Pressable style={styles.iconContainer} onPress={() => dispatch(setShowAddSpells(false))}>
						<AntDesign name="close" size={30} color="#990000" />
					</Pressable>
					<Text style={styles.textBold}>No characters</Text>
					<Text style={styles.text}>You don't seem to have any characters. Start by creating a character!</Text>
					<Pressable onPress={handleNavigation}>
						<Text style={styles.linkText}>Character Creation</Text>
					</Pressable>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.addContainer}>
				<Pressable style={styles.iconContainer} onPress={() => dispatch(setShowAddSpells(false))}>
					<AntDesign name="close" size={24} color="#990000" />
				</Pressable>
				<Text style={styles.textBold}>Add spell</Text>
				<FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id} />
			</View>
		</View>
	);
};

export default AddSpellComponent;

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
	addContainer: {
		backgroundColor: "#F0E4D1",
		width: "90%",
		minHeight: "40%",
		borderRadius: 15,
		padding: 20,
	},
	textBold: {
		fontFamily: "NunitoBlack",
		fontSize: 26,
		color: "#990000",
		textAlign: "center",
		marginTop: 30,
		marginBottom: 20,
	},
	text: {
		fontFamily: "NunitoRegular",
		fontSize: 16,
		color: "#2b2b2b",
		textAlign: "center",
		marginBottom: 20,
	},
	iconContainer: {
		position: "absolute",
		left: "100%",
		top: "5%",
		zIndex: 1,
	},
	linkText: {
		fontSize: 20,
		fontFamily: "NunitoBold",
		color: "#990000",
		marginBottom: 10,
		textDecorationLine: "underline",
		textAlign: "center",
	},
	listContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginHorizontal: 20,
	},
	characterText: {
		fontFamily: "NunitoBold",
		fontSize: 18,
		color: "#2b2b2b",
		textAlign: "center",
		marginBottom: 20,
		marginRight: 5,
	},
});
