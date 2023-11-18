import { Card, MantineTheme } from "@mantine/core";

export const components: MantineTheme["components"] = {
    Card: Card.extend({
        defaultProps: {
            bg: "background.2",
        },
    })
}
