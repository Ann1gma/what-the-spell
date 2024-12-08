import axios from "axios";
import { SpellsOverview, SpellDetails, ClassObject } from "../types/DnD5e_API.types";

const instance = axios.create({
	baseURL: "https://www.dnd5eapi.co/graphql",
	timeout: 10000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

/**
 * Get an overview of all spells of a certain level.
 * Determine the order using:
 * @param by
 * @param direction
 * @param level
 */
interface GetSpellsByLevelResponse {
	data: {
		spells: SpellsOverview[];
	};
}

export const getSpellsByLevel = async (by: "NAME" | "LEVEL", direction: "ASCENDING" | "DESCENDING", level: number): Promise<SpellsOverview[]> => {
	const query = `
		query Spells {
		spells(order: { by: ${by}, direction: ${direction} }, level: ${level}) {
			index
			name
			level
			ritual
			concentration
			school {
			name
			}
			damage {
			damage_type {
				name
			}
			}
			heal_at_slot_level {
			healing
			}
			attack_type
			classes {
				name
			}
		}
    }`;

	const response = await instance.post<GetSpellsByLevelResponse>("", {
		query,
	});
	return response.data.data.spells;
};

/**
 * Get overview of all spells for a class.
 * @param className
 */
interface GetSpellsByClassResponse {
	data: {
		spells: SpellsOverview[];
	};
}

export const getSpellsByClass = async (className: string): Promise<SpellsOverview[]> => {
	const query = `
		query Spells {
		spells(
			class: "${className}"
			order: {
				by: LEVEL
				direction: ASCENDING
				then_by: { by: NAME, direction: ASCENDING }
			}
		) {
			index
			attack_type
			concentration
			level
			name
			ritual
			damage {
				damage_type {
					name
				}
			}
			heal_at_slot_level {
				healing
			}
			school {
				name
			}
			classes {
				name
			}
		}
	}`;

	const response = await instance.post<GetSpellsByClassResponse>("", {
		query,
	});
	return response.data.data.spells;
};

/**
 * Get details about a single spell.
 * @param spellIndex
 */
interface GetSpellDetailsResponse {
	data: {
		spell: SpellDetails;
	};
}

export const getSpellDetails = async (spellIndex: string): Promise<SpellDetails> => {
	const query = `
		query Spell {
		spell(index: "${spellIndex}") {
			index
			attack_type
			casting_time
			components
			concentration
			desc
			duration
			higher_level
			level
			material
			name
			range
			ritual
			area_of_effect {
				type
				size
			}
			classes {
				index
				name
			}
			damage {
				damage_at_slot_level {
					level
					damage
				}
				damage_type {
					name
					desc
				}
			}
			dc {
				success
				desc
				type {
					full_name
					name
				}
			}
			heal_at_slot_level {
				level
				healing
			}
		}
	}`;

	const response = await instance.post<GetSpellDetailsResponse>("", {
		query,
	});
	return response.data.data.spell;
};

/**
 * Get all classes.
 */
interface GetAllClassesResponse {
	data: {
		classes: ClassObject[];
	};
}

export const getAllClasses = async (by = "NAME", direction = "ASCENDING"): Promise<ClassObject[]> => {
	const query = `
		query Classes{
			classes(order: { by: ${by}, direction: ${direction} }) {
    			index
    			name
			}
		}`;

	const response = await instance.post<GetAllClassesResponse>("", {
		query,
	});
	return response.data.data.classes;
};
