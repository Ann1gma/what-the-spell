import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { characterCol } from "../services/firebaseConfig";
import { Character } from "../types/Character.types";

const useGetCharacter = (characterId: string | undefined) => {
	const [data, setData] = useState<Character | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const docRef = doc(characterCol, characterId);

		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			if (!snapshot.exists()) {
				setData(null);
				setError(true);
				setLoading(false);
				return;
			}

			const data = {
				...snapshot.data(),
				_id: snapshot.id,
			};

			setData(data);
			setLoading(false);
		});

		return unsubscribe;
	}, [characterId]);

	return {
		data,
		error,
		loading,
	};
};

export default useGetCharacter;
