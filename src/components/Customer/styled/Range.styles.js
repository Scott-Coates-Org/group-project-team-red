import styled from 'styled-components'

export const StyledRange = styled.div`
  width: ${({ width }) => width};
  height: 5px;
  background-color: ${({ bg }) => bg};
  position: fixed;
  top: 7em;
  left: 0;
  border-radius: 10px;
`
