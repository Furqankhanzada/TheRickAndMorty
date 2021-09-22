import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";
import { useQuery } from "@apollo/client";

import { Character, CharactersData, CharactersVars } from "../../interfaces";
import { GET_CHARACTERS } from "../../requests/characters";
import { CharacterListItem } from "./CharacterListItem";

// Type Bug Solution
const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

interface CharacterListProps {}

export const CharacterList: React.FC<CharacterListProps> = () => {
  const [search, setSearch] = useState<string>("");
  const [fetchMoreLoading, setFetchMoreLoading] = useState<boolean>(false);
  const {
    loading,
    error,
    data: {
      characters: {
        info = {
          next: null,
        },
        results = [],
      } = {},
    } = {},
    fetchMore,
  } = useQuery<CharactersData, CharactersVars>(GET_CHARACTERS, { variables: { page: 1 } });

  // Show Loading until data load
  if (loading) {
    return (
      <View testID="loading" style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Show error on screen
  if (error) return <Text>`Error! ${error.message}`</Text>;

  const onSearchInputTextChange = async (text: string) => {
    setSearch(text);
    await fetchMore({ variables: { filter: { name: text } } });
  };

  // Character List Item
  const renderItem = ({ item: character }: { item: Character }) => {
    return <CharacterListItem character={character} />;
  };

  // Not Found
  const noRecordsFound = (): JSX.Element => {
    return (
      <View style={styles.center}>
        <Text>No Records Found!</Text>
      </View>
    );
  };

  // FlatList Footer
  const footer = (): JSX.Element | null => {
    if (!loading && !info.next) return null;
    return <ActivityIndicator style={styles.footerLoading} size="large" />;
  };

  // For infinite scroll
  const scrollEnd = async () => {
    if (!info.next) return;
    if (fetchMoreLoading) return;
    try {
      setFetchMoreLoading(true);
      await fetchMore({
        variables: {
          page: info.next,
          ...(search ? { filter: { name: search } } : {}),
        },
      });
    } catch (e) {
      console.log("fetchMore error: ", e);
    } finally {
      setFetchMoreLoading(false);
    }
  };

  return (
    <FlatList
      testID="flat-list"
      contentContainerStyle={styles.contentContainer}
      data={results}
      ListHeaderComponent={
        <SafeSearchBar placeholder="Search" onChangeText={onSearchInputTextChange} value={search} platform="default" />
      }
      stickyHeaderIndices={[0]}
      renderItem={renderItem}
      ListFooterComponent={footer}
      ListEmptyComponent={noRecordsFound}
      keyExtractor={(item: Character) => item.id.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={scrollEnd}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
  },
  footerLoading: {
    marginVertical: 10,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
