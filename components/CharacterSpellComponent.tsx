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

	const scrollToSection = (sectionIndex: number) => {
		const scrollPosition = sectionIndex * 30;

		scrollViewRef.current &&
			scrollViewRef.current.scrollTo({
				y: scrollPosition,
				animated: true,
			});
	};

	if (!showPreparedSPells) {
		return (
			<ScrollView ref={scrollViewRef}>
				<View style={styles.accordionContainer}>
					{cantripsData && cantripsData.length > 0 && (
						<CharacterAccordionComponent
							title="Cantrips"
							data={cantripsData}
							character={characterData}
							onHeaderPress={() => scrollToSection(0)}
						/>
					)}
					{lvlOneData && lvlOneData.length > 0 && (
						<CharacterAccordionComponent
							title="Level 1"
							data={lvlOneData}
							character={characterData}
							onHeaderPress={() => scrollToSection(1)}
						/>
					)}
					{lvlTwoData && lvlTwoData.length > 0 && (
						<CharacterAccordionComponent
							title="Level 2"
							data={lvlTwoData}
							character={characterData}
							onHeaderPress={() => scrollToSection(2)}
						/>
					)}
					{lvlThreeData && lvlThreeData.length > 0 && (
						<CharacterAccordionComponent
							title="Level 3"
							data={lvlThreeData}
							character={characterData}
							onHeaderPress={() => scrollToSection(3)}
						/>
					)}
					{lvlFourData && lvlFourData.length > 0 && (
						<CharacterAccordionComponent
							title="Level 4"
							data={lvlFourData}
							character={characterData}
							onHeaderPress={() => scrollToSection(4)}
						/>
					)}
					{lvlFiveData && lvlFiveData.length > 0 && (
						<CharacterAccordionComponent
							title="Level 5"
							data={lvlFiveData}
							character={characterData}
							onHeaderPress={() => scrollToSection(5)}
						/>
					)}
					{lvlSixData && lvlSixData.length > 0 && (
						<CharacterAccordionComponent
							title="Level 6"
							data={lvlSixData}
							character={characterData}
							onHeaderPress={() => scrollToSection(6)}
						/>
					)}
					{lvlSevenData && lvlSevenData.length > 0 && (
						<CharacterAccordionComponent
							title="Level 7"
							data={lvlSevenData}
							character={characterData}
							onHeaderPress={() => scrollToSection(7)}
						/>
					)}
					{lvlEightData && lvlEightData.length > 0 && (
						<CharacterAccordionComponent
							title="Level 8"
							data={lvlEightData}
							character={characterData}
							onHeaderPress={() => scrollToSection(8)}
						/>
					)}
					{lvlNineData && lvlNineData.length > 0 && (
						<CharacterAccordionComponent
							title="Level 9"
							data={lvlNineData}
							character={characterData}
							onHeaderPress={() => scrollToSection(9)}
						/>
					)}
				</View>
			</ScrollView>
		);
	}

	return (
		<ScrollView ref={scrollViewRef}>
			<View style={styles.accordionContainer}>
				{cantripsData && cantripsData.length > 0 && (
					<PreparedSpellsComponent
						title="Cantrips"
						data={cantripsData}
						character={characterData}
						onHeaderPress={() => scrollToSection(0)}
					/>
				)}
				{lvlOneData && lvlOneData.length > 0 && (
					<PreparedSpellsComponent title="Level 1" data={lvlOneData} character={characterData} onHeaderPress={() => scrollToSection(1)} />
				)}
				{lvlTwoData && lvlTwoData.length > 0 && (
					<PreparedSpellsComponent title="Level 2" data={lvlTwoData} character={characterData} onHeaderPress={() => scrollToSection(2)} />
				)}
				{lvlThreeData && lvlThreeData.length > 0 && (
					<PreparedSpellsComponent title="Level 3" data={lvlThreeData} character={characterData} onHeaderPress={() => scrollToSection(3)} />
				)}
				{lvlFourData && lvlFourData.length > 0 && (
					<PreparedSpellsComponent title="Level 4" data={lvlFourData} character={characterData} onHeaderPress={() => scrollToSection(4)} />
				)}
				{lvlFiveData && lvlFiveData.length > 0 && (
					<PreparedSpellsComponent title="Level 5" data={lvlFiveData} character={characterData} onHeaderPress={() => scrollToSection(5)} />
				)}
				{lvlSixData && lvlSixData.length > 0 && (
					<PreparedSpellsComponent title="Level 6" data={lvlSixData} character={characterData} onHeaderPress={() => scrollToSection(6)} />
				)}
				{lvlSevenData && lvlSevenData.length > 0 && (
					<PreparedSpellsComponent title="Level 7" data={lvlSevenData} character={characterData} onHeaderPress={() => scrollToSection(7)} />
				)}
				{lvlEightData && lvlEightData.length > 0 && (
					<PreparedSpellsComponent title="Level 8" data={lvlEightData} character={characterData} onHeaderPress={() => scrollToSection(8)} />
				)}
				{lvlNineData && lvlNineData.length > 0 && (
					<PreparedSpellsComponent title="Level 9" data={lvlNineData} character={characterData} onHeaderPress={() => scrollToSection(9)} />
				)}
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
