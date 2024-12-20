import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Pressable,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { NewCharacter, UpdateCharacterData } from "@/types/Character.types";
import { ClassObject } from "@/types/DnD5e_API.types";
import DropdownComponent from "@/components/DropdownComponent";
import useGetAllClasses from "@/hooks/useGetAllClasses";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { doc, updateDoc } from "firebase/firestore";
import { characterCol } from "@/services/firebaseConfig";
import useCreateSpellslots from "@/hooks/useCreateSpellslots";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import useGetCharacter from "@/hooks/useGetCharacter";
import UpdateSpellslotInputComponent from "@/components/UpdateSpellslotInputComponent";
import ConfirmationComponent from "@/components/ConfirmationComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store";

//@CodeScene(disable:"Complex Method")
//@CodeScene(disable:"Large Method")
const UpdateCharacter = () => {
	const { id } = useLocalSearchParams();

	const { getCharacterDoc, characterDoc, loading: characterLoading } = useGetCharacter(id.toString());

	const { currentUser } = useAuth();
	const [className, setClassName] = useState<ClassObject | null>(null);
	const [classError, setClassError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [enablePreparedSpells, setEnablePreparedSpells] = useState(false);
	const [enableSpellslots, setEnableSpellslots] = useState(false);

	const [openConfirmation, setOpenConfirmation] = useState(false);

	const { options, loading } = useGetAllClasses([]);

	const { spellslots, updateSpellslots, resetSepllslots } = useCreateSpellslots();

	const isError = useSelector((state: RootState) => state.error.isError);

	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NewCharacter>();

	const onFiltration = (item: ClassObject) => {
		setClassName(item);
	};

	const handleNavigateBack = () => {
		if (typeof id === "string") {
			router.push({
				pathname: "/(tabs)/characters/[id]",
				params: { id },
			});
		} else {
			const paramId = id[0];

			router.push({
				pathname: "/(tabs)/characters/[id]",
				params: { id: paramId },
			});
		}
	};

	const onUpdateCharacter: SubmitHandler<UpdateCharacterData> = async (data) => {
		setSubmitting(true);
		setSubmitError(null);
		setClassError(null);

		if (!className) {
			setClassError("You must choose a class");
		} else {
			const docRef = doc(characterCol, id.toString());

			try {
				await updateDoc(docRef, {
					...data,
					character_level: data.character_level,
					character_name: data.character_name,
					class: className,
					spell_attack_modifier: data.spell_attack_modifier ? data.spell_attack_modifier : null,
					spell_save_dc: data.spell_save_dc ? data.spell_save_dc : null,
					show_prepared_spells: enablePreparedSpells,
					show_spellslots: enableSpellslots,
					spellslots: enableSpellslots ? spellslots : null,
				});

				/* if (!enableSpellslots) {
					resetSepllslots();
				} */

				reset();
				resetSepllslots();
				setClassName(null);
				setEnablePreparedSpells(false);
				setEnableSpellslots(false);

				handleNavigateBack();
			} catch (err) {
				setSubmitError("Failed to create character. Please check your inputs.");
			}
			setSubmitting(false);
		}
	};

	useEffect(() => {
		if (!id) {
			return;
		} else if (typeof id === "string") {
			getCharacterDoc(id);
		} else {
			getCharacterDoc(id[0]);
		}
	}, [id]);

	useEffect(() => {
		if (characterDoc) {
			setClassName(characterDoc.class);
			setEnablePreparedSpells(characterDoc.show_prepared_spells);
			setEnableSpellslots(characterDoc.show_spellslots);
		}
	}, [characterDoc, reset]);

	if (!currentUser) {
		return (
			<View style={styles.container}>
				<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
					{loading && <LoadingComponent />}
					{isError && <ErrorComponent />}
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Edit character</Text>
					</View>

					<View>
						<Text>You have to login to see and use Characters</Text>
					</View>
				</ImageBackground>
			</View>
		);
	}

	if (!characterDoc || characterLoading) {
		return <LoadingComponent />;
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				{openConfirmation && <ConfirmationComponent handlePress={() => setOpenConfirmation(false)} characterId={id.toString()} />}
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<View style={styles.titleContainer}>
							<View>
								<Text style={styles.title}>Edit character</Text>
							</View>
							<View style={styles.iconContainer}>
								<Pressable onPress={handleNavigateBack}>
									<Feather name="arrow-left" size={24} color="#2b2b2b" />
								</Pressable>
							</View>
						</View>

						{loading && <LoadingComponent />}
						{isError && <ErrorComponent />}

						<ScrollView>
							<View style={styles.formWrapper}>
								{submitError && <Text style={styles.error}>{submitError}</Text>}

								<Text style={styles.text}>Character name*</Text>
								<Controller
									control={control}
									rules={{ required: "Character name is required", maxLength: 50 }}
									defaultValue={characterDoc.character_name}
									render={({ field: { onChange, onBlur } }) => (
										<TextInput
											style={styles.input}
											placeholder={"Baldric the Bold"}
											onBlur={onBlur}
											onChangeText={onChange}
											defaultValue={characterDoc.character_name}
										/>
									)}
									name="character_name"
								/>
								{errors.character_name && <Text style={styles.error}>{errors.character_name.message}</Text>}

								<Text style={styles.text}>Class*</Text>
								<DropdownComponent
									options={options}
									onChange={(e) => onFiltration(e)}
									placeholder={!characterDoc.class ? "Class" : characterDoc.class.name}
								/>
								{classError && <Text style={styles.error}>{classError}</Text>}

								<View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 10 }}>
									<Text style={[styles.text, { marginRight: 12 }]}>Level*</Text>
									<Controller
										control={control}
										rules={{
											required: "Character level is required",
											max: 20,
											validate: (value) => !isNaN(value) || "Value must be a number",
										}}
										defaultValue={characterDoc.character_level}
										render={({ field: { onChange, onBlur } }) => (
											<TextInput
												style={styles.inputNumber}
												placeholder="0-20"
												keyboardType="number-pad"
												inputMode="numeric"
												onBlur={onBlur}
												onChangeText={(text) => {
													onChange(Number(text));
												}}
												defaultValue={characterDoc.character_level.toString()}
											/>
										)}
										name="character_level"
									/>
								</View>
								{errors.character_level && <Text style={styles.error}>{errors.character_level.message}</Text>}

								<View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 30 }}>
									<Text style={[styles.text, { marginRight: 12 }]}>Spell attack modifier</Text>
									<Controller
										control={control}
										rules={{
											required: false,
											validate: (value) => (value !== null && !isNaN(value)) || "Spell attack modifier must be a number",
										}}
										defaultValue={characterDoc.spell_attack_modifier}
										render={({ field: { onChange, onBlur } }) => (
											<TextInput
												style={styles.inputNumber}
												placeholder="0-30"
												keyboardType="number-pad"
												inputMode="numeric"
												onBlur={onBlur}
												onChangeText={(text) => {
													onChange(Number(text));
												}}
												defaultValue={characterDoc.spell_attack_modifier ? characterDoc.spell_attack_modifier.toString() : ""}
											/>
										)}
										name="spell_attack_modifier"
									/>
								</View>

								{errors.spell_attack_modifier && <Text style={styles.error}>{errors.spell_attack_modifier.message}</Text>}

								<View style={{ flexDirection: "row", alignItems: "baseline" }}>
									<Text style={[styles.text, { marginRight: 12 }]}>Spell save dc</Text>
									<Controller
										control={control}
										rules={{
											required: false,
											validate: (value) => (value !== null && !isNaN(value)) || "Spell save dc must be a number",
										}}
										defaultValue={characterDoc.spell_save_dc}
										render={({ field: { onChange, onBlur } }) => (
											<TextInput
												style={styles.inputNumber}
												placeholder="15"
												keyboardType="number-pad"
												inputMode="numeric"
												onBlur={onBlur}
												onChangeText={(text) => {
													onChange(Number(text));
												}}
												defaultValue={characterDoc.spell_save_dc ? characterDoc.spell_save_dc.toString() : ""}
											/>
										)}
										name="spell_save_dc"
									/>
								</View>

								{errors.spell_save_dc && <Text style={styles.error}>{errors.spell_save_dc.message}</Text>}

								<View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 30 }}>
									<Text style={[styles.text, { marginRight: 15 }]}>Enabel Prepare spells</Text>
									<TouchableOpacity
										style={{ height: "100%", flexDirection: "row", alignItems: "center" }}
										activeOpacity={0.8}
										onPress={() => setEnablePreparedSpells(!enablePreparedSpells)}
									>
										<MaterialCommunityIcons
											name={enablePreparedSpells ? "checkbox-marked" : "checkbox-blank-outline"}
											size={28}
											color="#660000"
										/>
									</TouchableOpacity>
								</View>

								<View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 10 }}>
									<Text style={[styles.text, { marginRight: 15, marginBottom: 25 }]}>Enabel Spellslots</Text>
									<TouchableOpacity
										style={{ height: "100%", flexDirection: "row", alignItems: "center" }}
										activeOpacity={0.8}
										onPress={() => setEnableSpellslots(!enableSpellslots)}
									>
										<MaterialCommunityIcons
											name={enableSpellslots ? "checkbox-marked" : "checkbox-blank-outline"}
											size={28}
											color="#660000"
										/>
									</TouchableOpacity>
								</View>

								{enableSpellslots && (
									<View style={{ flexDirection: "row" }}>
										<View style={{ flexDirection: "column" }}>
											<UpdateSpellslotInputComponent
												level={1}
												onChange={updateSpellslots}
												spellSlots={characterDoc?.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={2}
												onChange={updateSpellslots}
												spellSlots={characterDoc?.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={3}
												onChange={updateSpellslots}
												spellSlots={characterDoc?.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={4}
												onChange={updateSpellslots}
												spellSlots={characterDoc?.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={5}
												onChange={updateSpellslots}
												spellSlots={characterDoc?.spellslots}
											/>
										</View>

										<View style={{ flexDirection: "column" }}>
											<UpdateSpellslotInputComponent
												level={6}
												onChange={updateSpellslots}
												spellSlots={characterDoc?.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={7}
												onChange={updateSpellslots}
												spellSlots={characterDoc?.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={8}
												onChange={updateSpellslots}
												spellSlots={characterDoc?.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={9}
												onChange={updateSpellslots}
												spellSlots={characterDoc?.spellslots}
											/>
										</View>
									</View>
								)}

								<Pressable style={styles.button} onPress={handleSubmit(onUpdateCharacter)} disabled={submitting}>
									<Text style={styles.buttonText}>{submitting ? "Updating character..." : "Update character"}</Text>
								</Pressable>

								<Pressable style={styles.deleteButton} onPress={() => setOpenConfirmation(true)} disabled={submitting}>
									<Text style={styles.buttonText}>DELETE CHARACTER</Text>
								</Pressable>
							</View>
						</ScrollView>
					</ScrollView>
				</TouchableWithoutFeedback>
			</ImageBackground>
		</View>
	);
};

export default UpdateCharacter;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: "100%",
		height: "100%",
		flex: 1,
	},
	titleContainer: {
		backgroundColor: "#F0E4D1",
		height: 50,
		justifyContent: "center",
		paddingVertical: 10,
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontFamily: "CinzelBlack",
		color: "#990000",
	},
	subtitleWrapper: {
		marginHorizontal: 20,
	},
	profileWrapper: {
		marginTop: 20,
		marginHorizontal: 20,
		padding: 20,
	},
	formWrapper: {
		justifyContent: "center",
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: "rgba(240, 228, 209, 0.5)",
		marginHorizontal: 20,
		marginTop: 20,
		borderRadius: 10,
	},
	text: {
		fontSize: 16,
		fontFamily: "Inter",
		color: "#2b2b2b",
		marginBottom: 5,
		marginTop: 10,
	},
	textBold: {
		fontSize: 18,
		fontFamily: "Inter",
		fontWeight: "700",
		color: "#2b2b2b",
		marginBottom: 10,
	},
	error: {
		color: "red",
		marginBottom: 10,
	},
	label: {
		fontSize: 16,
		fontFamily: "Inter",
		fontWeight: "700",
		marginBottom: 5,
	},
	input: {
		backgroundColor: "#F0E4D1",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		fontFamily: "Inter",
	},
	inputNumber: {
		backgroundColor: "#F0E4D1",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		textAlign: "center",
		fontFamily: "Inter",
		width: "20%",
	},
	button: {
		backgroundColor: "#990000",
		paddingVertical: 12,
		borderRadius: 5,
		alignItems: "center",
		width: "100%",
		marginTop: 30,
	},
	deleteButton: {
		backgroundColor: "#615151",
		paddingVertical: 12,
		borderRadius: 5,
		alignItems: "center",
		width: "100%",
		marginTop: 50,
		marginBottom: 10,
	},
	buttonText: {
		color: "#ffffff",
		fontSize: 18,
		fontFamily: "Inter",
		fontWeight: "500",
	},
	iconContainer: {
		position: "absolute",
		left: "3%",
		zIndex: 1,
	},
});
