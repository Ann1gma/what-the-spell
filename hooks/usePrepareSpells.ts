import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { characterCol } from "@/services/firebaseConfig";
import { Character, CharacterSpell } from "@/types/Character.types";
import { useDispatch } from "react-redux";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { FirebaseError } from "firebase/app";

const usePrepareSpells = () => {
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	//@CodeScene(disable:"Complex Method")
	const prepareSpell = async (spellData: CharacterSpell, character: Character) => {
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

		setLoading(true);

		const docRef = doc(characterCol, character._id);

		const newSpell = {
			attack_type: spellData.attack_type,
			concentration: spellData.concentration,
			damage: spellData.damage,
			healing: spellData.healing,
			index: spellData.index,
			level: spellData.level,
			name: spellData.name,
			ritual: spellData.ritual,
			school: spellData.school,
		};

		try {
			let updatedSpells: CharacterSpell[] = [];

			if (!character.show_prepared_spells) {
				return;
			} else if (!character.prepared_spells || character.prepared_spells.length === 0) {
				updatedSpells = [newSpell];

				await updateDoc(docRef, { prepared_spells: updatedSpells });
			} else {
				const characterKnowledge = character.prepared_spells.find((spell) => spell.index === spellData.index);
				if (characterKnowledge) {
					setLoading(false);
					return;
				}

				updatedSpells = [...character.prepared_spells, newSpell]
					.sort((a, b) => a.level - b.level)
					.sort((a, b) => a.name.localeCompare(b.name));

				await updateDoc(docRef, { prepared_spells: updatedSpells });
			}
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Failed when trying to prepare spells"));
			dispatch(changeIsError(true));
		} finally {
			setLoading(false);
		}
	};

	const unPrepareSpell = async (spellId: string, character: Character) => {
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));
		setLoading(true);

		const docRef = doc(characterCol, character._id);

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

				dispatch(changeErrorMessage("Failed when trying to remove a prepared spells"));
				dispatch(changeIsError(true));
			} finally {
				setLoading(false);
			}
		}
	};

	return {
		loading,
		prepareSpell,
		unPrepareSpell,
	};
};

export default usePrepareSpells;
