import { MantineProvider } from "@mantine/core"
import { FC, ReactNode } from "react"
import "@mantine/core/styles.css"
import "./globals.css"
import { mantineTheme } from "./mantine/theme"

interface StyleProviderProps {
    children: ReactNode
}
const StyleProvider: FC<StyleProviderProps> = ({ children }) => {
    return (
        <MantineProvider theme={mantineTheme}>
            {children}
        </MantineProvider>
    )
}

export default StyleProvider
