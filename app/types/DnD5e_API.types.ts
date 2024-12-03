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

interface ClassObject {
	name: string;
}

export interface SpellsByLevelOverview {
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

export interface SpellsByClassOverview {
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
	classes: ClassObject[];
}
