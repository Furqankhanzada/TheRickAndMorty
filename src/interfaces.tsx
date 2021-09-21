export interface Characters {
  results: Character[];
  info: Info;
}
export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  location: Location;
  origin: Location;
  episode: Episode[];
}
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Characters[];
}
export interface Info {
  count: number;
  pages: number;
  next: number;
  prev: number;
}
export interface CharactersData {
  characters: Characters;
}
export interface CharactersFilter {
  name: string;
}
export interface CharactersVars {
  page: number;
  filter?: CharactersFilter;
}
