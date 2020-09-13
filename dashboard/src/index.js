import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./app";
import FromFile from './components/fromfile';

const theme = createMuiTheme();

ReactDOM.render(
	  <MuiThemeProvider theme={theme}>
	    <FromFile />
		{/* <App /> */}
	  </MuiThemeProvider>,
	  document.getElementById("root")
);
