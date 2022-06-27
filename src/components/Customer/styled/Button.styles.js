import styled from 'styled-components'

export const StyledButton = styled.button`
  width: ${({ width }) => (width ? width : '200px')};
  border: none;
  border-radius: 5px;
  padding: 1em;
  font-weight: bold;
  color: ${({ color }) => (color ? color : '#513593')};
  background: ${({ bg }) => (bg ? bg : '#35bd21')};
  margin: ${({ margin }) => (margin ? margin : '1em 0')};

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%);
  }
`
