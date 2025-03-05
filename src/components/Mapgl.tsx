import Map, { Layer, Source } from "react-map-gl/maplibre";
import { InvisibleCircleLayer } from "./InvisibleCircleLayer";
import { PhotoLayer } from "./PhotoLayer";

import "maplibre-gl/dist/maplibre-gl.css";

function vis(value: boolean): "visible" | "none" {
    return value ? "visible" : "none"
}

export type MapglProps = {
    mode: string
}

export default function Mapgl({ mode }: MapglProps) {
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
            <InvisibleCircleLayer
                id={"invisible-points"}
                source={"neryungry"}
            />
            <Layer
                source="neryungry"
                type="circle"
                layout={{
                    visibility: vis(mode === "Circles"),
                }}
                paint={{
                    "circle-color": "#000",
                    "circle-radius": 3,
                    "circle-stroke-color": "#fff",
                    "circle-stroke-width": 1,
                }}
            />
            {mode !== "Photos" ? null : (
                <PhotoLayer
                    featuresLayerId="invisible-points"
                    clusterRadius={50}
                    iconLayout={"square"}
                    iconSize={50}
                    getImage={(x) => ({
                        src: x!.thumbnail,
                        value: x!.score,
                    })}
                />
            )}
        </Map>
    );
}
