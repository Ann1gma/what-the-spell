import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { getAllClasses } from "@/services/DnD5e_API";
import { ClassObject } from "@/types/DnD5e_API.types";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllClasses = (initialOptions: ClassObject[]) => {
	const [loading, setLoading] = useState(true);
	const [options, setOptions] = useState<ClassObject[]>(initialOptions);

	const dispatch = useDispatch();

	const getClasses = async () => {
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));

		try {
			const data = await getAllClasses();

			if (initialOptions.length > 0) {
				const filteredList = data.filter(
					(item) => item.index !== "barbarian" && item.index !== "fighter" && item.index !== "monk" && item.index !== "rogue"
				);
				setOptions((prevOptions) => [...prevOptions, ...filteredList]);
			} else {
				setOptions(data);
			}
		} catch (err) {
			if (err instanceof FirebaseError) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			} else if (err instanceof Error) {
				dispatch(changeErrorMessage(err.message));
				dispatch(changeIsError(true));
			}

			dispatch(changeErrorMessage("Failed to get classes"));
			dispatch(changeIsError(true));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getClasses();
	}, []);

	return {
		options,
		loading,
	};
};

export default useGetAllClasses;
