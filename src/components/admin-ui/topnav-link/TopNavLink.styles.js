import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const TopNavLinkContainer = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  color: white;
  transition: all 300ms;

  &:hover {
    color: #33bc21;
  }
`
export const BaseLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`

export const ProfileLink = styled(BaseLink)`
  font-size: 2rem;
`
