import { SpotifyApi, SearchResults, Track } from "@spotify/web-api-ts-sdk";
import { useState, useEffect } from "react";
import { Stack, Button, Row, Card } from "react-bootstrap";
import TrackCard from "../TrackCard/TrackCard";
import { Spotify as Player } from 'react-spotify-embed';
import { createClient } from "@supabase/supabase-js";

/* eslint-disable-next-line */
export interface DataBaseProps {
  adults: number
  attending: boolean
  children: number
  created_at: string
  id: string
  name: string
  requests:Track[]
}

export function ViewSongs() {
  const [sdk, setSdk] = useState<SpotifyApi>();
  const [items, setItems] = useState<Array<DataBaseProps>>();
  const [trackID, setTrackID] = useState<string>();

  useEffect(() => {!sdk && setSdk(
    SpotifyApi.withUserAuthorization("f0c1f16fd7f34754a49cd08662437f25", window.location.origin, ["playlist-modify-public"])
  )});

  const filterDupes = (arr, key) => arr.filter((v,i,a)=>a.findIndex(v2=>(v[key] === v2[key]))===i)
  
  const supabaseUrl = 'https://ictpfgjcsmfkspnaqmqc.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljdHBmZ2pjc21ma3NwbmFxbXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNTc1NDMsImV4cCI6MjAwNTgzMzU0M30.knSLXzRjuUGJbKgkNcSFj1hmGc-FfPl8hVzIzB-CZNA'
  const supabase = createClient(supabaseUrl, supabaseKey)

  
  useEffect(() => {
    (async () => {
      let { data, error } = await supabase.from('Wedding').select('*')
       data && setItems(data)
    })()
  }, []);

  return sdk ? (
    <Stack gap={2} className="p-3">
      {trackID && <>
        <Button size='sm' variant="dark" className="fixed-bottom ms-auto rounded-pill fw-bold font-monospace text-light" style={{ fontSize: '16px', width:'27px', height:'27px', lineHeight: '1', marginRight: '3px', marginBottom: '50px', paddingBottom: '8px', zIndex: 10000}} onClick={() => setTrackID(undefined)}>x</Button>
        <Player className='fixed-bottom' wide width="100%" link={`https://open.spotify.com/track/${trackID}`}/>
      </>}
      <Row>
        {items !== undefined && 
        items.map(entry => (
          <Card>
            <div className="h5 mt-3">{entry.name} - Attending: {entry.attending ? "yes" : "no"} <br/> Adults: {entry.adults} - Children: {entry.children}</div>
            <Row>
              {entry.requests ? entry.requests.map(track => 
                <TrackCard 
                  track={track}
                  canAdd={true}
                  onAdd={(track) => {sdk.playlists.addItemsToPlaylist('7ol5OceflKFFi7djk5tHHW', [track.uri])}}
                  onPreview={() => setTrackID(track.id)}
                />
              ) : <>No Tracks Added</>}
            </Row>
          </Card>
        ))}
      </Row>
    </Stack>
  ) : (
    <>Loading...</>
  );
};

export default ViewSongs;
