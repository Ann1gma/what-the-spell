import { Character, CharacterSpell } from "@/types/Character.types";
import { ScrollView, StyleSheet, View } from "react-native";
import CharacterAccordionComponent from "./CharacterAccordionComponents";
import PreparedSpellsComponent from "./PreparedSpellsComponent";
import { useRef } from "react";

interface CharacterSpellComponentProps {
	data: CharacterSpell[];
	characterData: Character;
	showPreparedSPells: boolean;
}
//@CodeScene(disable:"Complex Method") @CodeScene(disable:"Large Method")
const CharacterSpellComponent: React.FC<CharacterSpellComponentProps> = ({ data, characterData, showPreparedSPells }) => {
	const scrollViewRef = useRef<ScrollView>(null);

	const cantripsData = data.filter((spell) => spell.level === 0);
	const lvlOneData = data.filter((spell) => spell.level === 1);
	const lvlTwoData = data.filter((spell) => spell.level === 2);
	const lvlThreeData = data.filter((spell) => spell.level === 3);
	const lvlFourData = data.filter((spell) => spell.level === 4);
	const lvlFiveData = data.filter((spell) => spell.level === 5);
	const lvlSixData = data.filter((spell) => spell.level === 6);
	const lvlSevenData = data.filter((spell) => spell.level === 7);
	const lvlEightData = data.filter((spell) => spell.level === 8);
	const lvlNineData = data.filter((spell) => spell.level === 9);

	if (!showPreparedSPells) {
		return (
			<ScrollView ref={scrollViewRef}>
				<View style={styles.accordionContainer}>
					{cantripsData && cantripsData.length > 0 && (
						<CharacterAccordionComponent title="Cantrips" data={cantripsData} character={characterData} />
					)}
					{lvlOneData && lvlOneData.length > 0 && (
						<CharacterAccordionComponent title="Level 1" data={lvlOneData} character={characterData} />
					)}
					{lvlTwoData && lvlTwoData.length > 0 && (
						<CharacterAccordionComponent title="Level 2" data={lvlTwoData} character={characterData} />
					)}
					{lvlThreeData && lvlThreeData.length > 0 && (
						<CharacterAccordionComponent title="Level 3" data={lvlThreeData} character={characterData} />
					)}
					{lvlFourData && lvlFourData.length > 0 && (
						<CharacterAccordionComponent title="Level 4" data={lvlFourData} character={characterData} />
					)}
					{lvlFiveData && lvlFiveData.length > 0 && (
						<CharacterAccordionComponent title="Level 5" data={lvlFiveData} character={characterData} />
					)}
					{lvlSixData && lvlSixData.length > 0 && (
						<CharacterAccordionComponent title="Level 6" data={lvlSixData} character={characterData} />
					)}
					{lvlSevenData && lvlSevenData.length > 0 && (
						<CharacterAccordionComponent title="Level 7" data={lvlSevenData} character={characterData} />
					)}
					{lvlEightData && lvlEightData.length > 0 && (
						<CharacterAccordionComponent title="Level 8" data={lvlEightData} character={characterData} />
					)}
					{lvlNineData && lvlNineData.length > 0 && (
						<CharacterAccordionComponent title="Level 9" data={lvlNineData} character={characterData} />
					)}
				</View>
			</ScrollView>
		);
	}

	return (
		<ScrollView ref={scrollViewRef}>
			<View style={styles.accordionContainer}>
				{cantripsData && cantripsData.length > 0 && (
					<PreparedSpellsComponent title="Cantrips" data={cantripsData} character={characterData} />
				)}
				{lvlOneData && lvlOneData.length > 0 && <PreparedSpellsComponent title="Level 1" data={lvlOneData} character={characterData} />}
				{lvlTwoData && lvlTwoData.length > 0 && <PreparedSpellsComponent title="Level 2" data={lvlTwoData} character={characterData} />}
				{lvlThreeData && lvlThreeData.length > 0 && <PreparedSpellsComponent title="Level 3" data={lvlThreeData} character={characterData} />}
				{lvlFourData && lvlFourData.length > 0 && <PreparedSpellsComponent title="Level 4" data={lvlFourData} character={characterData} />}
				{lvlFiveData && lvlFiveData.length > 0 && <PreparedSpellsComponent title="Level 5" data={lvlFiveData} character={characterData} />}
				{lvlSixData && lvlSixData.length > 0 && <PreparedSpellsComponent title="Level 6" data={lvlSixData} character={characterData} />}
				{lvlSevenData && lvlSevenData.length > 0 && <PreparedSpellsComponent title="Level 7" data={lvlSevenData} character={characterData} />}
				{lvlEightData && lvlEightData.length > 0 && <PreparedSpellsComponent title="Level 8" data={lvlEightData} character={characterData} />}
				{lvlNineData && lvlNineData.length > 0 && <PreparedSpellsComponent title="Level 9" data={lvlNineData} character={characterData} />}
			</View>
		</ScrollView>
	);
};

export default CharacterSpellComponent;

const styles = StyleSheet.create({
	accordionContainer: {
		marginHorizontal: 15,
		marginVertical: 15,
	},
});
