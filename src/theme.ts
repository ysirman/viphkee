import { createMuiTheme } from "@material-ui/core";
import { red, blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: { main: red[700] },
    secondary: { main: blue[500] },
    type: "dark",
  },
});

theme.overrides = {
  MuiInputBase: { root: { height: "40px" } },
  MuiInputLabel: {
    outlined: {
      transform: "translate(14px, 14px) scale(1)",
    },
  },
};
export default theme;
