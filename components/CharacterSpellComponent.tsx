import { CharacterSpells } from "@/types/Character.types";
import { StyleSheet, View } from "react-native";
import CharacterAccordionComponent from "./CharacterAccordionComponents";

interface CharacterSpellComponentProps {
	data: CharacterSpells;
	characterId: string;
}
//@CodeScene(disable:"Complex Method")
const CharacterSpellComponent: React.FC<CharacterSpellComponentProps> = ({ data, characterId }) => {
	return (
		<View style={styles.accordionContainer}>
			{data.cantrips && <CharacterAccordionComponent title="Cantrips" data={data.cantrips} characterId={characterId} />}
			{data.lvl_one && <CharacterAccordionComponent title="Level 1" data={data.lvl_one} characterId={characterId} />}
			{data.lvl_two && <CharacterAccordionComponent title="Level 2" data={data.lvl_two} characterId={characterId} />}
			{data.lvl_three && <CharacterAccordionComponent title="Level 3" data={data.lvl_three} characterId={characterId} />}
			{data.lvl_four && <CharacterAccordionComponent title="Level 4" data={data.lvl_four} characterId={characterId} />}
			{data.lvl_five && <CharacterAccordionComponent title="Level 5" data={data.lvl_five} characterId={characterId} />}
			{data.lvl_six && <CharacterAccordionComponent title="Level 6" data={data.lvl_six} characterId={characterId} />}
			{data.lvl_seven && <CharacterAccordionComponent title="Level 7" data={data.lvl_seven} characterId={characterId} />}
			{data.lvl_eight && <CharacterAccordionComponent title="Level 8" data={data.lvl_eight} characterId={characterId} />}
			{data.lvl_nine && <CharacterAccordionComponent title="Level 9" data={data.lvl_nine} characterId={characterId} />}
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
