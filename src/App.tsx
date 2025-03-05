import Map from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css'

function App() {
    return (
        <Map
            hash
            initialViewState={{
                longitude: 124.71283,
                latitude: 56.65966,
                zoom: 13.5,
            }}
            mapStyle="https://api.maptiler.com/maps/outdoor-v2/style.json?key=2Yg1Em5zQ9rm8ZPpTIeB"
            style={{
                width: "100%",
                height: "100%",
            }}
        />
    );
}

export default App
