import { createGlobalStyle } from "styled-components";
import { modernNormalize } from "styled-modern-normalize";

const GlobalStyle = createGlobalStyle`
  ${modernNormalize}
  @import url('https://fonts.googleapis.com/css?family=Great+Vibes|Open+Sans:300,400,600,700|Raleway:300,400,500,600,700,800,900&display=swap');
  :root {

    /* Colors */
  --bg-color: #fffdfa;
  --main-accent-color: #397fa3;
  --primary-button-color: #4494bd;
  --dark-text-color: black;
  --light-text-color: white;

    /* Fonts */
  --header-font: "Great vibes";
  --title-font:  "Raleway";
  --paragraph-font: "Open sans";


  }

  body {
    background-color: var(--bg-color);
    color: var(--dark-text-color);
    font-family: var(--paragraph-font); 
    display: block;
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--main-font-color);
    text-decoration: none;
  }
  p{
    font-family: var(--paragraph-font);
  }
  `;

export default GlobalStyle;
