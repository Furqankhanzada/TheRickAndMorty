import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: false,
            merge(existing = { __typename: "Characters", results: [] }, incoming, { args }) {
              if (args?.filter && !incoming.info.prev) {
                return incoming;
              }
              const results = [...existing.results, ...incoming.results].reduce((array, current) => {
                return array.map((i: { __ref: any }) => i.__ref).includes(current.__ref) ? array : [...array, current];
              }, []);
              return { ...incoming, results };
            },
          },
        },
      },
    },
  }),
});
