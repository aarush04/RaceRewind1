import { Pokemon } from "../models/pokemon";
import { PokemonSpawn } from "../models/pokemonSpawn";
import pool from './connection';
import { RowDataPacket } from "mysql2";

export async function getAllPokemon(): Promise<Pokemon[]> {
  const [rows] = await pool.query('SELECT * FROM pokemon.pokemon LIMIT 20;');
  return rows as Pokemon[];
}

export async function getPokemonByPokemonName(pokemonName: string): Promise<Pokemon[]> {
  const queryName = pokemonName.toLowerCase();
  const sqlQuery = `SELECT * FROM pokemon.pokemon WHERE pokemonName LIKE '%${queryName}%';`;
  const [rows] = await pool.query(sqlQuery);
  return rows as Pokemon[];
}

export async function getPokemonByID(pokemonID: number): Promise<Pokemon | undefined> {
  const sqlQuery = `SELECT * FROM pokemon WHERE pokemonID = ${pokemonID};`;
  const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
  return rows[0] as Pokemon;
}

export async function getAllPokemonSpawns(): Promise<PokemonSpawn[]> {
  const [rows] = await pool.query('SELECT * FROM pokemon.pokemon_spawn LIMIT 10;');
  return rows as PokemonSpawn[];  
}

export async function getPokemonSpawnBySpawnID(spawnID: number): Promise<PokemonSpawn | undefined> {
  const sqlQuery = `SELECT * FROM pokemon_spawn WHERE spawnID = ${spawnID};`;
  const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
  return rows[0] as PokemonSpawn;
}

export async function getPokemonSpawnByPokemonID(pokemonID: number): Promise<PokemonSpawn[]> {
  const sqlQuery = `SELECT * FROM pokemon_spawn WHERE pokemonID = ${pokemonID} order by encounter_ms desc limit 10;`;
  const [rows] = await pool.query(sqlQuery);
  return rows as PokemonSpawn[];
}

export async function addPokemonSpawn(spawn: Omit<PokemonSpawn, 'spawnID'>): Promise<void> {
  const sqlQuery = `INSERT INTO pokemon_spawn (pokemonID, pokemonName, lat, lng, encounter_ms, disappear_ms) VALUES (${spawn.num}, '${spawn.name}', ${spawn.lat}, ${spawn.lng}, ${spawn.encounter_ms}, ${spawn.disappear_ms});`;
  await pool.query(sqlQuery);
}

export async function updatePokemonSpawn(spawn: PokemonSpawn): Promise<void> {
  const sqlQuery = `UPDATE pokemon_spawn SET pokemonID = ${spawn.num}, pokemonName = '${spawn.name}', lat = ${spawn.lat}, lng = ${spawn.lng}, encounter_ms = ${spawn.encounter_ms}, disappear_ms = ${spawn.disappear_ms} WHERE spawnID = ${spawn.spawnID};`;
  await pool.query(sqlQuery);
}

export async function deletePokemonSpawnbyID(spawnID: number): Promise<void> {
  const sqlQuery = `DELETE FROM pokemon_spawn WHERE spawnID = ${spawnID};`;
  await pool.query(sqlQuery);
}