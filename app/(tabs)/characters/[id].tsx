import { useLocalSearchParams } from "expo-router";
import { View, Text, Pressable, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import useGetCharacter from "@/hooks/useGetCharacter";
import CharacterSpellslotComponent from "@/components/CharacterSpellslotComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import CharacterSpellComponent from "@/components/CharacterSpellComponent";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

//@CodeScene(disable:"Complex Method") //@CodeScene(disable:"Large Method")
const CharacterProfile = () => {
	const { id } = useLocalSearchParams();
	const { data: character, loading } = useGetCharacter(id.toString());
	const { currentUser, isLoading } = useAuth();

	const isError = useSelector((state: RootState) => state.error.isError);

	const router = useRouter();

	const [showSpellslots, setShowSpellslots] = useState(false);
	const [showPreparedSpells, setShowPreparedSpells] = useState(false);

	const handleEditCharacter = () => {
		if (!character) {
			return;
		} else {
			const id = character._id;
			router.push({
				pathname: "/(tabs)/UpdateCharacter",
				params: { id },
			});
		}
	};

	if (!character) {
		return (
			<View>
				<Text>Could not find the character!</Text>
			</View>
		);
	}

	if (isLoading || !currentUser) {
		return <LoadingComponent />;
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				{loading && <LoadingComponent />}
				{isError && <ErrorComponent />}

				<View style={styles.titleContainer}>
					<View>
						<Text style={styles.title}>{character.character_name}</Text>
					</View>
					<View style={styles.iconContainer}>
						<Pressable onPress={() => router.replace("/(tabs)/Characters")}>
							<Feather name="arrow-left" size={30} color="#2b2b2b" />
						</Pressable>
					</View>
					<View style={styles.editIconContainer}>
						<Pressable onPress={handleEditCharacter}>
							<MaterialCommunityIcons name="pencil" size={24} color="#2b2b2b" />
						</Pressable>
					</View>
				</View>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<View style={styles.characterInfoContainer}>
						<View style={styles.rowContainer}>
							<Text style={styles.classText}>{character.class.name}</Text>
							<Text style={styles.text}> - lvl {character.character_level}</Text>
						</View>
						<View style={styles.rowWrapContainer}>
							{character.spell_attack_modifier && <Text style={styles.text}>Attack mod: {character.spell_attack_modifier}</Text>}
							{character.spell_save_dc && <Text style={styles.text}>Save dc: {character.spell_save_dc}</Text>}
						</View>
						{character.spellslots && (
							<View>
								<Pressable onPress={() => setShowSpellslots(!showSpellslots)} style={styles.spellslotButtonContainer}>
									<Text style={styles.textBold}>Spellslots</Text>
									<Entypo name={showSpellslots ? "minus" : "plus"} size={24} color="#ffff" />
								</Pressable>
								{showSpellslots && <CharacterSpellslotComponent characterId={character._id} spellslots={character.spellslots} />}
							</View>
						)}
					</View>
					<View>
						{character.show_prepared_spells && (
							<View style={styles.spellButtonContainer}>
								<Pressable
									style={showPreparedSpells ? styles.spellButton : styles.spellButtonActive}
									onPress={() => setShowPreparedSpells(false)}
								>
									<Text style={showPreparedSpells ? styles.spellButtonText : styles.spellButtonTextActive}>Known</Text>
								</Pressable>
								<Pressable
									style={showPreparedSpells ? styles.spellButtonActive : styles.spellButton}
									onPress={() => setShowPreparedSpells(true)}
								>
									<Text style={showPreparedSpells ? styles.spellButtonTextActive : styles.spellButtonText}>Prepared</Text>
								</Pressable>
							</View>
						)}
						{!character.show_prepared_spells && (
							<View style={styles.spellsInfo}>
								<Text style={styles.spellButtonText}>Known spells</Text>
							</View>
						)}
					</View>

					{!character.show_prepared_spells && (
						<View>
							{character.known_spells && (
								<CharacterSpellComponent
									data={character.known_spells}
									characterData={character}
									showPreparedSPells={character.show_prepared_spells}
								/>
							)}
						</View>
					)}

					{character.show_prepared_spells && (
						<View>
							{character.known_spells && !showPreparedSpells && (
								<CharacterSpellComponent
									data={character.known_spells}
									characterData={character}
									showPreparedSPells={showPreparedSpells}
								/>
							)}
							{character.prepared_spells && showPreparedSpells && (
								<CharacterSpellComponent
									data={character.prepared_spells}
									characterData={character}
									showPreparedSPells={showPreparedSpells}
								/>
							)}
						</View>
					)}

					{!showPreparedSpells && (
						<View style={styles.addButtonContainer}>
							<Pressable style={styles.addSpellButton} onPress={() => router.push("/")}>
								<MaterialCommunityIcons name="book-plus" size={24} color="#ffff" />
								<Text style={styles.addSpellText}>Add spells</Text>
							</Pressable>
						</View>
					)}
				</ScrollView>
			</ImageBackground>
		</View>
	);
};

export default CharacterProfile;

//@CodeScene(disable:"Large Method")
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: "100%",
		height: "100%",
		flex: 1,
		resizeMode: "cover",
	},
	titleContainer: {
		flexWrap: "wrap",
		backgroundColor: "#F0E4D1",
		height: 60,
		justifyContent: "center",
		alignContent: "space-between",
	},
	title: {
		fontSize: 26,
		fontFamily: "CinzelBlack",
		color: "#990000",
		textAlign: "center",
	},
	text: {
		fontFamily: "Inter",
		fontSize: 16,
		color: "#2b2b2b",
	},
	classText: {
		fontFamily: "Inter",
		fontWeight: "900",
		fontSize: 22,
		color: "#990000",
	},
	textBold: {
		fontFamily: "Inter",
		fontWeight: "700",
		fontSize: 20,
		color: "#ffff",
		marginRight: 10,
	},
	iconContainer: {
		position: "absolute",
		left: "3%",
		zIndex: 1,
	},
	editIconContainer: {
		position: "absolute",
		left: "90%",
		zIndex: 1,
	},
	addButtonContainer: {
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: 30,
		marginBottom: 30,
	},
	addSpellButton: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: "#990000",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "50%",
		borderRadius: 10,
	},
	addSpellText: {
		fontFamily: "Inter",
		fontWeight: "700",
		fontSize: 18,
		color: "#ffff",
		marginLeft: 10,
	},
	characterInfoContainer: {
		backgroundColor: "rgba(224, 214, 197, 0.5)",
		paddingHorizontal: 30,
		paddingVertical: 10,
	},
	spellslotButtonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: "#990000",
		marginTop: 20,
		marginBottom: 10,
		marginRight: 10,
		width: "55%",
		paddingTop: 3,
		paddingBottom: 5,
		borderRadius: 10,
	},
	rowContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "baseline",
	},
	rowWrapContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		marginTop: 8,
	},
	spellButtonContainer: {
		flexDirection: "row",
		backgroundColor: "#F0E4D1",
	},
	spellButton: {
		width: "50%",
		height: "auto",
		paddingVertical: 3,
	},
	spellButtonActive: {
		width: "50%",
		height: "auto",
		borderBottomColor: "#990000",
		borderBottomWidth: 4,
		paddingVertical: 3,
	},
	spellButtonText: {
		textAlign: "center",
		fontFamily: "Inter",
		fontWeight: "900",
		fontSize: 22,
		color: "#2b2b2b",
	},
	spellButtonTextActive: {
		textAlign: "center",
		fontFamily: "Inter",
		fontWeight: "900",
		fontSize: 22,
		color: "#990000",
	},
	spellsInfo: {
		height: "auto",
		paddingVertical: 3,
		backgroundColor: "#F0E4D1",
	},
});
