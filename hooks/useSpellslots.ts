import { doc, updateDoc } from "firebase/firestore";
import { characterCol } from "@/services/firebaseConfig";
import useGetCharacter from "./useGetCharacter";
import { useState } from "react";

const useSpellslots = (characterId: string) => {
	const { data: character } = useGetCharacter(characterId.toString());
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const useSpellslotsFunc = async (spellslotId: string, newState: boolean) => {
		if (!character || !character.spellslots) {
			return;
		}

		const updatedSpellslots = character.spellslots.map((slot) => {
			setError(false);
			setLoading(true);

			if (slot._id === spellslotId) {
				return { ...slot, used: newState };
			}
			return slot;
		});

		const docRef = doc(characterCol, characterId);

		try {
			await updateDoc(docRef, { ...character, spellslots: updatedSpellslots });
		} catch (err) {
			setError(true);
		}

		setLoading(false);
	};

	return {
		useSpellslotsFunc,
		error,
		loading,
	};
};

export default useSpellslots;
