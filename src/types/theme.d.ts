import { MantineColorsTuple } from "@mantine/core";
import { minshumiTheme } from '../style/theme';

type CustomColorSchemes = keyof (typeof minshumiTheme)["colors"]
type CustomColors = CustomColorSchemes | `${CustomColorSchemes}.${0 | 1 | 2}`

declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        colors: Record<CustomColors, MantineColorsTuple>;
    }
}
