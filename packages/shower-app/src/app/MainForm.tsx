import { QRCodeSVG } from 'qrcode.react';
import bg from './floralBorder.jpg'; // Tell webpack this JS file uses this image
import { Ratio, Stack } from 'react-bootstrap';

const registryURL =
  'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.amazon.com%2Fwedding%2Fvictoria-cafaro-lewis-cafaro-chicago-november-2023%2Fregistry%2F24ZZNNRMCJN73%3Ffbclid%3DIwAR265KVkjabR8vJ-892Xw2LaogwQz68mBBKv7O5G98WVVW6S6LHIv71fYgI&h=AT16qbCjyDHlVfASC3YBsHirDr9NrVCOYrkjaBc-7VxVsD7tX-j8BB1aHcAvO1QZ3pcai79GesiY_vtM36XqAaqz7pRN1FUkZn_JLZM8KT_TUkthxgRt_WF4w7zMdctIOGY';

export const MainForm = ({wide}: {wide:boolean}) => {
  return (
    <div
      className="text-center"
      style={{
        padding: '33% 18%',
        aspectRatio: wide ? 1.5 : 0.7 ,
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        fontSize: '4vw'
      }}
    >
      <Stack
      className='align-middle'
        style={{
          aspectRatio: wide ? 1.5 : 0.7,
        }}
      >
        <div>Please join us for a</div>
        <div className="pt-3 display-1">Couples</div>
        <div
          className="pt-1 mb-0 h3 text-uppercase"
          style={{ letterSpacing: '1.5px' }}
        >
          Shower
        </div>
        <div>honoring</div>
        <div
          className="pt-1 h3 text-uppercase"
          style={{ letterSpacing: '1.5px' }}
        >
          Victoria & Lewis
        </div>
        <div className="pt-3">Saturday September 2nd, 2023</div>
        <div>7pm-10pm</div>
        <div className="fw-bold mt-3">Prestige Creative Markets</div>
        <div>Bartlett, IL</div>
        <a href={registryURL}>View registry</a>
      </Stack>
    </div>
  );
};

export default MainForm;

//https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.amazon.com%2Fwedding%2Fvictoria-cafaro-lewis-cafaro-chicago-november-2023%2Fregistry%2F24ZZNNRMCJN73%3Ffbclid%3DIwAR265KVkjabR8vJ-892Xw2LaogwQz68mBBKv7O5G98WVVW6S6LHIv71fYgI&h=AT16qbCjyDHlVfASC3YBsHirDr9NrVCOYrkjaBc-7VxVsD7tX-j8BB1aHcAvO1QZ3pcai79GesiY_vtM36XqAaqz7pRN1FUkZn_JLZM8KT_TUkthxgRt_WF4w7zMdctIOGY
