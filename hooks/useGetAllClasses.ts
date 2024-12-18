import { getAllClasses } from "@/services/DnD5e_API";
import { ClassObject } from "@/types/DnD5e_API.types";
import { useEffect, useState } from "react";

const useGetAllClasses = (initialOptions: ClassObject[]) => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [options, setOptions] = useState<ClassObject[]>(initialOptions);

	const getClasses = async () => {
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
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getClasses();
	}, []);

	return {
		options,
		error,
		loading,
	};
};

export default useGetAllClasses;
