import { TopNavContainer, LogoContainer, FrogLogo } from './TopNav.styles'
import MainLogo from '../../Customer/assets/logo.png'

const TopNav = () => {
  return (
    <TopNavContainer>
      <LogoContainer>
        <FrogLogo src={MainLogo} />
      </LogoContainer>
    </TopNavContainer>
  )
}

export default TopNav
