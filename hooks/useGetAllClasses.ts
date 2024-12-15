import { changeLoading } from "@/features/loading/loadingSlice";
import { getAllClasses } from "@/services/DnD5e_API";
import { ClassObject } from "@/types/DnD5e_API.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllClasses = (initialOptions: ClassObject[]) => {
	const dispatch = useDispatch();
	const [options, setOptions] = useState<ClassObject[]>(initialOptions);
	const [error, setError] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);

	const getClasses = async () => {
		setError(null);
		setIsError(false);
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
			setError((err as Error).message);
		} finally {
			dispatch(changeLoading(false));
		}
	};

	useEffect(() => {
		getClasses();
	}, []);

	return {
		options,
		error,
		isError,
	};
};

export default useGetAllClasses;
