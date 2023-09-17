import { Modal, Stack } from 'react-bootstrap';
import './wedding.css';
import { useState } from 'react';
import ModalForm from '../Modal/Modal';

const registryURL =
  'https://www.amazon.com/wedding/victoria-cafaro-lewis-cafaro-chicago-november-2023/registry/24ZZNNRMCJN73?fbclid=IwAR265KVkjabR8vJ-892Xw2LaogwQz68mBBKv7O5G98WVVW6S6LHIv71fYgI';

export const Wedding = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <body className="u-body text-center">
      <Modal show={show} onHide={handleClose} centered><ModalForm/></Modal>
      <section
        className="u-align-center u-clearfix u-image u-section-2 mh-100 d-flex align-content-center"
        id="carousel_e4eb"
      >
        <div className="m-auto">
          <div className="pt-5 h2 text-uppercase" style={{ letterSpacing: '1.5px' }}>
            Victoria & Lewis
          </div>
          <div className="pt-3 display-1 pb-5">Wedding</div>
          <div className="dusty-rose u-shape u-shape-rectangle u-shape-1 mt-3 mt-sm-5"/>
          <div className="u-image u-image-circle u-image-1"/>
          <Stack className='fs-4 mt-4'>
            <div className="fs-2 lh-sm pb-2">Saturday November 11th, 2023</div>
            <br className='d-block d-sm-none'/>Ceremony - 3pm-4pm
            <a href="https://maps.app.goo.gl/o1J8u5d8dw6L1Gg28" className=''><span>St Celestines - Elmwood Park, IL</span></a>
          </Stack>

          <Stack className='fs-4 mt-2'>
            Reception - 5pm-11pm
            <a href="https://maps.app.goo.gl/LqwU7HHNGvVpfQfN9" className=''><span>Chandler's Chophouse - Schaumburg, IL</span></a>
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

export default Wedding;