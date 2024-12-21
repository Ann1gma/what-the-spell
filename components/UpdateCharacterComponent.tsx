import React, { useCallback, useEffect, useState } from "react";
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
import { Character, NewCharacter, UpdateCharacterData } from "@/types/Character.types";
import { ClassObject } from "@/types/DnD5e_API.types";
import DropdownComponent from "@/components/DropdownComponent";
import useGetAllClasses from "@/hooks/useGetAllClasses";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { doc, updateDoc } from "firebase/firestore";
import { characterCol } from "@/services/firebaseConfig";
import useCreateSpellslots from "@/hooks/useCreateSpellslots";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import ErrorComponent from "@/components/ErrorComponent";
import UpdateSpellslotInputComponent from "@/components/UpdateSpellslotInputComponent";
import ConfirmationComponent from "@/components/ConfirmationComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { FirebaseError } from "firebase/app";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";

interface UpdateCharacterComponentProps {
	data: Character;
	onNavBack: () => void;
}

//@CodeScene(disable:"Bumpy Road Ahead")
//@CodeScene(disable:"Complex Method")
//@CodeScene(disable:"Large Method")
const UpdateCharacterComponent: React.FC<UpdateCharacterComponentProps> = ({ data, onNavBack }) => {
	const { id } = useLocalSearchParams();
	const { currentUser } = useAuth();

	const [className, setClassName] = useState<ClassObject | null>(data.class);
	const [classError, setClassError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [enablePreparedSpells, setEnablePreparedSpells] = useState(data.show_prepared_spells);
	const [enableSpellslots, setEnableSpellslots] = useState(data.show_spellslots);
	const [infoPrepare, setInfoPrepare] = useState(false);
	const [infoSlots, setInfoSlots] = useState(false);
	const [openConfirmation, setOpenConfirmation] = useState(false);
	const [formKey, setFormKey] = useState(0);

	const { options } = useGetAllClasses([]);

	const { spellslots, createSpellslots, resetSepllslots, setInitialSpellslots } = useCreateSpellslots();

	const isError = useSelector((state: RootState) => state.error.isError);

	const dispatch = useDispatch();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NewCharacter>();

	const onFiltration = (item: ClassObject) => {
		setClassName(item);
	};

	const onUpdateCharacter: SubmitHandler<UpdateCharacterData> = async (data) => {
		setSubmitting(true);
		setSubmitError(null);
		setClassError(null);

		if (!className) {
			setClassError("You must choose a class");
			setSubmitting(false);
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
					spellslots: spellslots,
				});

				resetSepllslots();
				setFormKey((prev) => prev + 1);
				setClassName(null);
				setEnablePreparedSpells(false);
				setEnableSpellslots(false);

				onNavBack();
			} catch (err) {
				if (err instanceof FirebaseError) {
					dispatch(changeErrorMessage(err.message));
					dispatch(changeIsError(true));
				} else if (err instanceof Error) {
					dispatch(changeErrorMessage(err.message));
					dispatch(changeIsError(true));
				}

				dispatch(changeErrorMessage("Error when creating character"));
				dispatch(changeIsError(true));
			} finally {
				setSubmitting(false);
			}
		}
	};

	useEffect(() => {
		if (data.spellslots) {
			setInitialSpellslots(data.spellslots);
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			return () => {
				setClassName(null);
				setClassError(null);
				setSubmitting(false);
				setSubmitError(null);
				setEnablePreparedSpells(false);
				setEnableSpellslots(false);
			};
		}, [])
	);

	if (!currentUser) {
		return (
			<View style={styles.container}>
				<ImageBackground source={require("../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
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

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				{openConfirmation && <ConfirmationComponent handlePress={() => setOpenConfirmation(false)} characterId={id.toString()} />}
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<View style={styles.titleContainer}>
							<View>
								<Text style={styles.title}>Edit character</Text>
							</View>
							<View style={styles.iconContainer}>
								<Pressable onPress={onNavBack} disabled={submitting}>
									<Feather name="arrow-left" size={30} color="#2b2b2b" />
								</Pressable>
							</View>
						</View>

						{isError && <ErrorComponent />}

						<ScrollView>
							<View style={styles.formWrapper}>
								{submitError && <Text style={styles.error}>{submitError}</Text>}

								<Text style={styles.text}>Character name*</Text>
								<Controller
									control={control}
									rules={{
										required: "Character name is required",
										maxLength: { value: 30, message: "Character name must not exceed 30 characters" },
									}}
									defaultValue={data.character_name}
									render={({ field: { onChange, onBlur } }) => (
										<TextInput
											style={styles.input}
											placeholder="E.g. 'Baldric the Bold'"
											onBlur={onBlur}
											onChangeText={onChange}
											defaultValue={data.character_name}
										/>
									)}
									name="character_name"
								/>
								{errors.character_name && <Text style={styles.error}>{errors.character_name.message}</Text>}

								<Text style={styles.text}>Class*</Text>
								<DropdownComponent
									key={formKey}
									options={options}
									onChange={(e) => onFiltration(e)}
									placeholder={!className ? "Class" : className.name}
								/>
								{classError && <Text style={styles.error}>{classError}</Text>}

								<View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 10 }}>
									<Text style={[styles.text, { marginRight: 12 }]}>Level*</Text>
									<Controller
										control={control}
										rules={{
											required: "Character level is required",
											max: { value: 20, message: "Character level must not exceed 20" },
											validate: (value) => !isNaN(value) || "Value must be a number",
										}}
										defaultValue={data.character_level}
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
												defaultValue={data.character_level.toString()}
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
											min: { value: 1, message: "Spell attack modifier dc must be atleast 1" },
											max: { value: 30, message: "Spell attack modifier must not exceed 30" },
											validate: (value) => (value !== null && !isNaN(value)) || "Spell attack modifier must be a number",
										}}
										defaultValue={data.spell_attack_modifier ? data.spell_attack_modifier : undefined}
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
												defaultValue={data.spell_attack_modifier ? data.spell_attack_modifier.toString() : undefined}
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
											min: { value: 1, message: "Spell save dc must be atleast 1" },
											max: { value: 30, message: "Spell save dc must not exceed 30" },
											validate: (value) => (value !== null && !isNaN(value)) || "Spell save dc must be a number",
										}}
										defaultValue={data.spell_save_dc}
										render={({ field: { onChange, onBlur } }) => (
											<TextInput
												style={styles.inputNumber}
												placeholder="30"
												keyboardType="number-pad"
												inputMode="numeric"
												onBlur={onBlur}
												onChangeText={(text) => {
													onChange(Number(text));
												}}
												defaultValue={data.spell_save_dc ? data.spell_save_dc.toString() : undefined}
											/>
										)}
										name="spell_save_dc"
									/>
								</View>

								{errors.spell_save_dc && <Text style={styles.error}>{errors.spell_save_dc.message}</Text>}

								<View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 30 }}>
									<TouchableOpacity onPress={() => setInfoPrepare(!infoPrepare)}>
										<MaterialCommunityIcons
											name={infoPrepare ? "information-off-outline" : "information-outline"}
											size={22}
											color="#2b2b2b"
											style={styles.infoIcon}
										/>
									</TouchableOpacity>
									<Text style={[styles.text, { marginRight: 15 }]}>Enable Prepare spells</Text>
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

								{infoPrepare && (
									<Text style={styles.infoText}>
										This allows you to prepare spells for your character on the characters page. You can change this later.
									</Text>
								)}

								<View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 10 }}>
									<TouchableOpacity onPress={() => setInfoSlots(!infoSlots)}>
										<MaterialCommunityIcons
											name={infoSlots ? "information-off-outline" : "information-outline"}
											size={22}
											color="#2b2b2b"
											style={styles.infoIcon}
										/>
									</TouchableOpacity>
									<Text style={[styles.text, { marginRight: 15, marginBottom: 25 }]}>Enable Spellslots</Text>
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

								{infoSlots && (
									<Text style={styles.infoText}>
										This allows you to prepare and track your character's spell slots on the characters page. You can change this
										later.
									</Text>
								)}

								{enableSpellslots && (
									<View style={{ flexDirection: "row" }}>
										<View style={{ flexDirection: "column" }}>
											<UpdateSpellslotInputComponent
												level={1}
												onChange={createSpellslots}
												initialSpellslots={data.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={2}
												onChange={createSpellslots}
												initialSpellslots={data.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={3}
												onChange={createSpellslots}
												initialSpellslots={data.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={4}
												onChange={createSpellslots}
												initialSpellslots={data.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={5}
												onChange={createSpellslots}
												initialSpellslots={data.spellslots}
											/>
										</View>

										<View style={{ flexDirection: "column" }}>
											<UpdateSpellslotInputComponent
												level={6}
												onChange={createSpellslots}
												initialSpellslots={data.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={7}
												onChange={createSpellslots}
												initialSpellslots={data.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={8}
												onChange={createSpellslots}
												initialSpellslots={data.spellslots}
											/>
											<UpdateSpellslotInputComponent
												level={9}
												onChange={createSpellslots}
												initialSpellslots={data.spellslots}
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

export default UpdateCharacterComponent;

//@CodeScene(disable:"Large Method")
const styles = StyleSheet.create({
	container: {
		zIndex: 3,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		position: "absolute",
		marginBottom: "10%",
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
		fontSize: 18,
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
	infoText: {
		fontSize: 16,
		color: "#2b2b2b",
	},
	infoIcon: {
		marginRight: 5,
	},
});