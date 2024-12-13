import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { NewCharacter, Spellslot } from "@/types/Character.types";
import { ClassObject } from "@/types/DnD5e_API.types";
import DropdownComponent from "@/components/DropdownComponent";
import useGetAllClasses from "@/hooks/useGetAllClasses";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const AddCharacter = () => {
	const { currentUser } = useAuth();
	const [className, setClassName] = useState<ClassObject | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [showPreparedSpells, setShowPreparedSpells] = useState(false);
	const [showSpellslots, setShowSpellslots] = useState(false);
	const [lvlOneSpellSlots, setLvlOneSpellSlots] = useState<number | null>(null);
	const [lvlTwoSpellSlots, setLvlTwoSpellSlots] = useState<number | null>(null);
	const [lvlThreeSpellSlots, setLvlThreeSpellSlots] = useState<number | null>(null);
	const [lvlFourSpellSlots, setLvlFourSpellSlots] = useState<number | null>(null);
	const [lvlFiveSpellSlots, setLvlFiveSpellSlots] = useState<number | null>(null);
	const [lvlSixSpellSlots, setLvlSixSpellSlots] = useState<number | null>(null);
	const [lvlSevenSpellSlots, setLvlSevenSpellSlots] = useState<number | null>(null);
	const [lvlEightSpellSlots, setLvlEightSpellSlots] = useState<number | null>(null);
	const [lvlNineSpellSlots, setLvlNineSpellSlots] = useState<number | null>(null);
	const { error, isError, isLoading, options } = useGetAllClasses([]);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NewCharacter>();

	const onFiltration = (item: ClassObject) => {
		setClassName(item);
	};

	const onCreateCharacter: SubmitHandler<NewCharacter> = async (data) => {
		setSubmitting(true);
		setSubmitError(null);
		try {
			await reset();
		} catch (err) {
			setSubmitError("Failed to login. Please check your credentials.");
		}
		setSubmitting(false);
	};

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (isError) {
		return (
			<View>
				<Text>{error}</Text>
			</View>
		);
	}

	if (!currentUser) {
		return (
			<View style={styles.container}>
				<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Character creation</Text>
					</View>
				</ImageBackground>
				<View>
					<Text>You have to login to see and use Characters</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Character creation</Text>
				</View>
				<ScrollView>
					<View style={styles.formWrapper}>
						{submitError && <Text style={styles.error}>{submitError}</Text>}

						<Text style={styles.text}>Character name*</Text>
						<Controller
							control={control}
							rules={{ required: "Character name is required" }}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder="Baldric the Bold"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name="character_name"
						/>
						{errors.character_name && <Text style={styles.error}>{errors.character_name.message}</Text>}

						<Text style={styles.text}>Class*</Text>
						<DropdownComponent options={options} onChange={(e) => onFiltration(e)} placeholder="Class" />

						<View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 10 }}>
							<Text style={[styles.text, { marginRight: 12 }]}>Level*</Text>
							<Controller
								control={control}
								rules={{
									required: "Character level is required",
									validate: (value) => !isNaN(value) || "Value must be a number",
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.inputNumber}
										placeholder="0-20"
										keyboardType="number-pad"
										inputMode="numeric"
										onBlur={onBlur}
										onChangeText={(text) => {
											onChange(Number(text));
										}}
										value={!value ? "" : value.toString()}
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
									validate: (value) => (value !== null && !isNaN(value)) || "Value must be a number",
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.inputNumber}
										placeholder="0-30"
										keyboardType="number-pad"
										inputMode="numeric"
										onBlur={onBlur}
										onChangeText={(text) => {
											onChange(Number(text));
										}}
										value={!value ? "" : value.toString()}
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
									validate: (value) => (value !== null && !isNaN(value)) || "Value must be a number",
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.inputNumber}
										placeholder="15"
										keyboardType="number-pad"
										inputMode="numeric"
										onBlur={onBlur}
										onChangeText={(text) => {
											onChange(Number(text));
										}}
										value={!value ? "" : value.toString()}
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
								onPress={() => setShowPreparedSpells(!showPreparedSpells)}
							>
								<MaterialCommunityIcons
									name={showPreparedSpells ? "checkbox-marked" : "checkbox-blank-outline"}
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
								onPress={() => setShowSpellslots(!showSpellslots)}
							>
								<MaterialCommunityIcons
									name={showSpellslots ? "checkbox-marked" : "checkbox-blank-outline"}
									size={28}
									color="#660000"
								/>
							</TouchableOpacity>
						</View>

						{showSpellslots && (
							<View style={{ flexDirection: "row" }}>
								<View style={{ flexDirection: "column" }}>
									<View style={{ flexDirection: "row", alignItems: "baseline" }}>
										<Text style={styles.textSpellslot}>Level 1</Text>
										<TextInput
											style={styles.inputSpellslot}
											placeholder="0-30"
											keyboardType="number-pad"
											inputMode="numeric"
											onChangeText={(text) => {
												setLvlOneSpellSlots(Number(text));
											}}
											value={!lvlOneSpellSlots ? "" : lvlOneSpellSlots.toString()}
										/>
									</View>
									<View style={{ flexDirection: "row", alignItems: "baseline" }}>
										<Text style={styles.textSpellslot}>Level 2</Text>
										<TextInput
											style={styles.inputSpellslot}
											placeholder="0-30"
											keyboardType="number-pad"
											inputMode="numeric"
											onChangeText={(text) => {
												setLvlTwoSpellSlots(Number(text));
											}}
											value={!lvlTwoSpellSlots ? "" : lvlTwoSpellSlots.toString()}
										/>
									</View>
									<View style={{ flexDirection: "row", alignItems: "baseline" }}>
										<Text style={styles.textSpellslot}>Level 3</Text>
										<TextInput
											style={styles.inputSpellslot}
											placeholder="0-30"
											keyboardType="number-pad"
											inputMode="numeric"
											onChangeText={(text) => {
												setLvlThreeSpellSlots(Number(text));
											}}
											value={!lvlThreeSpellSlots ? "" : lvlThreeSpellSlots.toString()}
										/>
									</View>
									<View style={{ flexDirection: "row", alignItems: "baseline" }}>
										<Text style={styles.textSpellslot}>Level 4</Text>
										<TextInput
											style={styles.inputSpellslot}
											placeholder="0-30"
											keyboardType="number-pad"
											inputMode="numeric"
											onChangeText={(text) => {
												setLvlFourSpellSlots(Number(text));
											}}
											value={!lvlFourSpellSlots ? "" : lvlFourSpellSlots.toString()}
										/>
									</View>
									<View style={{ flexDirection: "row", alignItems: "baseline" }}>
										<Text style={styles.textSpellslot}>Level 5</Text>
										<TextInput
											style={styles.inputSpellslot}
											placeholder="0-30"
											keyboardType="number-pad"
											inputMode="numeric"
											onChangeText={(text) => {
												setLvlFiveSpellSlots(Number(text));
											}}
											value={!lvlFiveSpellSlots ? "" : lvlFiveSpellSlots.toString()}
										/>
									</View>
								</View>

								<View style={{ flexDirection: "column" }}>
									<View style={{ flexDirection: "row", alignItems: "baseline" }}>
										<Text style={styles.textSpellslot}>Level 6</Text>
										<TextInput
											style={styles.inputSpellslot}
											placeholder="0-30"
											keyboardType="number-pad"
											inputMode="numeric"
											onChangeText={(text) => {
												setLvlSixSpellSlots(Number(text));
											}}
											value={!lvlSixSpellSlots ? "" : lvlSixSpellSlots.toString()}
										/>
									</View>
									<View style={{ flexDirection: "row", alignItems: "baseline" }}>
										<Text style={styles.textSpellslot}>Level 7</Text>
										<TextInput
											style={styles.inputSpellslot}
											placeholder="0-30"
											keyboardType="number-pad"
											inputMode="numeric"
											onChangeText={(text) => {
												setLvlSevenSpellSlots(Number(text));
											}}
											value={!lvlSevenSpellSlots ? "" : lvlSevenSpellSlots.toString()}
										/>
									</View>
									<View style={{ flexDirection: "row", alignItems: "baseline" }}>
										<Text style={styles.textSpellslot}>Level 8</Text>
										<TextInput
											style={styles.inputSpellslot}
											placeholder="0-30"
											keyboardType="number-pad"
											inputMode="numeric"
											onChangeText={(text) => {
												setLvlEightSpellSlots(Number(text));
											}}
											value={!lvlEightSpellSlots ? "" : lvlEightSpellSlots.toString()}
										/>
									</View>
									<View style={{ flexDirection: "row", alignItems: "baseline" }}>
										<Text style={styles.textSpellslot}>Level 9</Text>
										<TextInput
											style={styles.inputSpellslot}
											placeholder="0-30"
											keyboardType="number-pad"
											inputMode="numeric"
											onChangeText={(text) => {
												setLvlNineSpellSlots(Number(text));
											}}
											value={!lvlNineSpellSlots ? "" : lvlNineSpellSlots.toString()}
										/>
									</View>
								</View>
							</View>
						)}

						<Pressable style={styles.button} onPress={handleSubmit(onCreateCharacter)} disabled={submitting}>
							<Text style={styles.buttonText}>{submitting ? "Creating character..." : "Create character"}</Text>
						</Pressable>
					</View>
				</ScrollView>
			</ImageBackground>
		</View>
	);
};

export default AddCharacter;

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
		fontFamily: "NunitoRegular",
		color: "#2b2b2b",
		marginBottom: 5,
		marginTop: 10,
	},
	textSpellslot: {
		fontSize: 14,
		fontFamily: "NunitoRegular",
		color: "#2b2b2b",
		marginBottom: 5,
		marginRight: 12,
		marginTop: 10,
	},
	textBold: {
		fontSize: 18,
		fontFamily: "NunitoBold",
		color: "#2b2b2b",
		marginBottom: 10,
	},
	error: {
		color: "red",
		marginBottom: 10,
	},
	label: {
		fontSize: 16,
		fontFamily: "NunitoBold",
		marginBottom: 5,
	},
	input: {
		backgroundColor: "#F0E4D1",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		fontFamily: "NunitoRegular",
	},
	inputNumber: {
		backgroundColor: "#F0E4D1",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		textAlign: "center",
		fontFamily: "NunitoRegular",
		width: "20%",
	},
	inputSpellslot: {
		backgroundColor: "#F0E4D1",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		textAlign: "center",
		fontFamily: "NunitoRegular",
		width: "35%",
	},
	button: {
		backgroundColor: "#990000",
		paddingVertical: 12,
		borderRadius: 5,
		alignItems: "center",
		width: "100%",
		marginTop: 30,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontFamily: "NunitoSemiBold",
	},
});
