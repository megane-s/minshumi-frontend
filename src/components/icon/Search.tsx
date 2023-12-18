import { ComponentProps } from 'react';
import { IoMdSearch } from 'react-icons/io';

export const SearchIcon = (props: ComponentProps<typeof IoMdSearch>) => {
    return <IoMdSearch {...props} />
}
