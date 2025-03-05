import { useEffect, useState } from "react"
import type { Map } from "maplibre-gl"

type UseFeaturesOptions = {
    layerId: string,
    map?: Map,
}

export default function useFeatures({ map, layerId }: UseFeaturesOptions): GeoJSON.Feature[] {
    const [features, setFeatures] = useState<GeoJSON.Feature[]>([])
    useEffect(() => {
        if (!map) {
            return
        }

        const upd = () => {
            const features = map.queryRenderedFeatures({
                layers: [layerId],
            })
            setFeatures(features)
        }
        map.on("moveend", upd)

        // Not working if call upd immideatly
        // timeout 500 is reasonable value
        // but can be changed in the future
        const t = setTimeout(upd, 500)

        return () => {
            clearTimeout(t)
            map.off("moveend", upd)
        }
    }, [layerId, map])

    return features
}
