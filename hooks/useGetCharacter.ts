import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { characterCol } from "../services/firebaseConfig";
import { Character } from "../types/Character.types";
import { useDispatch } from "react-redux";
import { changeLoading } from "@/features/loading/loadingSlice";

const useGetCharacter = (characterId: string | undefined) => {
	const dispatch = useDispatch();
	const [data, setData] = useState<Character | null>(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		dispatch(changeLoading(true));

		const docRef = doc(characterCol, characterId);

		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			if (!snapshot.exists()) {
				setData(null);
				setError(true);
				dispatch(changeLoading(false));
				return;
			}

			const data = {
				...snapshot.data(),
				_id: snapshot.id,
			};

			setData(data);
			dispatch(changeLoading(false));
		});

		return unsubscribe;
	}, [characterId]);

	return {
		data,
		error,
	};
};

export default useGetCharacter;
