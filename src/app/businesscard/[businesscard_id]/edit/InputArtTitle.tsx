import { useSuggestTitle } from "@/art/components/SelectArt"
import { Loader } from "@/components/Loader"
import { TextInput } from "@/components/TextInput"
import { Combobox, useCombobox } from "@mantine/core"
import { ComponentProps, FC } from "react"
import { cx } from "styled-system/css"

interface InputArtTitleProps extends ComponentProps<"div"> {
    title: string
    onChangeTitle: (title: string) => void
}
export const InputArtTitle: FC<InputArtTitleProps> = ({ className, title, onChangeTitle, ...props }) => {
    const suggestions = useSuggestTitle(title)
    const combobox = useCombobox();
    return (
        <Combobox
            onOptionSubmit={value => {
                onChangeTitle(value)
                combobox.closeDropdown()
            }}
            store={combobox}
            withinPortal={false}
        >
            <Combobox.Target>
                <TextInput
                    className={cx(className)}
                    placeholder="作品名を入力"
                    value={title}
                    onChange={e => {
                        onChangeTitle(e.target.value)
                        combobox.openDropdown()
                        combobox.updateSelectedOptionIndex()
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                />
            </Combobox.Target>
            <Combobox.Dropdown>
                <Combobox.Options>
                    {/* {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options} */}
                    {suggestions.data && <>
                        <Combobox.Group label="🔍 もしかして ...">
                            {suggestions.data.map(suggest =>
                                <Combobox.Option key={suggest.artId} value={suggest.title}>
                                    {suggest.title}
                                </Combobox.Option>
                            )}
                        </Combobox.Group>
                    </>}
                    {suggestions.isFetching &&
                        <Loader />
                    }
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
        // <Autocomplete
        //     className={cx(className)}
        //     data={Array.from(new Set(suggestions.data?.map(suggest => suggest.title))) ?? []}
        //     value={title ?? ""}
        //     onChange={(art) => onChangeTitle(art)}
        //     placeholder="作品名を入力"
        //     comboboxProps={{
        //         portalProps: {
        //             className: css({ bg: "red" })
        //         }
        //     }}
        //     {...props}
        // />
    )
}
