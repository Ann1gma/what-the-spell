import { ClassObject } from "./DnD5e_API.types";

export interface Spellslot {
	_id: string;
	level: number;
	used: boolean;
}

export interface CharacterSpell {
	attack_type: "MELEE" | "RANGED" | null;
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
	class: ClassObject;
	spell_attack_modifier: number | null;
	spell_save_dc: number | null;
	show_prepared_spells: boolean;
	show_spellslots: boolean;
	spellslots: Spellslot[] | null;
	known_spells: CharacterSpell[] | null;
	prepared_spells: CharacterSpell[] | null;
}

export interface NewCharacter {
	uid: string;
	character_level: number;
	character_name: string;
	class: ClassObject;
	spell_attack_modifier: number | null;
	spell_save_dc: number | null;
	show_prepared_spells: boolean;
	show_spellslots: boolean;
	spellslots: Spellslot[] | null;
}

export interface UpdateCharacterData {
	character_level: number;
	character_name: string;
	class: ClassObject;
	spell_attack_modifier: number | null;
	spell_save_dc: number | null;
	show_prepared_spells: boolean;
	show_spellslots: boolean;
	spellslots: Spellslot[] | null;
}

export interface EditCharacterData {
	_id: string | null;
	uid: string | null;
	character_level: number | null;
	character_name: string | null;
	class: ClassObject | null;
	spell_attack_modifier: number | null;
	spell_save_dc: number | null;
	show_prepared_spells: boolean | null;
	show_spellslots: boolean | null;
	spellslots: Spellslot[] | null;
}

export interface AddSpellType {
	index: string;
	level: number | null;
}

export interface CharacterKnowsSpells {
	character_name: string;
	knowsSpell: boolean;
}
