//style
import { StyledItem } from '../styled/Item.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'

//components
import Options from './Options'
import OptionUnlimited from './OptionUnlimited'
import { useSelector } from 'react-redux'

//list of options for jump pass
export default function Product() {
  const { isLoaded: dateIsLoaded } = useSelector(({ calendar }) => calendar)

  if (!dateIsLoaded) return <div>...loading</div>

  return (
    <StyledItem style={{ overflowY: 'scroll', height: '300px' }}>
      <StyledFlexColumn>
        <OptionUnlimited />
        <Options />
        <Options />
      </StyledFlexColumn>
    </StyledItem>
  )
}
