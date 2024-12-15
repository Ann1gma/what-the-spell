import { changeLoading } from "@/features/loading/loadingSlice";
import { changeIsError, changeErrorMessage } from "@/features/error/errorSlice";
import { getAllClasses } from "@/services/DnD5e_API";
import { ClassObject } from "@/types/DnD5e_API.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllClasses = (initialOptions: ClassObject[]) => {
	const dispatch = useDispatch();
	const [options, setOptions] = useState<ClassObject[]>(initialOptions);

	const getClasses = async () => {
		dispatch(changeErrorMessage(""));
		dispatch(changeIsError(false));
		dispatch(changeLoading(true));

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
			dispatch(changeErrorMessage((err as Error).message));
			dispatch(changeIsError(true));
		} finally {
			dispatch(changeLoading(false));
		}
	};

	useEffect(() => {
		getClasses();
	}, []);

	return {
		options,
	};
};

export default useGetAllClasses;
