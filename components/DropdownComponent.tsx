import { getAllClasses } from "@/services/DnD5e_API";
import { SpellDetailsClassObject } from "@/types/DnD5e_API.types";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface DropdownComponentProps {
	onChange: (item: SpellDetailsClassObject) => void;
	placeholder: string;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ onChange, placeholder }) => {
	const [expanded, setExpanded] = useState(false);
	const [value, setValue] = useState<string>(placeholder);
	const [options, setOptions] = useState<SpellDetailsClassObject[]>([{ index: "none", name: "All spells" }]);
	const [error, setError] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getClasses = async () => {
		setError(null);
		setIsError(false);
		setIsLoading(true);
		try {
			const data = await getAllClasses();
			setOptions((prevOptions) => [...prevOptions, ...data]);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	const onSelect = (item: SpellDetailsClassObject) => {
		onChange(item);
		setValue(item.name);
		setExpanded(false);
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

	if (isError) {
		return (
			<View>
				<Text>{error}</Text>
			</View>
		);
	}

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.buttonContainer}>
					<Text style={styles.labelPlaceholder}>{value}</Text>
					<FontAwesome5 name={expanded ? "chevron-up" : "chevron-down"} size={24} color="#2b2b2b" />
				</TouchableOpacity>
			</View>
			{expanded && (
				<TouchableWithoutFeedback>
					<View style={styles.optionsContainer}>
						<FlatList
							keyExtractor={(item) => item.index}
							data={options}
							style={{ flexGrow: 0 }}
							renderItem={({ item }) => (
								<TouchableOpacity activeOpacity={0.8} style={styles.optionItem} onPress={() => onSelect(item)}>
									<Text style={item.name === value ? styles.selectedTextStyle : styles.optionText}>
										{item.index === "none" ? "None" : item.name}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</TouchableWithoutFeedback>
			)}
		</SafeAreaView>
	);
};

export default DropdownComponent;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		width: "80%",
		marginHorizontal: "auto",
		marginTop: 20,
		borderRadius: 5,
		backgroundColor: "#F0E4D1",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	dropdown: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	label: {
		/* position: "absolute",
		left: 22,
		top: 8,
		zIndex: 999, */
		paddingHorizontal: 8,
		fontSize: 18,
		color: "#2b2b2b",
	},
	labelPlaceholder: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#2b2b2b",
	},
	selectedTextStyle: {
		fontSize: 16,
		fontFamily: "NunitoBold",
		color: "#990000",
	},
	optionsContainer: {
		padding: 16,
		width: "80%",
		marginHorizontal: "auto",
		borderRadius: 5,
		backgroundColor: "rgba(240, 228, 209, 0.4)",
		maxHeight: "70%",
		overflow: "scroll",
	},
	optionItem: {
		paddingVertical: 15,
		paddingLeft: 5,
		borderBottomWidth: 2,
		borderBottomColor: "#F0E4D1",
	},
	optionText: {
		fontSize: 16,
		fontFamily: "NunitoRegular",
		color: "#2b2b2b",
	},
});
