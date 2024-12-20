import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { getSpellDetails } from "@/services/DnD5e_API";
import { SpellDetails } from "@/types/DnD5e_API.types";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useGetSpellByIndex = () => {
	const [spellData, setSpellData] = useState<SpellDetails | null>(null);
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	const getSpellData = async (id: string) => {
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

		try {
			const data = await getSpellDetails(id);
			setSpellData(data);
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Failed to get spell"));
			dispatch(changeIsError(true));
		} finally {
			setLoading(false);
		}
	};

	const getSpell = async (id: string) => {
		try {
			return await getSpellDetails(id);
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Failed to get spell"));
			dispatch(changeIsError(true));
		} finally {
			setLoading(false);
		}
	};

	return {
		spellData,
		getSpellData,
		loading,
		getSpell,
	};
};

export default useGetSpellByIndex;
