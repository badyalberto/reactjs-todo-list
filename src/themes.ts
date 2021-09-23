import { DefaultTheme } from "styled-components";

const LightTheme: DefaultTheme = {
  pageBackground: "white",
  titleColor: "#282c36",
  tagLineColor: "black"
};

const DarkTheme: DefaultTheme = {
  pageBackground: "#282c36",
  titleColor: "white",
  tagLineColor: "lavender"
}

// export const themes = {
//   light: LightTheme,
//   dark: DarkTheme,
// }

export {
  LightTheme,
  DarkTheme,
}