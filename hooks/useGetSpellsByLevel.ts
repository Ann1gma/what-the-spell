import { getSpellsByLevel } from "@/services/DnD5e_API";
import { SpellsOverview } from "@/types/DnD5e_API.types";
import { useEffect, useState } from "react";

const useGetSpellsByLevel = () => {
	const [cantripsData, setCantripsData] = useState<SpellsOverview[] | null>(null);
	const [lvlOneData, setLvlOneData] = useState<SpellsOverview[] | null>(null);
	const [lvlTwoData, setLvlTwoData] = useState<SpellsOverview[] | null>(null);
	const [lvlThreeData, setLvlThreeData] = useState<SpellsOverview[] | null>(null);
	const [lvlFourData, setLvlFourData] = useState<SpellsOverview[] | null>(null);
	const [lvlFiveData, setLvlFiveData] = useState<SpellsOverview[] | null>(null);
	const [lvlSixData, setLvlSixData] = useState<SpellsOverview[] | null>(null);
	const [lvlSevenData, setLvlSevenData] = useState<SpellsOverview[] | null>(null);
	const [lvlEightData, setLvlEightData] = useState<SpellsOverview[] | null>(null);
	const [lvlNineData, setLvlNineData] = useState<SpellsOverview[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getAllSpellsByLevel = async (level: number) => {
		try {
			const data = await getSpellsByLevel(level);
			switch (level) {
				case 0:
					setCantripsData(data);
					break;
				case 1:
					setLvlOneData(data);
					break;
				case 2:
					setLvlTwoData(data);
					break;
				case 3:
					setLvlThreeData(data);
					break;
				case 4:
					setLvlFourData(data);
					break;
				case 5:
					setLvlFiveData(data);
					break;
				case 6:
					setLvlSixData(data);
					break;
				case 7:
					setLvlSevenData(data);
					break;
				case 8:
					setLvlEightData(data);
					break;
				case 9:
					setLvlNineData(data);
					break;
				default:
					setIsError(true);
					setError("Invalid level");
			}
		} catch (err) {
			setError((err as Error).message);
		}
	};

	const fetchAllSpells = async () => {
		setIsLoading(true);
		setIsError(false);
		setError(null);

		const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		try {
			await Promise.all(levels.map((level) => getAllSpellsByLevel(level)));
		} catch (err) {
			setIsError(true);
			setError("Failed to fetch all spells.");
		} finally {
			setIsLoading(false);
		}
	};

	/* ev. combine to one hook instead of two
	 const getAllSpellsByClass = async (classIndex: string) => {
		setIsLoading(true);
		setIsError(false);
		setError(null);
		try {
			const data = await getSpellsByClass(classIndex);

			data.map((spell) => {
				if (spell.level === 0) {
					setCantripsData((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 1) {
					setLvlOneData((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 2) {
					setLvlTwoData((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 3) {
					setLvlThreeData((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 4) {
					setLvlFourData((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 5) {
					setLvlFiveData((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 6) {
					setLvlSixData((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 7) {
					setLvlSevenData((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 8) {
					setLvlEightData((previousState) => [...(previousState || []), spell]);
				} else if (spell.level === 9) {
					setLvlNineData((previousState) => [...(previousState || []), spell]);
				} else {
					setIsError(true);
					setError("Invalid level");
				}
			});
		} catch (err) {
			setIsError(true);
			setError("Failed to fetch all spells.");
		} finally {
			setIsLoading(false);
		}
	}; */

	useEffect(() => {
		fetchAllSpells();
	}, []);

	return {
		getAllSpellsByLevel,
		cantripsData,
		lvlOneData,
		lvlTwoData,
		lvlThreeData,
		lvlFourData,
		lvlFiveData,
		lvlSixData,
		lvlSevenData,
		lvlEightData,
		lvlNineData,
		error,
		isError,
		isLoading,
	};
};

export default useGetSpellsByLevel;
