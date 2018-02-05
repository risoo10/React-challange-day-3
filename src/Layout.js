import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: ${props => props.theme.h1FontSize};
  color: ${props => props.theme.mainBlack};
`

export const H2 = styled.h2`
  font-size: ${props => props.theme.baseFontSize};
  color: ${props => props.theme.mainBlack};   
`

export const H3 = styled.h3`
  color: ${props => props.theme.mainGray};
  font-size: ${props => props.theme.h3FontSize};
`