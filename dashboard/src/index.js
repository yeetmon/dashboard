import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import FromFile from './components/fromfile';

const theme = createMuiTheme();

ReactDOM.render(
	  <MuiThemeProvider theme={theme}>
	    <FromFile />
	  </MuiThemeProvider>,
	  document.getElementById("root")
);
