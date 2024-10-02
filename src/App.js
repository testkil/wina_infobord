import { createGlobalStyle } from "styled-components";

import { DataProvider } from "./Contexts/DataContext";
import Page from "./Page";

const GlobalStyle = createGlobalStyle`

  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    color: white;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
  
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <DataProvider>
        <Page />
      </DataProvider>
    </>
  );
}

export default App;
