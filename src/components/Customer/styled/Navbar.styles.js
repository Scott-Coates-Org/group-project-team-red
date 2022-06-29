import styled from 'styled-components'

export const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: #513593;
  padding: 1em 2em;
  margin: 0;
  text-align: center;
  a {
    text-decoration: none;
    padding: 0.5em 1em;
    color: #fff;
    text-align: center;
  }
  a:hover {
    transform: scale(0.9);
  }
  a.active {
    background: #fff;
    color: #513593;
  }
`
