import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { characterCol } from "@/services/firebaseConfig";
import useGetSpellByIndex from "./useGetSpellByIndex";
import { Character, CharacterSpell } from "@/types/Character.types";
import { useDispatch } from "react-redux";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { FirebaseError } from "firebase/app";

const useAddAndRemoveSpell = () => {
	const { getSpell } = useGetSpellByIndex();
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	//@CodeScene(disable:"Complex Method")
	const addSpell = async (spellIndex: string, character: Character) => {
		setLoading(true);

		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

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
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Failed to add spell"));
			dispatch(changeIsError(true));
		} finally {
			setLoading(false);
		}
	};

	//@CodeScene(disable:"Complex Method") @CodeScene(disable:"Bumpy Road Ahead")
	const deleteSpell = async (spellId: string, character: Character) => {
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

		const docRef = doc(characterCol, character._id);

		if (!character.known_spells) {
			return;
		} else {
			const filteredSpells = character.known_spells.filter((spell) => spell.index !== spellId);
			const updatedSpells = filteredSpells.sort((a, b) => a.level - b.level).sort((a, b) => a.name.localeCompare(b.name));

			try {
				await updateDoc(docRef, { known_spells: updatedSpells });
			} catch (err) {
				if (err instanceof FirebaseError) {
					dispatch(changeErrorMessage(err.message));
					dispatch(changeIsError(true));
				} else if (err instanceof Error) {
					dispatch(changeErrorMessage(err.message));
					dispatch(changeIsError(true));
				}

				dispatch(changeErrorMessage("Failed to remove spell"));
				dispatch(changeIsError(true));
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
				if (err instanceof FirebaseError) {
					dispatch(changeErrorMessage(err.message));
					dispatch(changeIsError(true));
				} else if (err instanceof Error) {
					dispatch(changeErrorMessage(err.message));
					dispatch(changeIsError(true));
				}

				dispatch(changeErrorMessage("Failed to remove spellslots"));
				dispatch(changeIsError(true));
			}
		}

		setLoading(false);
	};

	return {
		loading,
		addSpell,
		deleteSpell,
	};
};

export default useAddAndRemoveSpell;
