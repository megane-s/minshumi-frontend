import { ComponentProps } from 'react';
import { IoMdInformation } from 'react-icons/io';

export const InfoIcon = (props: ComponentProps<typeof IoMdInformation>) => {
    return <IoMdInformation {...props} />
}
