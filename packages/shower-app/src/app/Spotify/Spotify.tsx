import { SearchResults, SpotifyApi, Track } from '@spotify/web-api-ts-sdk';
import { FastAverageColor, FastAverageColorResult } from 'fast-average-color';
import { useEffect, useRef, useState } from 'react';
import { Accordion, Button, Col, Form, InputGroup, Row, Stack, useAccordionButton } from 'react-bootstrap';
import { Spotify as Player } from 'react-spotify-embed';

const maxAdds = 3; 
const msToMinSec = (time:number) => `${Math.floor(time/60000)}:${Math.floor((time % 60000)/1000).toString().padStart(2, '0')}`

export const Spotify = ({onChange}:{onChange:Function}) => {
  const [sdk, setSdk] = useState<SpotifyApi>();
  const [items, setItems] = useState<SearchResults<['track']>>();
  const [trackID, setTrackID] = useState<string>();
  const [requests, setRequests] = useState<Track[]>([]);
  const [canAdd, setCanAdd] = useState(true);
  useEffect(() => {!sdk && setSdk(SpotifyApi.withClientCredentials('f0c1f16fd7f34754a49cd08662437f25', '7d7f0fe6b892456bae3e8295bbdb1cfb'))});
  useEffect(() => {setCanAdd(requests.length < maxAdds) }, [requests]);
  
  const SearchSong = (search) => sdk?.search(search, ['track'], 'US', 20, 0).then(setItems);

  const dropObj = (arr, key, value) => arr.filter(obj  => obj[key] !== value);
  const filterDupes = (arr, key) => arr.filter((v,i,a)=>a.findIndex(v2=>(v[key] === v2[key]))===i)

  return sdk ? (
    <>
      <Stack gap={1} className='mb-3'>
        <div className='fs-3'>Requests ({requests.length} / {maxAdds})</div>
        {requests?.map(track =>
          <Stack direction='horizontal'>
            <div>{track.name}</div>
            <div 
              onClick={() => setRequests(reqArr => dropObj(reqArr, 'name', track.name))}
              className="ps-2"
              style={{cursor: 'pointer'}}
            >
              🗙
            </div>
          </Stack>
        )}
      </Stack>
      <Accordion defaultActiveKey="0">
      <Accordion.Header>
Add songs?
    </Accordion.Header>      <Accordion.Collapse eventKey="0">
        <>
              <Form
        onSubmit={(e) => (
          e.preventDefault(),
          SearchSong(new FormData(e.currentTarget).get('search'))
        )}
      >
        <InputGroup className="mb-3">
          <Form.Control name="search" id="search" placeholder="Search for song" />
          <Button variant="outline-secondary" id="button-addon2" type='submit'>
            Search
          </Button>
        </InputGroup>
      </Form>

      {trackID && <Player
        frameBorder={0}
        className='fixed-bottom'
        wide
        width="100%"
        link={`https://open.spotify.com/track/${trackID}`}
      />}

      <Row style={{marginBottom: '100px'}}>
        {items !== undefined && (canAdd 
          ? items.tracks.items.map((track) => <TrackCard track={track} canAdd={canAdd} onAdd={track => setRequests(req => filterDupes([...req, track], 'id'))} onPreview={() => setTrackID(track.id)}/>)
          : <div className='fs-3'>Max songs added!</div>
        )}
            </Row>
          </>
        </Accordion.Collapse>
      </Accordion>
    </>
  ) : (
    <>Loading...</>
  );
};

export default Spotify;


export const TrackCard = ({ track, onPreview, onAdd, canAdd }: { track: Track; canAdd: Boolean; onPreview: Function; onAdd: (track: Track) => void }) => {
  const [color, setColor] = useState<FastAverageColorResult>();
  const fac = new FastAverageColor();
  fac.getColorAsync(track.album.images[0].url).then((color) => setColor(color));
  return (
    <Col key={track.id} className="my-3">
      <Stack className={`rounded-3 shadow fw-bold ${color?.isDark ? 'text-light' : 'text-dark'}`} style={{ minWidth: '150px', fontFamily: 'Open Sans', background: color?.hex, filter: 'saturate(3)'}}>
        <img src={track.album.images[0].url} width="100%" style={{filter: 'saturate(.5)'}} />
        <div className="h6 px-2 mt-1" style={{ fontSize: '12px'}}>{track.artists.map((artist) => artist.name).join(', ')}</div>
        <div className="h5 px-2" style={{ fontSize: '14px'}}>{track.name}</div>
        <Stack direction='horizontal' className="mb-2 px-2">
          <div className="h6" style={{ fontSize: '14px'}}>{msToMinSec(track.duration_ms)}</div>
          <Button size='sm' className="ms-auto rounded-pill fw-bold monospace" style={{ fontSize: '16px', width:'27px', height:'27px', lineHeight: '1'}} variant={`${color?.isDark ? 'dark' : 'light'}`} onClick={() => onAdd(track)} disabled={!canAdd}>+</Button>
          <Button size='sm' className="ms-2 rounded-pill" style={{ fontSize: '12px'}} onClick={() => onPreview()} variant={`${color?.isDark ? 'dark' : 'light'}`}>▶︎</Button>
        </Stack>
      </Stack>
    </Col>
  );
};
