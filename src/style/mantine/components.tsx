import { Card, MantineTheme, TextInput, Textarea } from "@mantine/core";

export const components: MantineTheme["components"] = {
    Card: Card.extend({
        defaultProps: {
            bg: "background.2",
            withBorder: true,
        },
    }),
    TextInput: TextInput.extend({
        defaultProps: {
            styles: { input: { backgroundColor: "transparent" } }
        }
    }),
    Textarea: Textarea.extend({
        defaultProps: {
            styles: { input: { backgroundColor: "transparent" } }
        }
    }),
}
