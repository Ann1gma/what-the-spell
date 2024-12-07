import { getSpellsByLevel } from "@/services/DnD5e_API";
import { SpellsByLevelOverview } from "@/types/DnD5e_API.types";
import { useEffect, useState } from "react";

const useGetSpellsByLevel = () => {
	const [cantripsData, setCantripsData] = useState<SpellsByLevelOverview[] | null>(null);
	const [lvlOneData, setLvlOneData] = useState<SpellsByLevelOverview[] | null>(null);
	const [lvlTwoData, setLvlTwoData] = useState<SpellsByLevelOverview[] | null>(null);
	const [lvlThreeData, setLvlThreeData] = useState<SpellsByLevelOverview[] | null>(null);
	const [lvlFourData, setLvlFourData] = useState<SpellsByLevelOverview[] | null>(null);
	const [lvlFiveData, setLvlFiveData] = useState<SpellsByLevelOverview[] | null>(null);
	const [lvlSixData, setLvlSixData] = useState<SpellsByLevelOverview[] | null>(null);
	const [lvlSevenData, setLvlSevenData] = useState<SpellsByLevelOverview[] | null>(null);
	const [lvlEightData, setLvlEightData] = useState<SpellsByLevelOverview[] | null>(null);
	const [lvlNineData, setLvlNineData] = useState<SpellsByLevelOverview[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getAllSpellsByLevel = async (level: number) => {
		try {
			const data = await getSpellsByLevel("NAME", "ASCENDING", level);
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
