import { memo } from "react"

import "./style.css"

export type ImageMarkerLayout = "circle" | "square"

export type ImageMarkerProps = {
    src: string
    size: number
    layout: ImageMarkerLayout
    style?: React.CSSProperties
    children?: React.ReactNode
    onHover?: () => void
}

export const ImageMarker: React.FC<ImageMarkerProps> = memo(({ src, size, layout, style, children, onHover }) => {
    return (
        <span
            className={`icon ${layout}`}
            style={{
                ...style,
                width: size,
                height: size,
                backgroundImage: `url(${src})`,
            }}
            onMouseEnter={onHover}
        >
            {children}
        </span>
    )
})

ImageMarker.displayName = "ImageMarker"
