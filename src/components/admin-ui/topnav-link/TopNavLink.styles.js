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
<<<<<<< HEAD
  font-size: 1.25rem;
  padding: 0 0.5rem;
=======
>>>>>>> 7c7b706a5b1d17d2e86eaee4036104fc985e6c9e
  &:hover {
    text-decoration: none;
  }
`

export const ProfileLink = styled(BaseLink)`
<<<<<<< HEAD
  font-size: 1.75rem;
=======
  font-size: 2rem;
>>>>>>> 7c7b706a5b1d17d2e86eaee4036104fc985e6c9e
`
