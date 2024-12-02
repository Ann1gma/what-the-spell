import axios from "axios";
import { SpellsOverview } from "../types/DnD5e_API.types";

const instance = axios.create({
	baseURL: "https://www.dnd5eapi.co/graphql",
	timeout: 10000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

interface GetSpellsResponse {
	data: {
		spells: SpellsOverview[];
	};
}

const getSpells = async (by: "NAME" | "LEVEL", direction: "ASCENDING" | "DESCENDING", level: number): Promise<SpellsOverview[]> => {
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

	const response = await instance.post<GetSpellsResponse>("", {
		query,
	});
	return response.data.data.spells;
};

export default getSpells;
