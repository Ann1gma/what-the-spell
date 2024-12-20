import { Character, CharacterKnowsSpells } from "@/types/Character.types";
import { useState } from "react";

const useIsSpellKnown = () => {
	const [charactersKnowsSpell, setCharactersKnowsSpell] = useState<CharacterKnowsSpells[]>([]);

	const isSpellKnown = (characters: Character[], spellIndex: string, spellLevel: number) => {
		const characterKnowledgeArray: CharacterKnowsSpells[] = [];

		characters.forEach((character) => {
			if (character.known_spells) {
				const characterKnowledge = character.known_spells.find((spell) => spell.index === spellIndex);
				characterKnowledgeArray.push(
					characterKnowledge
						? { character_name: character.character_name, knowsSpell: true }
						: { character_name: character.character_name, knowsSpell: false }
				);
			} else {
				characterKnowledgeArray.push({ character_name: character.character_name, knowsSpell: false });
			}
		});

		setCharactersKnowsSpell(characterKnowledgeArray);
	};

	return {
		isSpellKnown,
		charactersKnowsSpell,
	};
};

export default useIsSpellKnown;
