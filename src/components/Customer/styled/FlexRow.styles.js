import styled from 'styled-components'

export const StyledFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justify }) => (justify ? justify : 'left')};
  align-content: center;
  margin: 0;
  box-sizing: border-box;
  height: fit-content;
  padding: 0;
`
