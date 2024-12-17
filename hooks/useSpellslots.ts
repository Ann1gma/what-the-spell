import { doc, updateDoc } from "firebase/firestore";
import { characterCol } from "@/services/firebaseConfig";
import useGetCharacter from "./useGetCharacter";
import { useDispatch } from "react-redux";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";

const useSpellslots = (characterId: string) => {
	const { data: character } = useGetCharacter(characterId.toString());
	const dispatch = useDispatch();

	const useSpellslotsFunc = async (spellslotId: string, newState: boolean) => {
		dispatch(changeIsError(false));
		dispatch(changeErrorMessage(""));

		if (!character || !character.spellslots) {
			return;
		}

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
			dispatch(changeIsError(true));
			dispatch(changeErrorMessage("Error when trying to update spellslot"));
		}
	};

	return {
		useSpellslotsFunc,
	};
};

export default useSpellslots;
