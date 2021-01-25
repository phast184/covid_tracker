import {useMap} from 'react-leaflet'
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom, 2000);
    return null;
  }

  export default ChangeView