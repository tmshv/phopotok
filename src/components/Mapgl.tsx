import Map, { Layer, Source } from "react-map-gl/maplibre";
import { PhotoLayer } from "./PhotoLayer";

import "maplibre-gl/dist/maplibre-gl.css";

export default function Mapgl() {
    return (
        <Map
            hash
            id="map"
            initialViewState={{
                longitude: 124.71283,
                latitude: 56.65966,
                zoom: 13.5,
            }}
            projection={"globe"}
            mapStyle="https://api.maptiler.com/maps/outdoor-v2/style.json?key=2Yg1Em5zQ9rm8ZPpTIeB"
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <Source type="geojson" data={"/20220627-neryungry.geojson"} id="neryungry" />
            <Layer
                source="neryungry"
                type="circle"
                paint={{
                    "circle-color": "#000",
                    "circle-radius": 3,
                    "circle-stroke-color": "#fff",
                    "circle-stroke-width": 1,
                }}
            />
            <PhotoLayer
                layerId="photos"
                sourceId="neryungry"
                sourceLayer=""
                clusterRadius={50}
                iconLayout={"square"}
                iconSize={50}
                getImage={(x) => ({
                    src: x!.thumbnail,
                    value: x!.score,
                })}
            />
        </Map>
    );
}
