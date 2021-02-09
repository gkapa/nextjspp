import { createGlobalStyle } from "styled-components";
import { colors } from "./theme";

const GlobalStyle = createGlobalStyle`

  * {margin: 0; padding: 0; box-sizing: border-box;}
  *::before, *::after {box-sizing: border-box;}

  html {
    /* scroll-behavior: smooth; */
  }

  body {
    font-family: 'Noto Serif JP', 'Open Sans', sans-serif;
  }

  h1, h2, h3, h4 {
    line-height: 1.6;
    font-weight: normal;
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

  button {
    border: none;
    background-color: transparent;
    outline: none;
  }
  
  input, textarea {
    padding: 0.8rem;
  }

  ul {
    list-style: none;
  }

  .gl-vr {
    display: inline;
    margin: 0 0.25em; 
    height: 1em;
  }
  
`;

export default GlobalStyle;
