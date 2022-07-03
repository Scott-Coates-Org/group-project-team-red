import { useState } from 'react'
//components
import Navbar from './Navbar'
<<<<<<< customer-ui-50%

=======
import Modal from './Modal'
>>>>>>> main
//style
import { StyledContainer } from './styled/Container.styles'
import { StyledCTA } from './styled/CTA.styles'

//assets
import Logo from './assets/logo.png'
import Background from './assets/background.png'
<<<<<<< customer-ui-50%
import CalendarComponent from './modals/Calendar'
=======
>>>>>>> main

const header = {
  src: Background,
  color: `#35bd21`,
}
<<<<<<< customer-ui-50%

//hero image component with dummy navbar
=======
>>>>>>> main
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
<<<<<<< customer-ui-50%
          <CalendarComponent />
=======
          <Modal />
>>>>>>> main
        </StyledContainer>
      )}
    </StyledContainer>
  )
}
