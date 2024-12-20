import { Spellslot } from "@/types/Character.types";
import { useState } from "react";

const useCreateSpellslots = () => {
	const [spellslots, setSpellslots] = useState<Spellslot[]>([]);

	const updateSpellslots = (level: number, numOf: number) => {
		const spellslotsToKeep = spellslots.filter((slot) => slot.level !== level);

		const newSlots = [];

		for (let i = 0; i < numOf; i++) {
			const newId = Math.floor(Math.random() * 10000 * Date.now());
			newSlots.push({ _id: newId.toString(), level: level, used: false });
		}

		if (!newSlots) {
			setSpellslots([...spellslotsToKeep]);
		} else {
			setSpellslots([...spellslotsToKeep, ...newSlots]);
		}
	};

	const resetSepllslots = () => {
		setSpellslots([]);
	};

	return {
		updateSpellslots,
		resetSepllslots,
		spellslots,
	};
};

export default useCreateSpellslots;
