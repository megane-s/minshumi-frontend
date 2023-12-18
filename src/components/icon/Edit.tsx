import { ComponentProps } from 'react';
import { SlPencil } from 'react-icons/sl';

export const EditIcon = (props: ComponentProps<typeof SlPencil>) => {
    return <SlPencil {...props} />
}
