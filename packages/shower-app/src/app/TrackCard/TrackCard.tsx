import { Track } from '@spotify/web-api-ts-sdk';
import { FastAverageColorResult, FastAverageColor } from 'fast-average-color';
import { useState } from 'react';
import { Col, Stack, Button } from 'react-bootstrap';

/* eslint-disable-next-line */
export interface TrackCardProps {
  track: Track;
  canAdd: Boolean;
  onPreview: Function;
  minWidth?: string;
  onAdd: (track: Track) => void;
}

const msToMinSec = (time:number) => `${Math.floor(time/60000)}:${Math.floor((time % 60000)/1000).toString().padStart(2, '0')}`

export const TrackCard = ({ track, onPreview, minWidth='150px', onAdd, canAdd }: TrackCardProps) => {
  const [color, setColor] = useState<FastAverageColorResult>();
  const fac = new FastAverageColor();
  fac.getColorAsync(track.album.images[0].url).then((color) => setColor(color));
  return (
    <Col key={track.id}>
      <Stack className={`rounded-3 shadow fw-bold ${color?.isDark ? 'text-light' : 'text-dark'}`} style={{ minWidth, fontFamily: 'Open Sans', background: color?.hex, filter: 'saturate(3)'}}>
        <img src={track.album.images[0].url} width="100%" style={{filter: 'saturate(.5)'}} />
        <div className="h6 px-2 mt-1" style={{ fontSize: '12px'}}>{track.artists.map((artist) => artist.name).join(', ')}</div>
        <div className="h5 px-2" style={{ fontSize: '14px'}}>{track.name}</div>
        <Stack direction='horizontal' className="mb-2 px-2">
          <div className="h6" style={{ fontSize: '14px'}}>{msToMinSec(track.duration_ms)}</div>
          <Button size='sm' className={`ms-auto rounded-pill fw-bold monospace text-${color?.isDark ? 'dark' : 'light'}`} style={{ fontSize: '16px', width:'27px', height:'27px', lineHeight: '1'}} variant={`${color?.isLight ? 'dark' : 'light'}`} onClick={() => onAdd(track)} disabled={!canAdd}>+</Button>
          <Button size='sm' className={`ms-2 rounded-pill text-${color?.isDark ? 'dark' : 'light'}`} style={{ fontSize: '12px'}} onClick={() => onPreview()} variant={`${color?.isLight ? 'dark' : 'light'}`}>▶︎</Button>
        </Stack>
      </Stack>
    </Col>
  );
};

export default TrackCard;
