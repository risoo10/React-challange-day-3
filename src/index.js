import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import styled, {ThemeProvider, injectGlobal} from 'styled-components';

const theme = {
    backgroundColor: '#dfe2e8',
    contentBackgroundColor: '#ffffff',
    mainBlack: '#383746',
    mainGray: '#a5a5a9',
    lightGray: '#efeff3',
    blueColor: '#0079f3',
    greenColor: '#00af21',
    redColor: '#e93f53',
    violetColor: '#7805be',
    baseFontColor: '#383746',
    baseFontSize: '18px',
    h3FontSize: '14px',
    h1FontSize: '22px',
    borderRadius: '0.8em',
    baseBorder: '2px solid #efeff3',
    shadow: '0px 0px 30px rgba(0,0,0,0.15)',
    shadowActive: '0px 0px 30px rgba(0,0,0,0.25)',
};

const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lato', sans-serif;
  background-color: ${props => props.theme.backgroundColor};
  font-size: ${props => props.theme.baseFontSize};
  color: ${props => props.theme.baseFontColor}; 
  box-sizing: border-box;
`;

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Background>
            <App />
        </Background>
    </ThemeProvider>,
    document.getElementById('root')
);

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700&subset=latin-ext');
  
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
}
`
