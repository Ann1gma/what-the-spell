import { CharacterSpell } from "@/types/Character.types";
import { StyleSheet, View } from "react-native";
import CharacterAccordionComponent from "./CharacterAccordionComponents";

interface CharacterSpellComponentProps {
	data: CharacterSpell[];
	characterId: string;
}
//@CodeScene(disable:"Complex Method")
const CharacterSpellComponent: React.FC<CharacterSpellComponentProps> = ({ data, characterId }) => {
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

	return (
		<View style={styles.accordionContainer}>
			{cantripsData && cantripsData.length > 0 && (
				<CharacterAccordionComponent title="Cantrips" data={cantripsData} characterId={characterId} />
			)}
			{lvlOneData && lvlOneData.length > 0 && <CharacterAccordionComponent title="Level 1" data={lvlOneData} characterId={characterId} />}
			{lvlTwoData && lvlTwoData.length > 0 && <CharacterAccordionComponent title="Level 2" data={lvlTwoData} characterId={characterId} />}
			{lvlThreeData && lvlThreeData.length > 0 && <CharacterAccordionComponent title="Level 3" data={lvlThreeData} characterId={characterId} />}
			{lvlFourData && lvlFourData.length > 0 && <CharacterAccordionComponent title="Level 4" data={lvlFourData} characterId={characterId} />}
			{lvlFiveData && lvlFiveData.length > 0 && <CharacterAccordionComponent title="Level 5" data={lvlFiveData} characterId={characterId} />}
			{lvlSixData && lvlSixData.length > 0 && <CharacterAccordionComponent title="Level 6" data={lvlSixData} characterId={characterId} />}
			{lvlSevenData && lvlSevenData.length > 0 && <CharacterAccordionComponent title="Level 7" data={lvlSevenData} characterId={characterId} />}
			{lvlEightData && lvlEightData.length > 0 && <CharacterAccordionComponent title="Level 8" data={lvlEightData} characterId={characterId} />}
			{lvlNineData && lvlNineData.length > 0 && <CharacterAccordionComponent title="Level 9" data={lvlNineData} characterId={characterId} />}
		</View>
	);
};

export default CharacterSpellComponent;

const styles = StyleSheet.create({
	accordionContainer: {
		marginHorizontal: 15,
		marginVertical: 15,
	},
});
