import styled from 'styled-components'

export const NavButtonContainer = styled.div`
  color: white;
`
export const BaseButton = styled.button`
  display: grid;
  grid-template-columns: 15% 85%;
  grid-column-gap: 0.75rem;
  justify-content: left;
  align-items: center;
  padding: 0.5rem 0.5rem 0.875rem 0.5rem;
  font-size: 1rem;
  color: white;
  transition: all 300ms;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;

  &:hover {
    color: #33bc21;
    transform: translateX(5px);
  }
`

export const TopNavLargeButton = styled(BaseButton)`
  font-size: 2rem;

  &:hover {
    transform: none;
  }
`
