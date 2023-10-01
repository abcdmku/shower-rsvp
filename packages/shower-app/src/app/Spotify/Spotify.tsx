import { SearchResults, SpotifyApi, Track } from '@spotify/web-api-ts-sdk';
import { FastAverageColor, FastAverageColorResult } from 'fast-average-color';
import { useEffect, useRef, useState } from 'react';
import { Accordion, Badge, Button, Col, Form, InputGroup, Pagination, Row, Stack, useAccordionButton } from 'react-bootstrap';
import { Spotify as Player } from 'react-spotify-embed';

const maxAdds = 3; 
const msToMinSec = (time:number) => `${Math.floor(time/60000)}:${Math.floor((time % 60000)/1000).toString().padStart(2, '0')}`

export const Spotify = ({onChange}:{onChange:Function}) => {
  const [sdk, setSdk] = useState<SpotifyApi>();
  const [items, setItems] = useState<SearchResults<['track']>>();
  const [trackID, setTrackID] = useState<string>();
  const [requests, setRequests] = useState<Track[]>([]);
  const [canAdd, setCanAdd] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {!sdk && setSdk(SpotifyApi.withClientCredentials('f0c1f16fd7f34754a49cd08662437f25', '7d7f0fe6b892456bae3e8295bbdb1cfb', ['playlist-modify-public']))});
  useEffect(() => {setCanAdd(requests.length < maxAdds); onChange(requests)}, [requests]);
  useEffect(() => {search?.length > 0 ? SearchSong(search) : setItems(undefined)}, [search]);

  const SearchSong = (search) => sdk?.search(search, ['track'], 'US', 4, 0).then(setItems);

  const dropObj = (arr, key, value) => arr.filter(obj  => obj[key] !== value);
  const filterDupes = (arr, key) => arr.filter((v,i,a)=>a.findIndex(v2=>(v[key] === v2[key]))===i)

  return sdk ? (
    <Stack gap={2}>
      <div className=''>Song Requests - ({requests.length} / {maxAdds})</div>
      <div className='d-flex flex-wrap'>{requests?.map(track => <TrackBadge track={track} onPreview={() => setTrackID(track.id)} onRemove={() => setRequests(reqArr => dropObj(reqArr, 'id', track.id))}/>)}</div>
      
      {canAdd && <Form.Control name="search" id="search" placeholder="Search for song" onChange={e => setSearch(e.currentTarget.value)}  onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}/>}

      {trackID && <>
        <Button size='sm' variant="dark" className="fixed-bottom ms-auto rounded-pill fw-bold font-monospace text-light" style={{ fontSize: '16px', width:'27px', height:'27px', lineHeight: '1', marginRight: '3px', marginBottom: '50px', paddingBottom: '8px', zIndex: 10000}} onClick={() => setTrackID(undefined)}>x</Button>
        <Player className='fixed-bottom' wide width="100%" link={`https://open.spotify.com/track/${trackID}`}/>
      </>
      }

      <Row>
        {items !== undefined && (canAdd 
          ? items.tracks.items.map((track) => <TrackCard track={track} canAdd={canAdd} onAdd={track => setRequests(req => filterDupes([...req, track], 'id'))} onPreview={() => setTrackID(track.id)}/>)
          : <div className='fs-3'>Max songs added!</div>
        )}
      </Row>
    </Stack>
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

export const TrackBadge = ({ track, onRemove, onPreview }: { track: Track; onPreview: Function; onRemove: () => void }) => {
  const [color, setColor] = useState<FastAverageColorResult>();
  const fac = new FastAverageColor();
  fac.getColorAsync(track.album.images[0].url).then((color) => setColor(color));
  return (
    <Stack direction="horizontal" gap={2} className={`rounded-pill me-2 my-1 pe-2 ps-2 text-${color?.isLight ? 'dark' : 'light'}`} style={{background: color?.hex, filter: 'saturate(3)'}}>
      <span style={{fontSize: '12px', cursor: 'pointer'}} onClick={() => onPreview()}>▶︎</span>
      <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',}}>{track.name}</span>
      <span onClick={() => onRemove()} className='ps-2 fw-bold font-monospace' style={{cursor: 'pointer', paddingBottom: '3px'}}>x</span>
    </Stack>
  );
};
