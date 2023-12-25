
const colors = {
    primary: [
        "#FF922B",
        "#FFC078",
        "#FFD8A8",
    ],
    primaryText: [
        "#000000",
        "#000000",
        "#000000",
    ],
    error: [
        "#E03131",
        "#FA5252",
        "#FF8787",
    ],
    errorText: [
        "#FFFFFF",
        "#000000",
        "#000000",
    ],
    warn: [
        "#FFD43B",
        "#FFE066",
        "#FFEC99",
    ],
    warnText: [
        "#000000",
        "#000000",
        "#000000",
    ],
    success: [
        "#40C057",
        "#69DB7C",
        "#B2F2BB",
    ],
    successText: [
        "#000000",
        "#000000",
        "#000000",
    ],
    info: [
        "#228BE6",
        "#4DABF7",
        "#A5D8FF",
    ],
    infoText: [
        "#000000",
        "#000000",
        "#000000",
    ],
    background: [
        "#EFEFEF",
        "#F5F3F2",
        "#F8F9FA",
    ],
    backgroundText: [
        "#3F4149",
        "#3F4149",
        "#3F4149",
    ],
} as const

const shape = {
    none: 0,
    sm: 4,
    md: 9,
    lg: 15,
} as const

const spacing = {
    xs: 0.625 * 16,
    sm: 0.750 * 16,
    md: 1.000 * 16,
    lg: 1.250 * 16,
    xl: 2.000 * 16,
}

export const minshumiTheme = {
    colors,
    shape,
    spacing,
} as const

export type MinshumiTheme = typeof minshumiTheme
