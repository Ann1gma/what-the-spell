import { getSpellsByClass } from "@/services/DnD5e_API";
import { SpellsOverview } from "@/types/DnD5e_API.types";
import { useState } from "react";

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

		setCantripsDataClass(null);
		setLvlOneDataClass(null);
		setLvlTwoDataClass(null);
		setLvlThreeDataClass(null);
		setLvlFourDataClass(null);
		setLvlFiveDataClass(null);
		setLvlSixDataClass(null);
		setLvlSevenDataClass(null);
		setLvlEightDataClass(null);
		setLvlNineDataClass(null);

		try {
			const data = await getSpellsByClass(classIndex);

			data.map((spell) => {
				if (spell.level === 0) {
					setCantripsDataClass((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 1) {
					setLvlOneDataClass((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 2) {
					setLvlTwoDataClass((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 3) {
					setLvlThreeDataClass((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 4) {
					setLvlFourDataClass((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 5) {
					setLvlFiveDataClass((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 6) {
					setLvlSixDataClass((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 7) {
					setLvlSevenDataClass((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 8) {
					setLvlEightDataClass((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 9) {
					setLvlNineDataClass((previousState) => [...(previousState || []), spell]);
				} else {
					setIsClassError(true);
					setClassError("Invalid level");
				}
			});
		} catch (err) {
			setIsClassError(true);
			setClassError("Failed to fetch all spells.");
		} finally {
			setClassIsLoading(false);
		}
	};

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
