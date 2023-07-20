import { Stack } from 'react-bootstrap';
import './Template2.css';

const registryURL =
  'https://www.amazon.com/wedding/victoria-cafaro-lewis-cafaro-chicago-november-2023/registry/24ZZNNRMCJN73?fbclid=IwAR265KVkjabR8vJ-892Xw2LaogwQz68mBBKv7O5G98WVVW6S6LHIv71fYgI';

export const Template2 = () => {
  return (
    <body className="u-body text-center">
      <section
        className="u-align-center u-clearfix u-image u-section-2"
        id="carousel_e4eb"
      >
        <div className="u-clearfix u-sheet u-valign-middle-xl u-sheet-1 mb-3">
          <div
            className="pt-5 h2 text-uppercase"
            style={{ letterSpacing: '1.5px' }}
          >
            Victoria & Lewis
          </div>
          <div className="pt-3 display-1 pb-5">Couples Shower</div>
          <div className="dusty-rose u-shape u-shape-rectangle u-shape-1 mt-3 mt-sm-5"></div>
          <div className="u-image u-image-circle u-image-1"></div>

          <Stack className='fs-4 mt-4'>
            <div className="fs-3 lh-sm pb-2">Saturday September 2nd, 2023 <br className='d-block d-sm-none'/>7pm-10pm</div>
            <a href="https://goo.gl/maps/Y3iybKj6dGBufJecA" className=''><span>Prestige Creative Markets - Bartlett, IL</span></a>
          </Stack>
          <div><a href={registryURL} className="text-decoration-underline u-border-2  u-btn u-btn-round u-button-style u-none u-radius-25 u-text-hover-black u-text-palette-2-dark-2 u-btn-2 mb-0">
              Registry
            </a></div>
            <div><a href={registryURL} className="mt-2 u-border-2 u-border-palette-2-dark-2 u-btn u-btn-round u-button-style u-none u-radius-25 u-text-hover-black u-text-palette-2-dark-2 u-btn-2">
              RSVP
            </a></div> 

        </div>
      </section>
    </body>
  );
};

export default Template2;
