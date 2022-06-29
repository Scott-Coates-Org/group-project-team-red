import styled from 'styled-components'

export const StyledContainer = styled.div`
  min-width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background-image: url(${({ src }) => src})
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  img {
    align-self: center;
  }
`
