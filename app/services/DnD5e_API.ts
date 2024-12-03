import axios from "axios";
import { SpellsByClassOverview, SpellsByLevelOverview } from "../types/DnD5e_API.types";

const instance = axios.create({
	baseURL: "https://www.dnd5eapi.co/graphql",
	timeout: 10000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

interface GetSpellsByLevelResponse {
	data: {
		spells: SpellsByLevelOverview[];
	};
}

export const getSpellsByLevel = async (
	by: "NAME" | "LEVEL",
	direction: "ASCENDING" | "DESCENDING",
	level: number
): Promise<SpellsByLevelOverview[]> => {
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
      }
    }
  `;

	const response = await instance.post<GetSpellsByLevelResponse>("", {
		query,
	});
	return response.data.data.spells;
};

interface GetSpellsByClassResponse {
	data: {
		spells: SpellsByClassOverview[];
	};
}

type ClassNames = "barbarian" | "bard" | "cleric" | "druid" | "fighter" | "monk" | "paladin" | "ranger" | "rogue" | "sorcerer" | "warlock" | "wizard";

export const getSpellsByClass = async (className: ClassNames): Promise<SpellsByClassOverview[]> => {
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
}
  `;

	const response = await instance.post<GetSpellsByClassResponse>("", {
		query,
	});
	return response.data.data.spells;
};
