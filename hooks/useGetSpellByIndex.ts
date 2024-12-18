import { getSpellDetails } from "@/services/DnD5e_API";
import { SpellDetails } from "@/types/DnD5e_API.types";
import { useState } from "react";

const useGetSpellByIndex = () => {
	const [spellData, setSpellData] = useState<SpellDetails | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const getSpellData = async (id: string) => {
		try {
			const data = await getSpellDetails(id);
			setSpellData(data);
		} catch (err) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	const getSpell = async (id: string) => {
		try {
			return await getSpellDetails(id);
		} catch (err) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	return {
		spellData,
		getSpellData,
		error,
		loading,
		getSpell,
	};
};

export default useGetSpellByIndex;
