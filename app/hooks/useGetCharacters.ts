import { where, onSnapshot, query } from "firebase/firestore";
import { characterCol } from "../services/firebaseConfig";
import { useEffect, useState } from "react";
import { Character } from "../types/Character.types";

const useGetCharacters = (uid = "Kc4xQUGxNmOMijR1jSeEvIL2qhR2") => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Character[] | null>(null);

	useEffect(() => {
		if (!uid) return;

		const characterQuery = query(characterCol, where("uid", "==", uid));

		const unsubscribe = onSnapshot(characterQuery, (snapshot) => {
			console.log("📸 Got a snapshot!");

			const data = snapshot.docs.map((doc) => {
				return {
					...doc.data(),
					_id: doc.id,
				};
			});

			setData(data);
			setLoading(false);
		});

		return unsubscribe;
	}, [uid]);

	return {
		data,
		loading,
	};
};

export default useGetCharacters;
