import { ActionIcon, Badge, Button, Card, MantineTheme, TextInput, Textarea } from "@mantine/core";
import styles from "./styles.module.css"

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
    Button: Button.extend({
        defaultProps: {
            variant: "default",
            w: "fit-content",
        },
    }),
    ActionIcon: ActionIcon.extend({
        defaultProps: {
            variant: "filled",
            size: "xl",
        },
    }),
    Badge: Badge.extend({
        classNames: {
            // 自動的に大文字になるのを防ぐ
            root: styles.badge,
        }
    }),
}
