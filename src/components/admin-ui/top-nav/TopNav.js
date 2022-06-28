import {
  TopNavContainer,
  LogoContainer,
  FrogLogo,
  TopNavButtonsContainer,
} from './TopNav.styles'
import MainLogo from '../../Customer/assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuestionCircle,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'

const TopNav = () => {
  return (
    <TopNavContainer>
      <LogoContainer>
        <FrogLogo src={MainLogo} />
      </LogoContainer>
      <TopNavButtonsContainer>
        <FontAwesomeIcon icon={faQuestionCircle} />
        <FontAwesomeIcon icon={faUserCircle} />
      </TopNavButtonsContainer>
    </TopNavContainer>
  )
}

export default TopNav
