import { HopeProvider as HProvider } from "@hope-ui/solid";

// types
import type { HopeThemeConfig } from "@hope-ui/solid";
import type { PropsWithChildren } from "solid-js";

const config: HopeThemeConfig = {
  initialColorMode: "dark",
  darkTheme: {
    colors: {
      background: "#171923",
      blackAlpha1: "#1A202C",
      blackAlpha2: "#2D3748",
      blackAlpha3: "#4A5568",
      blackAlpha4: "#718096",
      blackAlpha5: "#A0AEC0",
      blackAlpha6: "#CBD5E0",
      blackAlpha7: "#E2E8F0",
      blackAlpha8: '#EDF2F7',
      blackAlpha9: '#F7FAFC'
    },
  },
};

function HopeProvider(props: PropsWithChildren<{}>) {
  return <HProvider config={config}>{props.children}</HProvider>;
}

export { HopeProvider };
