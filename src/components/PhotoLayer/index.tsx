import { ImageMarker, ImageMarkerLayout } from "../../ui/ImageMarker"
import { useCallback, useEffect, useState } from "react"
import { Marker, useMap } from "react-map-gl/maplibre"
import { Badge } from "../../ui/Badge"
import { PhotoCluster, RenderPhotoFunction } from "./PhotoCluster"
import type { GetImageFunction } from "./types"
import useFeatures from "../../hooks/useFeatures"

export type PhotoLayerProps = {
    featuresLayerId: string
    clusterRadius: number
    getImage: GetImageFunction
    iconLayout: ImageMarkerLayout
    iconSize: number
    iconSizeCluster?: number
}

export const PhotoLayer: React.FC<PhotoLayerProps> = ({ featuresLayerId, clusterRadius, getImage, iconLayout, iconSize, iconSizeCluster }) => {
    const { current } = useMap()
    const [activeImage, setActiveImage] = useState<string | number | null>(null)
    const features = useFeatures({
        layerId: featuresLayerId,
        map: current?.getMap(),
    })

    useEffect(() => {
        const map = current?.getMap()
        if (!map) {
            return
        }

        const cb = () => {
            setActiveImage(null)
        }

        map.on("click", cb)

        return () => {
            map.off("click", cb)
        }
    }, [current])

    const renderPhoto = useCallback<RenderPhotoFunction>((feature, isCluster) => {
        const [lng, lat] = feature.geometry.coordinates
        let id = feature.id! // useFeatures hook makes sure feature has id

        if (isCluster) {
            const src = feature.properties!.src
            id = feature.properties!.cluster_id
            const clusterSize = feature.properties!.point_count

            return (
                <Marker key={id} longitude={lng} latitude={lat}>
                    <ImageMarker
                        src={src}
                        size={iconSizeCluster ?? iconSize}
                        layout={iconLayout}
                        onHover={() => {

                        }}
                    >
                        <Badge
                            top={0}
                            right={0}
                        >
                            {clusterSize}
                        </Badge>
                    </ImageMarker>
                </Marker>
            )
        }

        const { src } = getImage(feature.properties!)
        const active = activeImage === id

        return (
            <div key={id} style={{ position: "relative", zIndex: 0 }}>
                <Marker
                    longitude={lng}
                    latitude={lat}
                    onClick={(event) => {
                        event.originalEvent.stopPropagation()

                        setActiveImage(id)
                    }}
                    style={{
                        zIndex: active
                            ? 100
                            : 1,
                    }}
                >
                    <ImageMarker
                        src={src}
                        size={iconSize}
                        layout={iconLayout}
                        onHover={() => {

                        }}
                    />
                </Marker>
            </div>
        )
    }, [iconLayout, iconSize, iconSizeCluster, getImage, activeImage])

    return (
        <PhotoCluster
            radius={clusterRadius}
            data={features.filter(f => {
                const { src } = getImage(f.properties!)
                return !!src
            }) as any}
            renderPhoto={renderPhoto}
            mapProperties={getImage}
        />
    )
}
