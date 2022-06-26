import styled from 'styled-components'

export const StyledModal = styled.div`
  position: fixed;
  z-index: 1;
  left: ${({ left }) => left};
  bottom: 0;
  top: ${({ top }) => top};
  padding: 3em 1em 1em 2em;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-color: #fff;
  color: #333;
`
