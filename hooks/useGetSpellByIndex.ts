import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { changeLoading } from "@/features/loading/loadingSlice";
import { getSpellDetails } from "@/services/DnD5e_API";
import { SpellDetails } from "@/types/DnD5e_API.types";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useGetSpellByIndex = () => {
	const [spellData, setSpellData] = useState<SpellDetails | null>(null);

	const dispatch = useDispatch();

	const getSpellData = async (id: string) => {
		dispatch(changeLoading(true));
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

		try {
			const data = await getSpellDetails(id);
			setSpellData(data);
		} catch (err) {
			dispatch(changeErrorMessage("Failed to fetch all spells."));
			dispatch(changeIsError(true));
		} finally {
			dispatch(changeLoading(false));
		}
	};

	return {
		spellData,
		getSpellData,
	};
};

export default useGetSpellByIndex;
