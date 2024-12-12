import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground } from "react-native";
import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { NewCharacter } from "@/types/Character.types";
import { ClassObject } from "@/types/DnD5e_API.types";
import { getAllClasses } from "@/services/DnD5e_API";
import DropdownComponent from "@/components/DropdownComponent";

const AddCharacter = () => {
	const { currentUser } = useAuth();
	const [options, setOptions] = useState<ClassObject[]>([]);
	const [className, setClassName] = useState<ClassObject | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [getError, setGetError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NewCharacter>();

	const getClasses = async () => {
		setGetError(null);
		setIsLoading(true);
		try {
			const data = await getAllClasses();

			const filterdList = data.filter(
				(item) => item.index !== "barbarian" && item.index !== "fighter" && item.index !== "monk" && item.index !== "rogue"
			);
			setOptions((prevOptions) => [...prevOptions, ...filterdList]);
		} catch (err) {
			setGetError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	const onFiltration = (item: ClassObject) => {
		setClassName(item);
	};

	const onCreateCharacter: SubmitHandler<NewCharacter> = async (data) => {
		setSubmitting(true);
		setError(null);
		try {
			await reset();
		} catch (err) {
			setError("Failed to login. Please check your credentials.");
		}
		setSubmitting(false);
	};

	useEffect(() => {
		getClasses();
	}, []);

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (getError) {
		return (
			<View>
				<Text>{getError}</Text>
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

				<View style={styles.formWrapper}>
					{error && <Text style={styles.error}>{error}</Text>}

					<Text style={styles.text}>Character name*</Text>
					<Controller
						control={control}
						rules={{ required: "Character name is required" }}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput style={styles.input} placeholder="Baldric the Bold" onBlur={onBlur} onChangeText={onChange} value={value} />
						)}
						name="character_name"
					/>
					{errors.character_name && <Text style={styles.error}>{errors.character_name.message}</Text>}

					<Text style={styles.text}>Class*</Text>
					<DropdownComponent options={options} onChange={(e) => onFiltration(e)} placeholder="Class" />

					<Text style={[styles.text, { marginTop: 12 }]}>Level*</Text>
					<Controller
						control={control}
						rules={{
							required: "Character level is required",
							validate: (value) => !isNaN(value) || "Value must be a number",
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.input}
								placeholder="Level"
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
					{errors.character_level && <Text style={styles.error}>{errors.character_level.message}</Text>}

					<Pressable style={styles.button} onPress={handleSubmit(onCreateCharacter)} disabled={submitting}>
						<Text style={styles.buttonText}>{submitting ? "Creating character..." : "Create character"}</Text>
					</Pressable>
				</View>
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
		marginBottom: 10,
	},
	textBold: {
		fontSize: 18,
		fontFamily: "NunitoBold",
		color: "#2b2b2b",
		marginBottom: 10,
	},
	linkText: {
		fontSize: 20,
		fontFamily: "NunitoBold",
		color: "#990000",
		marginBottom: 10,
		textDecorationLine: "underline",
		textAlign: "center",
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
		marginBottom: 15,
		fontFamily: "NunitoRegular",
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
