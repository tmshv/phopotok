import "./style.css"

export type BadgeProps = {
    top?: number
    right?: number
    children?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ top, right, children }) => {
    return (
        <div
            className="badge"
            style={{
                position: "absolute",
                top: top ?? 0,
                right: right ?? 0,
            }}
        >
            {children}
        </div>
    )
}
