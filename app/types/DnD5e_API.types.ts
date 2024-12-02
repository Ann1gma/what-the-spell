export interface OrderObject {
	by: "NAME" | "LEVEL";
	direction: "ASCENDING" | "DESCENDING";
}

interface DamageTypeObject {
	damage_type: {
		name: string;
	};
}

interface HealingObject {
	healing: string;
}

export interface SpellsOverview {
	index: string;
	name: string;
	level: number;
	ritual: boolean;
	concentration: boolean;
	school: {
		name: "Abjuration" | "Conjuration" | "Divination" | "Enchantment" | "Evocation" | "Illusion" | "Necromancy" | "Transmutation";
	};
	damage: DamageTypeObject | null;
	heal_at_slot_level: HealingObject[] | null;
	attack_type: "MELEE" | "RANGED" | null;
}
