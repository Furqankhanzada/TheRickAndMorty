import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { Character } from "../../interfaces";

interface CharacterListItemProps {
  character: Character;
}

export const CharacterListItem: React.FC<CharacterListItemProps> = React.memo(({ character }) => {
  return (
    <ListItem key={character.id} bottomDivider>
      <Avatar rounded source={{ uri: character.image }} />
      <ListItem.Content>
        <ListItem.Title>{character.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
});
