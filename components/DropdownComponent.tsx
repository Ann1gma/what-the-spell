import { ClassObject } from "@/types/DnD5e_API.types";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface DropdownComponentProps {
	onChange: (item: ClassObject) => void;
	placeholder: string;
	options: ClassObject[];
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ onChange, placeholder, options }) => {
	const [expanded, setExpanded] = useState(false);
	const [value, setValue] = useState<string>(placeholder);

	const onSelect = (item: ClassObject) => {
		onChange(item);
		setValue(item.name);
		setExpanded(false);
	};

	return (
		<View>
			<View style={styles.container}>
				<TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.buttonContainer}>
					<Text style={styles.labelPlaceholder}>{value}</Text>
					<FontAwesome5 name={expanded ? "chevron-up" : "chevron-down"} size={24} color="#2b2b2b" />
				</TouchableOpacity>
			</View>
			{expanded && (
				<SafeAreaView>
					<TouchableWithoutFeedback>
						<View style={styles.optionsContainer}>
							{options.map((item) => (
								<TouchableOpacity key={item.index} style={styles.optionItem} activeOpacity={0.8} onPress={() => onSelect(item)}>
									<Text style={styles.optionText}>{item.name}</Text>
								</TouchableOpacity>
							))}
							{/* <FlatList
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
							/> */}
						</View>
					</TouchableWithoutFeedback>
				</SafeAreaView>
			)}
		</View>
	);
};

export default DropdownComponent;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		width: "100%",
		marginHorizontal: "auto",
		marginTop: 5,
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
		paddingHorizontal: 8,
		fontSize: 18,
		color: "#2b2b2b",
	},
	labelPlaceholder: {
		fontSize: 16,
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
		marginHorizontal: "auto",
		borderRadius: 5,
		backgroundColor: "rgba(240, 228, 209, 0.6)",
		overflow: "scroll",
	},
	optionItem: {
		paddingVertical: 15,
		paddingLeft: 5,
		borderBottomWidth: 2,
		borderBottomColor: "#F2F2F2",
	},
	optionText: {
		fontSize: 16,
		fontFamily: "NunitoRegular",
		color: "#2b2b2b",
	},
});
