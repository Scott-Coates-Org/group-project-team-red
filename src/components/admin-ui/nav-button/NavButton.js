import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  NavButtonContainer,
  BaseButton,
  TopNavLargeButton,
} from './NavButton.styles'

export const NAV_BUTTON_TYPES = {
  base: 'base',
  topNavLarge: 'topNavLarge',
}

const getButtonType = (buttonType = NAV_BUTTON_TYPES.base) => {
  return {
    [NAV_BUTTON_TYPES.base]: BaseButton,
    [NAV_BUTTON_TYPES.topNavLarge]: TopNavLargeButton,
  }[buttonType]
}

const NavButton = ({ buttonType, label, icon, ...otherProps }) => {
  const CustomButton = getButtonType(buttonType)

  return (
    <NavButtonContainer>
      <CustomButton {...otherProps}>
        <FontAwesomeIcon icon={icon} />
        {label && label}
      </CustomButton>
    </NavButtonContainer>
  )
}

export default NavButton
