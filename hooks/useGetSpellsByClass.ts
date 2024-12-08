import { getSpellsByClass, getSpellsByLevel } from "@/services/DnD5e_API";
import { SpellsOverview } from "@/types/DnD5e_API.types";
import { useEffect, useState } from "react";

const useGetSpellsByClass = () => {
	const [cantripsDataClass, setCantripsDataClass] = useState<SpellsOverview[] | null>(null);
	const [lvlOneDataClass, setLvlOneDataClass] = useState<SpellsOverview[] | null>(null);
	const [lvlTwoDataClass, setLvlTwoDataClass] = useState<SpellsOverview[] | null>(null);
	const [lvlThreeDataClass, setLvlThreeDataClass] = useState<SpellsOverview[] | null>(null);
	const [lvlFourDataClass, setLvlFourDataClass] = useState<SpellsOverview[] | null>(null);
	const [lvlFiveDataClass, setLvlFiveDataClass] = useState<SpellsOverview[] | null>(null);
	const [lvlSixDataClass, setLvlSixDataClass] = useState<SpellsOverview[] | null>(null);
	const [lvlSevenDataClass, setLvlSevenDataClass] = useState<SpellsOverview[] | null>(null);
	const [lvlEightDataClass, setLvlEightDataClass] = useState<SpellsOverview[] | null>(null);
	const [lvlNineDataClass, setLvlNineDataClass] = useState<SpellsOverview[] | null>(null);
	const [classError, setClassError] = useState<string | null>(null);
	const [isClassError, setIsClassError] = useState(false);
	const [classIsLoading, setClassIsLoading] = useState(false);

	const getAllSpellsByClass = async (classIndex: string) => {
		setClassIsLoading(true);
		setIsClassError(false);
		setClassError(null);
		try {
			const data = await getSpellsByClass(classIndex);
		} catch (err) {
			setIsClassError(true);
			setClassError("Failed to fetch all spells.");
		} finally {
			setClassIsLoading(false);
		}
	};

	useEffect(() => {}, []);

	return {
		getAllSpellsByClass,
		cantripsDataClass,
		lvlOneDataClass,
		lvlTwoDataClass,
		lvlThreeDataClass,
		lvlFourDataClass,
		lvlFiveDataClass,
		lvlSixDataClass,
		lvlSevenDataClass,
		lvlEightDataClass,
		lvlNineDataClass,
		classError,
		isClassError,
		classIsLoading,
	};
};

export default useGetSpellsByClass;
