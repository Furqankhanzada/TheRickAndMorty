import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query getCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query getCharacters($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      gender
      episode {
        id
        name
        air_date
      }
    }
  }
`;
