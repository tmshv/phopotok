import { Layer } from "react-map-gl/maplibre"

export type InvisibleCircleLayerProps = {
    id: string
    source: string
}

export const InvisibleCircleLayer: React.FC<InvisibleCircleLayerProps> = ({ id, source }) => (
    <Layer
        id={id}
        source={source}
        type="circle"
        paint={{
            "circle-color": "#00000000",
            "circle-radius": 1,
            "circle-stroke-width": 0,
            "circle-stroke-color": "#00000000",
        }}
        layout={{
            visibility: "visible",
        }}
    />
)
