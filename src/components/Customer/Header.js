import { useState } from 'react'
//components
import Navbar from './Navbar'

import Modal from './Modal'
//style
import { StyledContainer } from './styled/Container.styles'
import { StyledCTA } from './styled/CTA.styles'

//assets
import Logo from './assets/logo.png'
import Background from './assets/background.png'
import CalendarComponent from './modals/Calendar'

const header = {
  src: Background,
  color: `#35bd21`,
}

//hero image component with dummy navbar
export default function Header() {
  const [hideModal, setHideModal] = useState(true)

  return (
    <StyledContainer style={{ backgroundImage: `url(${header.src})` }}>
      <Navbar />
      {hideModal && (
        <StyledContainer>
          <img src={Logo} width="60%" />
          <StyledCTA color="#fff" onClick={() => setHideModal(false)}>
            Buy Pass Now!
          </StyledCTA>
        </StyledContainer>
      )}

      {!hideModal && (
        <StyledContainer>
          <CalendarComponent />
          <Modal />
        </StyledContainer>
      )}
    </StyledContainer>
  )
}
