import { Character, CharacterKnowsSpells } from "@/types/Character.types";
import { useState } from "react";

const useIsSpellKnown = () => {
	const [charactersKnowsSpell, setCharactersKnowsSpell] = useState<CharacterKnowsSpells[]>([]);

	//@CodeScene(disable:"Large Method") @CodeScene(disable:"Complex Method") @CodeScene(disable:"Bumpy Road Ahead")
	const isSpellKnown = (characters: Character[], spellIndex: string, spellLevel: number) => {
		const characterKnowledgeArray: CharacterKnowsSpells[] = [];

		if (spellLevel === 0) {
			characters.forEach((character) => {
				if (character.known_spells && character.known_spells.cantrips) {
					const characterKnowledge = character.known_spells.cantrips.find((spell) => spell.index === spellIndex);
					characterKnowledgeArray.push(
						characterKnowledge
							? { character_name: character.character_name, knowsSpell: true }
							: { character_name: character.character_name, knowsSpell: false }
					);
				} else {
					characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
				}
			});
		} else if (spellLevel === 1) {
			characters.forEach((character) => {
				if (character.known_spells && character.known_spells.lvl_one) {
					const characterKnowledge = character.known_spells.lvl_one.find((spell) => spell.index === spellIndex);
					characterKnowledgeArray.push(
						characterKnowledge
							? { character_name: character.character_name, knowsSpell: true }
							: { character_name: character.character_name, knowsSpell: false }
					);
				} else {
					characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
				}
			});
		} else if (spellLevel === 2) {
			characters.forEach((character) => {
				if (character.known_spells && character.known_spells.lvl_two) {
					const characterKnowledge = character.known_spells.lvl_two.find((spell) => spell.index === spellIndex);
					characterKnowledgeArray.push(
						characterKnowledge
							? { character_name: character.character_name, knowsSpell: true }
							: { character_name: character.character_name, knowsSpell: false }
					);
				} else {
					characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
				}
			});
		} else if (spellLevel === 3) {
			characters.forEach((character) => {
				if (character.known_spells && character.known_spells.lvl_three) {
					const characterKnowledge = character.known_spells.lvl_three.find((spell) => spell.index === spellIndex);
					characterKnowledgeArray.push(
						characterKnowledge
							? { character_name: character.character_name, knowsSpell: true }
							: { character_name: character.character_name, knowsSpell: false }
					);
				} else {
					characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
				}
			});
		} else if (spellLevel === 4) {
			characters.forEach((character) => {
				if (character.known_spells && character.known_spells.lvl_four) {
					const characterKnowledge = character.known_spells.lvl_four.find((spell) => spell.index === spellIndex);
					characterKnowledgeArray.push(
						characterKnowledge
							? { character_name: character.character_name, knowsSpell: true }
							: { character_name: character.character_name, knowsSpell: false }
					);
				} else {
					characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
				}
			});
		} else if (spellLevel === 5) {
			characters.forEach((character) => {
				if (character.known_spells && character.known_spells.lvl_five) {
					const characterKnowledge = character.known_spells.lvl_five.find((spell) => spell.index === spellIndex);
					characterKnowledgeArray.push(
						characterKnowledge
							? { character_name: character.character_name, knowsSpell: true }
							: { character_name: character.character_name, knowsSpell: false }
					);
				} else {
					characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
				}
			});
		} else if (spellLevel === 6) {
			characters.forEach((character) => {
				if (character.known_spells && character.known_spells.lvl_six) {
					const characterKnowledge = character.known_spells.lvl_six.find((spell) => spell.index === spellIndex);
					characterKnowledgeArray.push(
						characterKnowledge
							? { character_name: character.character_name, knowsSpell: true }
							: { character_name: character.character_name, knowsSpell: false }
					);
				} else {
					characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
				}
			});
		} else if (spellLevel === 7) {
			characters.forEach((character) => {
				if (character.known_spells && character.known_spells.lvl_seven) {
					const characterKnowledge = character.known_spells.lvl_seven.find((spell) => spell.index === spellIndex);
					characterKnowledgeArray.push(
						characterKnowledge
							? { character_name: character.character_name, knowsSpell: true }
							: { character_name: character.character_name, knowsSpell: false }
					);
				} else {
					characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
				}
			});
		} else if (spellLevel === 8) {
			characters.forEach((character) => {
				if (character.known_spells && character.known_spells.lvl_eight) {
					const characterKnowledge = character.known_spells.lvl_eight.find((spell) => spell.index === spellIndex);
					characterKnowledgeArray.push(
						characterKnowledge
							? { character_name: character.character_name, knowsSpell: true }
							: { character_name: character.character_name, knowsSpell: false }
					);
				} else {
					characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
				}
			});
		} else if (spellLevel === 9) {
			characters.forEach((character) => {
				if (character.known_spells && character.known_spells.lvl_nine) {
					const characterKnowledge = character.known_spells.lvl_nine.find((spell) => spell.index === spellIndex);
					characterKnowledgeArray.push(
						characterKnowledge
							? { character_name: character.character_name, knowsSpell: true }
							: { character_name: character.character_name, knowsSpell: false }
					);
				} else {
					characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
				}
			});
		}

		setCharactersKnowsSpell(characterKnowledgeArray);
	};

	return {
		isSpellKnown,
		charactersKnowsSpell,
	};
};

export default useIsSpellKnown;
