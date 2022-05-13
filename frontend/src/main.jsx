import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ApolloClient, ApolloProvider, HttpLink, split, InMemoryCache } from "@apollo/client";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities';
import CssBaseline from '@mui/material/CssBaseline';


const wsLink = new WebSocketLink(
  new SubscriptionClient("ws://localhost:8080/subscriptions")
);
const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <CssBaseline />
    <App />
  </ApolloProvider>
);
