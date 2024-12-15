import { where, onSnapshot, query } from "firebase/firestore";
import { characterCol } from "../services/firebaseConfig";
import { useEffect, useState } from "react";
import { Character } from "../types/Character.types";
import { useDispatch } from "react-redux";
import { changeLoading } from "@/features/loading/loadingSlice";

const useGetCharacters = (uid = "") => {
	const dispatch = useDispatch();
	const [data, setData] = useState<Character[] | null>(null);

	useEffect(() => {
		if (!uid) return;
		dispatch(changeLoading(true));

		const characterQuery = query(characterCol, where("uid", "==", uid));

		const unsubscribe = onSnapshot(characterQuery, (snapshot) => {
			const data = snapshot.docs.map((doc) => {
				return {
					...doc.data(),
					_id: doc.id,
				};
			});

			setData(data);
			dispatch(changeLoading(false));
		});

		return unsubscribe;
	}, [uid]);

	return {
		data,
	};
};

export default useGetCharacters;
