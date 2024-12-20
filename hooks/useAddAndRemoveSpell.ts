import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { characterCol } from "@/services/firebaseConfig";
import useGetSpellByIndex from "./useGetSpellByIndex";
import { Character, CharacterSpell } from "@/types/Character.types";

const useAddAndRemoveSpell = () => {
	const { getSpell } = useGetSpellByIndex();

	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	//@CodeScene(disable:"Complex Method")
	const addSpell = async (spellIndex: string, character: Character) => {
		setError(false);
		setLoading(true);

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

		try {
			let updatedSpells: CharacterSpell[] = [];

			if (!character.known_spells || character.known_spells.length === 0) {
				updatedSpells = [newSpell];
			} else {
				const characterKnowledge = character.known_spells.find((spell) => spell.index === spellIndex);
				if (characterKnowledge) {
					setLoading(false);
					return;
				}
				updatedSpells = [...character.known_spells, newSpell].sort((a, b) => a.name.localeCompare(b.name));
			}

			await updateDoc(docRef, { known_spells: updatedSpells });
			setError(false);
		} catch (err) {
			console.error("Failed to add spell:", err);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	const deleteSpell = async (spellId: string, character: Character) => {
		setError(false);
		setLoading(true);

		const docRef = doc(characterCol, character._id);

		if (!character.known_spells) {
			return;
		} else {
			const filteredSpells = character.known_spells.filter((spell) => spell.index !== spellId);
			const updatedSpells = filteredSpells.sort((a, b) => a.level - b.level).sort((a, b) => a.name.localeCompare(b.name));

			try {
				await updateDoc(docRef, { known_spells: updatedSpells });
			} catch (err) {
				setError(true);
			}
		}

		if (!character.prepared_spells) {
			return;
		} else {
			const filteredSpells = character.prepared_spells.filter((spell) => spell.index !== spellId);
			const updatedSpells = filteredSpells.sort((a, b) => a.level - b.level).sort((a, b) => a.name.localeCompare(b.name));

			try {
				await updateDoc(docRef, { prepared_spells: updatedSpells });
			} catch (err) {
				setError(true);
			}
		}

		setLoading(false);
	};

	return {
		error,
		loading,
		addSpell,
		deleteSpell,
	};
};

export default useAddAndRemoveSpell;
