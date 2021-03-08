export function randomFromRange(range) {
    return Math.floor(Math.random() * range)
}

export function randomFromArray(array) {
    const i = randomFromRange(array.length)
    return array[i]
}

export function randomRGB() {
    const colorObject = {}
    colorObject.red = randomFromRange(256)
    colorObject.green = randomFromRange(256)
    colorObject.blue = randomFromRange(256)
    const rgb = `rgba(${colorObject.red}, ${colorObject.green}, ${colorObject.blue}, 1)`
    colorObject.rgb = rgb
    return colorObject
}