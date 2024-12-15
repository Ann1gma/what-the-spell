import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { changeLoading } from "@/features/loading/loadingSlice";
import { getSpellsByClass } from "@/services/DnD5e_API";
import { SpellsOverview } from "@/types/DnD5e_API.types";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useGetSpellsByClass = () => {
	const dispatch = useDispatch();
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

	const getAllSpellsByClass = async (classIndex: string) => {
		dispatch(changeLoading(true));
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

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
					dispatch(changeErrorMessage("Invalid level"));
					dispatch(changeIsError(true));
				}
			});
		} catch (err) {
			dispatch(changeErrorMessage("Failed to fetch all spells."));
			dispatch(changeIsError(true));
		} finally {
			dispatch(changeLoading(false));
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
	};
};

export default useGetSpellsByClass;
