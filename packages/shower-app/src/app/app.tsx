import ViewSongs from './ViewSongs/ViewSongs';
import Wedding from './Wedding/Wedding';

export function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');

  return (
    code ? <ViewSongs/> :
    <Wedding/>
  );
}

export default App;
