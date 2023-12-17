import { DEFAULT_THEME, createTheme, mergeMantineTheme } from "@mantine/core"
import { MinshumiTheme, minshumiTheme } from "../theme"
import { components } from "./components"

const mTheme = minshumiTheme
const mColors = mTheme.colors
const mShape = mTheme.shape

const minshumiColorSchemeToMantine = <Scheme extends keyof MinshumiTheme["colors"]>(scheme: Scheme) => {
    return [
        ...mColors[scheme],
        mColors[scheme][0], mColors[scheme][0], mColors[scheme][0], mColors[scheme][0], mColors[scheme][0], mColors[scheme][0], mColors[scheme][0],
    ] as const
}

const themeOverride = createTheme({
    focusRing: "auto",
    colors: {
        primary: minshumiColorSchemeToMantine("primary"),
        primaryText: minshumiColorSchemeToMantine("primaryText"),
        error: minshumiColorSchemeToMantine("error"),
        errorText: minshumiColorSchemeToMantine("errorText"),
        warn: minshumiColorSchemeToMantine("warn"),
        warnText: minshumiColorSchemeToMantine("warnText"),
        success: minshumiColorSchemeToMantine("success"),
        successText: minshumiColorSchemeToMantine("successText"),
        info: minshumiColorSchemeToMantine("info"),
        infoText: minshumiColorSchemeToMantine("infoText"),
        background: minshumiColorSchemeToMantine("background"),
        backgroundText: minshumiColorSchemeToMantine("backgroundText"),
    },
    primaryColor: "primary",
    radius: {
        xs: mShape.none + "px",
        sm: mShape.sm + "px",
        md: mShape.md + "px",
        lg: mShape.lg + "px",
    },
    defaultRadius: "md",
    white: mColors.background[1],
    defaultGradient: {
        from: mColors.primary[0],
        to: mColors.primary[1],
        deg: 90,
    },
    components,
    breakpoints: {
        xs: '36em',
        sm: '48em',
        md: '62em',
        lg: '75em',
        xl: '88em',
    },
})

export const mantineTheme = mergeMantineTheme(DEFAULT_THEME, themeOverride)
