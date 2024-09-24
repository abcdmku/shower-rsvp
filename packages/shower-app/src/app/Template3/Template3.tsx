import { Modal, Stack } from 'react-bootstrap';
import './Template3.module.css';
import { useState } from 'react';
import ModalForm from '../Modal/Modal';

const registryURL =
  'https://www.amazon.com/baby-reg/victoriaandlewis-cafaro-february-2025-yorkville/2FXHBE8BSUDOX';

export const Template3 = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <body className="u-body text-center">
      <Modal show={show} onHide={handleClose} centered><ModalForm/></Modal>
      <section
        className="u-align-center u-clearfix u-image u-section-2 baby mh-100 d-flex align-content-center"
        id="carousel_e4eb"
      >
        <div className="m-auto">
          <div className="pt-5 h2 text-uppercase" style={{ letterSpacing: '1.5px' }}>
            Join us for our baby shower
          </div>
          <div className="pt-4 display-1 pb-2" style={{color:"#907a68"}}>We can bearly wait</div>
          <Stack className='fs-4 mt-4'>
            <div className="fs-3 lh-sm pb-2">Saturday November 16th, 2024 <br className='d-block d-sm-none'/>6pm-11pm</div>
            <a href="https://goo.gl/maps/Y3iybKj6dGBufJecA" className=''><span>Prestige Creative Markets - Bartlett, IL</span></a>
            <div>Please register before october 25th, 2024</div>
          </Stack>
          <div><a href={registryURL} className="text-decoration-underline u-border-2  u-btn u-btn-round u-button-style u-none u-radius-25 u-text-hover-black u-text-palette-2-dark-2 u-btn-2 mb-0">
            Registry
          </a></div>
          <div onClick={e=> handleShow()} className="mt-2 u-border-2 u-border-palette-2-dark-2 u-btn u-btn-round u-button-style u-none u-radius-25 u-text-hover-black u-text-palette-2-dark-2 u-btn-2">
            RSVP
          </div> 
        </div>
      </section>
    </body>
  );
};

export default Template3;
