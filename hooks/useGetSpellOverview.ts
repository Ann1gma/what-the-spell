import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { getSpellsByClass, getSpellsByLevel } from "@/services/DnD5e_API";
import { SpellsOverview } from "@/types/DnD5e_API.types";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetSpellOverview = () => {
	const [loading, setLoading] = useState(true);
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

	const dispatch = useDispatch();

	//@CodeScene(disable:"Complex Method")
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
					dispatch(changeErrorMessage("Failed to get spells"));
					dispatch(changeIsError(true));
			}
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Failed to get spells"));
			dispatch(changeIsError(true));
		}
	};

	const fetchAllSpells = async () => {
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

		setLoading(true);

		setCantripsData(null);
		setLvlOneData(null);
		setLvlTwoData(null);
		setLvlThreeData(null);
		setLvlFourData(null);
		setLvlFiveData(null);
		setLvlSixData(null);
		setLvlSevenData(null);
		setLvlEightData(null);
		setLvlNineData(null);

		const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		try {
			await Promise.all(levels.map((level) => getAllSpellsByLevel(level)));
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Failed to get spells"));
			dispatch(changeIsError(true));
		} finally {
			setLoading(false);
		}
	};

	//@CodeScene(disable:"Complex Method")
	const getAllSpellsByClass = async (classIndex: string) => {
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

		setLoading(true);

		setCantripsData(null);
		setLvlOneData(null);
		setLvlTwoData(null);
		setLvlThreeData(null);
		setLvlFourData(null);
		setLvlFiveData(null);
		setLvlSixData(null);
		setLvlSevenData(null);
		setLvlEightData(null);
		setLvlNineData(null);

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
					dispatch(changeErrorMessage("Failed to get spells"));
					dispatch(changeIsError(true));
				}
			});
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Failed to get spells"));
			dispatch(changeIsError(true));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAllSpells();
	}, []);

	return {
		fetchAllSpells,
		getAllSpellsByClass,
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
		loading,
	};
};

export default useGetSpellOverview;
