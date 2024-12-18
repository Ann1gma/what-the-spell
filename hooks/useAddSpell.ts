import { useState } from "react";
import useGetCharacter from "./useGetCharacter";
import { doc, updateDoc } from "firebase/firestore";
import { characterCol } from "@/services/firebaseConfig";
import useGetSpellByIndex from "./useGetSpellByIndex";
import { Character, CharacterSpell } from "@/types/Character.types";

const useAddSpell = () => {
	const { getSpell } = useGetSpellByIndex();

	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	//@CodeScene(disable:"Complex Method")
	const addSpell = async (spellIndex: string, character: Character) => {
		setError(false);
		setLoading(true);

		if (!character) {
			setLoading(false);
			return;
		}

		const docRef = doc(characterCol, character._id);
		const spellData = await getSpell(spellIndex);

		if (!spellData) {
			setLoading(false);
			return;
		}

		const newSpell = {
			attack_type: spellData.attack_type,
			concentration: spellData.concentration,
			damage: spellData.damage ? true : false,
			healing: spellData.heal_at_slot_level ? true : false,
			index: spellData.index,
			level: spellData.level,
			name: spellData.name,
			ritual: spellData.ritual,
			school: spellData.school.name,
		};

		if (!character.known_spells || character.known_spells.length === 0) {
			try {
				await updateDoc(docRef, { ...character, known_spells: [newSpell] });
			} catch (err) {
				setError(true);
			}
		} else {
			const characterKnowledge = character.known_spells.find((spell) => spell.index === spellIndex);
			if (characterKnowledge) {
				return;
			} else {
				try {
					const knownSpells = [...character.known_spells];
					knownSpells.push(newSpell);
					await updateDoc(docRef, { ...character, known_spells: knownSpells });
				} catch (err) {
					setError(true);
				}
			}
		}

		setLoading(false);
	};

	return {
		error,
		loading,
		addSpell,
	};
};

export default useAddSpell;
