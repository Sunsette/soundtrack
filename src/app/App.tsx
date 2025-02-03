import * as React from "react";
import { Home } from "./pages/Home";
import { Provider } from "urql";
import { client } from "../graphql";

export default function App(): React.ReactNode {
  // TODO: Implement a router
  return (
    <Provider value={client}>
      <Home></Home>
    </Provider>
  );
}
