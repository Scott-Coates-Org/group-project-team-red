import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NavLinkContainer = styled.div`
  color: white;
`
export const BaseLink = styled(Link)`
  display: grid;
  grid-template-columns: 15% 85%;
  grid-column-gap: 1rem;
  justify-content: left;
  align-items: baseline;
  padding: 0.5rem;
  font-size: 1rem;
  transition: all 300ms;
  cursor: pointer;

  label {
    cursor: pointer;
  }

  &:hover {
    text-decoration: none;
    color: #33bc21;
    transform: translateX(5px);
  }
`

export const CollapseLink = styled(BaseLink)`
  font-size: 0.875rem;
  padding: 0 0.5rem;
`

export const TopNavSmallLink = styled(BaseLink)`
  grid-gap: 0;
  font-size: 1.25rem;
  padding: 0 0.5rem;
  border: none;

  div {
    margin-right: 0;
  }

  &:hover {
    transform: none;
  }
`
export const TopNavLargeLink = styled(TopNavSmallLink)`
  font-size: 2rem;
`
