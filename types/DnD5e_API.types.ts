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

export interface ClassObject {
	index: string;
	name: string;
}

interface TypeObject {
	full_name: string;
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

export interface SpellsOverview {
	index: string;
	name: string;
	level: number;
	ritual: boolean;
	concentration: boolean;
	school: {
		name: string;
	};
	damage: DamageTypeObject | null;
	heal_at_slot_level: HealingObject[] | null;
	attack_type: "MELEE" | "RANGED" | null;
	classes: ClassObject[] | null;
}

export interface SpellDetails {
	index: string;
	attack_type: "MELEE" | "RANGED" | null;
	casting_time: string;
	components: string[];
	concentration: boolean;
	desc: string[];
	duration: string;
	higher_level: string[] | null;
	level: number;
	material: string | null;
	name: string;
	range: string;
	ritual: boolean;
	area_of_effect: AreaOfEffect | null;
	classes: ClassObject[];
	damage: DamageObject | null;
	dc: DcObject | null;
	heal_at_slot_level: HealAtSlotLevelObject[] | null;
	school: {
		name: string;
	};
}
