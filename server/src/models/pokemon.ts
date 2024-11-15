export interface Pokemon {
    pokemonID: number;
    pokemonName: string;
    type1: string;
    type2?: string; // Optional
    total: number;
    hp: number;
    attack: number;
    defense: number;
    spAtk: number;
    spDef: number;
    speed: number;
    generation: number;
  }
  