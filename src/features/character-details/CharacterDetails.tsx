import * as React from "react";
import { View, StyleSheet, ActivityIndicator, Text, FlatList } from "react-native";
import { Card, Avatar, Chip, ListItem } from "react-native-elements";
import { useQuery } from "@apollo/client";
import { CharacterData, CharacterVars, Episode } from "../../interfaces";
import { GET_CHARACTER } from "../../requests/characters";
import { CharacterDetailsScreenNavigationProp, CharacterDetailsScreenRouteProp } from "../navigation/AppStack";

interface CharacterDetailsProps {
  route: CharacterDetailsScreenRouteProp;
  navigation: CharacterDetailsScreenNavigationProp;
}

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ route }) => {
  const { id } = route.params;
  const {
    loading,
    error,
    data: { character } = {},
  } = useQuery<CharacterData, CharacterVars>(GET_CHARACTER, { variables: { id } });

  // Show Loading until data load
  if (loading) {
    return (
      <View testID="loading" style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Show error on screen
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.textCenter}>Error! ${error.message}</Text>
      </View>
    );
  }

  // Character List Item
  const renderItem = ({ item: episode }: { item: Episode }) => {
    return (
      <ListItem key={episode.id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{episode.name}</ListItem.Title>
          <ListItem.Subtitle>{episode.air_date}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <FlatList
      testID="flat-list"
      contentContainerStyle={styles.contentContainer}
      data={character?.episode}
      ListHeaderComponent={
        <View style={styles.header}>
          <Avatar
            containerStyle={styles.avatar}
            rounded
            title={character?.name}
            size="large"
            source={{
              uri: character?.image,
            }}
          />
          <Card.Title>{character?.name}</Card.Title>
          <Card.Divider />
          <View style={styles.chips}>
            <Chip title={character?.species} />
            <Chip title={character?.gender} />
          </View>
        </View>
      }
      stickyHeaderIndices={[0]}
      renderItem={renderItem}
      keyExtractor={(item: Episode) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#e3e3e3",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  contentContainer: {
    flexGrow: 1,
  },
  chips: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    alignSelf: "center",
  },
});
