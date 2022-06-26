import styled from 'styled-components'

export const NavLinkContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  justify-content: left;
  align-items: center;
  padding: 0.5rem;
  color: white;
  border-bottom: 1px solid transparent;
  transition: all 300ms;

  &:hover {
    border-bottom: 1px solid white;
    color: teal;
  }
`
export const NavAnchor = styled.a`
  margin-left: 1rem;

  &:hover {
    text-decoration: none;
  }
`
