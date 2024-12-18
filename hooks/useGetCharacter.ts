import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { characterCol } from "../services/firebaseConfig";
import { Character } from "../types/Character.types";

const useGetCharacter = (characterId: string | undefined) => {
	const [data, setData] = useState<Character | null>(null);
	const [characterDoc, setCharacterDoc] = useState<Character | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const getCharacterDoc = useCallback(
		async (characterId: string) => {
			setLoading(true);
			setError(false);

			try {
				const docRef = doc(characterCol, characterId);
				const snapshot = await getDoc(docRef);

				if (!snapshot.exists()) {
					setCharacterDoc(null);
					setError(true);
				} else {
					const data = {
						...snapshot.data(),
						_id: snapshot.id,
					} as Character;

					setCharacterDoc(data);
				}
			} catch (err) {
				console.error("Error fetching character:", err);
				setError(true);
			} finally {
				setLoading(false);
			}
		},
		[characterId]
	);

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
		characterDoc,
		getCharacterDoc,
	};
};

export default useGetCharacter;
