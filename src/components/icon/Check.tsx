import { ComponentProps } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

export const CheckIcon = (props: ComponentProps<typeof IoMdCheckmark>) => {
    return <IoMdCheckmark {...props} />
}
