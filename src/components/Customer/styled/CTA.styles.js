import styled from 'styled-components'

export const StyledCTA = styled.button`
  align-self: center;
  width: ${({ width }) => (width ? width : '200px')};
  border: none;
  border-radius: 5px;
  padding: 1em;
  font-weight: bold;
  color: ${({ color }) => (color ? color : '#513593')};
  background: ${({ bg }) => (bg ? bg : '#35bd21')};
  margin: 0 auto 4em auto;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%);
    transition: all 200ms ease-out;
  }
`
