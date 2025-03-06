export type Photo = {
    src: string,
    value: number
}
export type GetImageFunction = (p: GeoJSON.GeoJsonProperties) => Photo
