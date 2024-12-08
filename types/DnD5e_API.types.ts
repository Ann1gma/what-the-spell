export interface OrderObject {
	by: "NAME" | "LEVEL";
	direction: "ASCENDING" | "DESCENDING";
}

interface DamageTypeObject {
	damage_type: {
		name: string;
	};
}

interface DamageAtSlotLevelObject {
	level: number;
	damage: string;
}

interface DamageObject {
	damage_at_slot_level: DamageAtSlotLevelObject[];
	damage_type: {
		name: string;
		desc: string[];
	};
}

interface HealingObject {
	healing: string;
}

interface HealAtSlotLevelObject {
	level: number;
	healing: string;
}

interface ClassObject {
	name: string;
}

interface TypeObject {
	full_name: string;
	name: string;
}

export interface SpellDetailsClassObject {
	index: string;
	name: string;
}

interface AreaOfEffect {
	type: "CONE" | "CUBE" | "LINE" | "SPHERE";
	size: number;
}

interface DcObject {
	success: "HALF" | "NONE" | "OTHER";
	desc: string | null;
	type: TypeObject;
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

export interface SpellDetails {
	index: string;
	attack_type: "MELEE" | "RANGED" | null;
	casting_time: string;
	components: string[];
	concentration: boolean;
	desc: string[];
	duration: string;
	higher_level: string[];
	level: number;
	material: string | null;
	name: string;
	range: string;
	ritual: boolean;
	area_of_effect: AreaOfEffect | null;
	classes: SpellDetailsClassObject[];
	damage: DamageObject | null;
	dc: DcObject | null;
	heal_at_slot_level: HealAtSlotLevelObject[] | null;
}
