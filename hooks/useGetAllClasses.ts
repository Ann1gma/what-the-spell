import { getAllClasses } from "@/services/DnD5e_API";
import { ClassObject } from "@/types/DnD5e_API.types";
import { useEffect, useState } from "react";

const useGetAllClasses = (initialOptions: ClassObject[]) => {
	const [options, setOptions] = useState<ClassObject[]>(initialOptions);
	const [error, setError] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getClasses = async () => {
		setError(null);
		setIsError(false);
		setIsLoading(true);
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
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getClasses();
	}, []);

	return {
		options,
		error,
		isError,
		isLoading,
	};
};

export default useGetAllClasses;
