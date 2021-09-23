import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { Character } from "../../interfaces";
import { CharacterListScreenNavigationProp } from "../navigation/AppStack";

interface CharacterListItemProps {
  character: Character;
  navigation: CharacterListScreenNavigationProp;
}

export const CharacterListItem: React.FC<CharacterListItemProps> = React.memo(({ character, navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("CharacterDetails", {
      id: character.id,
    });
  };
  return (
    <ListItem key={character.id} bottomDivider onPress={handleNavigation}>
      <Avatar rounded source={{ uri: character.image }} />
      <ListItem.Content>
        <ListItem.Title>{character.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
});
