import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { characterCol } from "../services/firebaseConfig";
import { Character } from "../types/Character.types";
import { useDispatch } from "react-redux";
import { changeErrorMessage, changeIsError } from "@/features/error/errorSlice";
import { FirebaseError } from "firebase/app";

const useGetCharacter = (characterId: string | undefined) => {
	const [data, setData] = useState<Character | null>(null);
	const [characterDoc, setCharacterDoc] = useState<Character | null>(null);
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	const getCharacterDoc = useCallback(
		async (characterId: string) => {
			setLoading(true);

			dispatch(changeErrorMessage(""));
			dispatch(changeIsError(false));

			try {
				const docRef = doc(characterCol, characterId);
				const snapshot = await getDoc(docRef);

				if (!snapshot.exists()) {
					setCharacterDoc(null);
					dispatch(changeErrorMessage("Could not find the dokument"));
					dispatch(changeIsError(true));
				} else {
					const data = {
						...snapshot.data(),
						_id: snapshot.id,
					} as Character;

					setCharacterDoc(data);
				}
			} catch (err) {
				if (err instanceof FirebaseError) {
					dispatch(changeErrorMessage(err.message));
					dispatch(changeIsError(true));
				} else if (err instanceof Error) {
					dispatch(changeErrorMessage(err.message));
					dispatch(changeIsError(true));
				}

				dispatch(changeErrorMessage("Failed to get character"));
				dispatch(changeIsError(true));
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
				dispatch(changeErrorMessage("Could not find the dokument"));
				dispatch(changeIsError(true));
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
		loading,
		characterDoc,
		getCharacterDoc,
	};
};

export default useGetCharacter;
