interface Spellslot {
	level: number;
	used: boolean;
}

interface CharacterSpell {
	attack_type: string | null;
	concentration: boolean;
	damage: boolean;
	healing: boolean;
	index: string;
	level: number;
	name: string;
	ritual: boolean;
	school: string;
}

export interface Character {
	_id: string;
	uid: string;
	character_level: number;
	character_name: string;
	class_name: string;
	spell_attack_modifier: number | null;
	spell_save_dc: number | null;
	show_prepared_spells: boolean;
	show_spellslots: boolean;
	spellslots: Spellslot[];
	known_spells: CharacterSpell[] | null;
	prepared_spells: CharacterSpell[] | null;
}

export type NewCharacter = Omit<Character, "_id">;
