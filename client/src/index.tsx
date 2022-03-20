/* @refresh reload */
import { render } from "solid-js/web";

// components
import { App } from "./App";

// contexts
import { Web3Provider } from "./contexts/web3";

// lib
import { HopeProvider } from './lib/hopeUIConfig'

render(
  () => (
    <HopeProvider>
      <Web3Provider>
        <App />
      </Web3Provider>
    </HopeProvider>
  ),
  document.getElementById("root") as HTMLElement
);
