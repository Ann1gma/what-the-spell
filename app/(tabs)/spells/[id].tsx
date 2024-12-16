import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ErrorComponent from "@/components/ErrorComponent";
import useGetSpellByIndex from "@/hooks/useGetSpellByIndex";
import SpellDetailsInfoComponent from "@/components/SpellDetailsInfoComponent";
import SpellDetailsDamageComponent from "@/components/SpellDetailsDamageComponent";
import SpellDetailsHealingComponent from "@/components/SpellDetailsHealingComponent";
import SpellDetailsHigherLvlComponent from "@/components/SpellDetailsHigherLvlComponent";

export default function SpellDetailScreen() {
	const isError = useSelector((state: RootState) => state.error.isError);
	const isLoading = useSelector((state: RootState) => state.loading.loading);

	const { spellData, getSpellData } = useGetSpellByIndex();

	const { id } = useLocalSearchParams();
	const router = useRouter();

	useEffect(() => {
		if (typeof id === "string") {
			getSpellData(id);
		} else {
			getSpellData(id[0]);
		}
	}, [id]);

	if (isLoading) {
		return <LoadingComponent />;
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../../../assets/images/background-image.jpg")} resizeMode="cover" style={styles.image}>
				<View style={styles.titleContainer}>
					{spellData && (
						<View style={styles.titleWrapper}>
							<Text style={styles.title}>{spellData.name}</Text>
						</View>
					)}
					<View style={styles.iconContainer}>
						<Pressable onPress={() => router.back()}>
							<Feather name="arrow-left" size={24} color="#2b2b2b" />
						</Pressable>
					</View>
				</View>
				{isError && <ErrorComponent />}
				{spellData && (
					<SafeAreaView style={styles.scrollContainer}>
						<ScrollView>
							<View style={styles.contentWrapper}>
								<SpellDetailsInfoComponent spellData={spellData} />

								<SpellDetailsDamageComponent spellData={spellData} />

								<SpellDetailsHealingComponent spellData={spellData} />
							</View>

							<View style={styles.contentWrapper}>
								<Text style={styles.boldText}>Description:</Text>
								{spellData.desc.map((paragraph, index) => (
									<View style={[styles.infoContainer, { marginBottom: 20 }]} key={index}>
										<Text style={styles.text}>{paragraph}</Text>
									</View>
								))}
							</View>

							<SpellDetailsHigherLvlComponent spellData={spellData} />
						</ScrollView>
					</SafeAreaView>
				)}
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flex: 1,
		marginTop: 10,
		marginHorizontal: 15,
		padding: 20,
		backgroundColor: "rgba(240, 228, 209, 0.4)",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
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
		minHeight: 60,
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontFamily: "CinzelBlack",
		color: "#990000",
		textAlign: "center",
		paddingVertical: 8,
	},
	titleWrapper: {
		flexWrap: "wrap",
		width: "80%",
		alignContent: "center",
		alignItems: "center",
	},
	iconContainer: {
		position: "absolute",
		left: "3%",
		zIndex: 1,
	},
	contentWrapper: {
		marginVertical: 10,
	},
	infoContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},
	text: {
		fontFamily: "NunitoRegular",
		fontSize: 16,
		color: "#2b2b2b",
		marginRight: 5,
	},
	boldText: {
		fontFamily: "NunitoBlack",
		fontSize: 16,
		color: "#2b2b2b",
		marginRight: 5,
	},
});
