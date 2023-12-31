import { BackgroundImageInput } from "./Background";
import { IconImageInput } from "./Icon";
import { ImageInputProps } from "./type";

export const ImageInput = (props: ImageInputProps) => {
    if (props.type === "background") {
        return <BackgroundImageInput {...props} />
    } else {
        return <IconImageInput {...props} />
    }
}