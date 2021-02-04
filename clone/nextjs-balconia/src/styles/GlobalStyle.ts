import { createGlobalStyle } from "styled-components";
import { colors } from "./theme";

const GlobalStyle = createGlobalStyle`

  * {margin: 0; padding: 0; box-sizing: border-border-box;}
  *::before, *::after {box-sizing: border-box;}

  html {
    /* scroll-behavior: smooth; */
  }

  body {
    font-family: 'Open Sans', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
    
    &:visited {
      color: ${colors.purple[7]};
    }

    &.underline {
      &:hover {
        text-decoration: underline;
      }
    } 
  }

  a.inherit {
    &:visited {
      color: inherit;
    }
  }
  
  input, textarea {
    padding: 0.8rem;
  }

  ul {
    list-style: none;
  }

  .vr {
    display: inline;
    margin: 0 0.25em; 
    height: 1em;
  }
`;

export default GlobalStyle;
