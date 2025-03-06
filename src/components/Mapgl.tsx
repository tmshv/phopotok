import Map, { Layer, Source } from "react-map-gl/maplibre";
import { InvisibleCircleLayer } from "./InvisibleCircleLayer";
import { PhotoLayer } from "./PhotoLayer";

import "maplibre-gl/dist/maplibre-gl.css";

function vis(value: boolean): "visible" | "none" {
    return value ? "visible" : "none"
}

export type MapglProps = {
    mode: string
    minScore: number
    maxScore: number
}

export default function Mapgl({ mode, minScore, maxScore }: MapglProps) {
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
                filter={["all",
                    [">=", ["get", "score"], minScore],
                    ["<=", ["get", "score"], maxScore],
                ]}
                paint={{
                    "circle-color": "#000",
                    "circle-radius": 3,
                    "circle-stroke-color": "#fff",
                    "circle-stroke-width": 1,
                }}
            />
            <Layer
                id="heatmap"
                source="neryungry"
                type="heatmap"
                layout={{
                    visibility: vis(mode === "Heatmap"),
                }}
                filter={["all",
                    [">=", ["get", "score"], minScore],
                    ["<=", ["get", "score"], maxScore],
                ]}
                paint={{
                    // Increase the heatmap weight based on frequency and property magnitude
                    'heatmap-weight': [
                        'interpolate',
                        ['linear'],
                        ['get', 'score'],
                        0,
                        0,
                        1,
                        1
                    ],
                    // Increase the heatmap color weight weight by zoom level
                    // heatmap-intensity is a multiplier on top of heatmap-weight
                    'heatmap-intensity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        10,
                        1,
                        15,
                        3
                    ],
                    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                    // Begin color ramp at 0-stop with a 0-transparency color
                    // to create a blur-like effect.
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0,
                        'rgba(33,102,172,0)',
                        0.2,
                        'rgb(103,169,207)',
                        0.4,
                        'rgb(209,229,240)',
                        0.6,
                        'rgb(253,219,199)',
                        0.8,
                        'rgb(239,138,98)',
                        1,
                        'rgb(178,24,43)'
                    ],
                    // Adjust the heatmap radius by zoom level
                    'heatmap-radius': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        10,
                        1,
                        15,
                        20
                    ],
                    // Transition from heatmap to circle layer by zoom level
                    'heatmap-opacity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        9,
                        0,
                        10,
                        1
                    ]
                }}
            />

            {mode !== "Photos" ? null : (
                <PhotoLayer
                    featuresLayerId="invisible-points"
                    clusterRadius={50}
                    iconLayout={"square"}
                    iconSize={50}
                    getImage={(x) => {
                        const score = x!.score
                        if(score <= minScore || score >= maxScore) {
                            return {}
                        }
                        return {
                            src: x!.thumbnail,
                            value: score,
                        }
                    }}
                />
            )}
        </Map>
    );
}
