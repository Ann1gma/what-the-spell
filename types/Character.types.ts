export interface Spellslot {
	_id: string;
	level: number;
	used: boolean;
}

export interface CharacterSpell {
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

export interface CharacterSpells {
	cantrips: CharacterSpell[] | null;
	lvl_one: CharacterSpell[] | null;
	lvl_two: CharacterSpell[] | null;
	lvl_three: CharacterSpell[] | null;
	lvl_four: CharacterSpell[] | null;
	lvl_five: CharacterSpell[] | null;
	lvl_six: CharacterSpell[] | null;
	lvl_seven: CharacterSpell[] | null;
	lvl_eight: CharacterSpell[] | null;
	lvl_nine: CharacterSpell[] | null;
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
	spellslots: Spellslot[] | null;
	known_spells: CharacterSpells | null;
	prepared_spells: CharacterSpells | null;
}

export interface NewCharacter {
	uid: string;
	character_level: number;
	character_name: string;
	class_name: string;
	spell_attack_modifier: number | null;
	spell_save_dc: number | null;
	show_prepared_spells: boolean;
	show_spellslots: boolean;
	spellslots: Spellslot[] | null;
}
