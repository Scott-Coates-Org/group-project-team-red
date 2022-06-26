import styled from 'styled-components'

export const StyledFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  align-content: ${({ align }) => (align ? align : 'center')};
  box-sizing: border-box;
  height: fit-content;
`
