import { Flex } from "@hope-ui/solid";

// components
import { Header } from "./components/Header";
import { Main } from "./components/Main";

// types
import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <Flex direction="column" alignItems="center" gap="40px">
      <Header />

      <Main />
    </Flex>
  );
};

export { App };
