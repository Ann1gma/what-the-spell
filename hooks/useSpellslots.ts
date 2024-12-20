import { doc, updateDoc } from "firebase/firestore";
import { characterCol } from "@/services/firebaseConfig";
import useGetCharacter from "./useGetCharacter";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { FirebaseError } from "firebase/app";

const useSpellslots = (characterId: string) => {
	const { data: character } = useGetCharacter(characterId.toString());
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	const useSpellslotsFunc = async (spellslotId: string, newState: boolean) => {
		if (!character || !character.spellslots) {
			return;
		}

		setLoading(true);

		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

		const updatedSpellslots = character.spellslots.map((slot) => {
			if (slot._id === spellslotId) {
				return { ...slot, used: newState };
			}
			return slot;
		});

		const docRef = doc(characterCol, characterId);

		try {
			await updateDoc(docRef, { ...character, spellslots: updatedSpellslots });
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Failed when trying to use spell slot"));
			dispatch(changeIsError(true));
		}

		setLoading(false);
	};

	const resetSpellslots = async () => {
		if (!character) {
			return;
		}

		const docRef = doc(characterCol, characterId);

		try {
			await updateDoc(docRef, { ...character, spellslots: null });
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Failed when trying to reset spell slots"));
			dispatch(changeIsError(true));
		}
	};

	return {
		useSpellslotsFunc,
		resetSpellslots,
		loading,
	};
};

export default useSpellslots;
