import { Spellslot } from "@/types/Character.types";
import { useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const useCreateSpellslots = () => {
	const [spellslots, setSpellslots] = useState<Spellslot[]>([]);

	const createSpellslots = (level: number, numOf: number) => {
		const spellslotsToKeep = spellslots.filter((slot) => slot.level !== level);

		const newSlots = [];

		for (let i = 0; i < numOf; i++) {
			const uniqueId = uuidv4();

			newSlots.push({ _id: uniqueId, level: level, used: false });
		}

		if (newSlots.length <= 0) {
			return;
		} else {
			setSpellslots([...spellslotsToKeep, ...newSlots]);
		}
	};

	const setInitialSpellslots = (initialSpellslots: Spellslot[]) => {
		setSpellslots([...initialSpellslots]);
	};

	const resetSepllslots = () => {
		setSpellslots([]);
	};

	return {
		createSpellslots,
		resetSepllslots,
		setInitialSpellslots,
		spellslots,
	};
};

export default useCreateSpellslots;
