import styled from 'styled-components'

export const StyledFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  align-content: ${({ align }) => (align ? align : 'center')};
  box-sizing: border-box;
  height: fit-content;
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
`
