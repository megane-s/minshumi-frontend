import { useSuggestTitle } from "@/art/components/SelectArt"
import { CenterLoader } from "@/components/CenterLoader"
import { TextInput } from "@/components/TextInput"
import { Combobox, useCombobox } from "@mantine/core"
import { ComponentProps, FC, ReactNode } from "react"

interface InputArtTitleProps extends ComponentProps<typeof Combobox> {
    title: string
    onChangeTitle: (title: string) => void
    error?: ReactNode
}
export const InputArtTitle: FC<InputArtTitleProps> = ({ title, onChangeTitle, error, ...props }) => {
    const suggestions = useSuggestTitle(title)
    const combobox = useCombobox()
    return (
        <Combobox
            onOptionSubmit={value => {
                onChangeTitle(value)
                combobox.closeDropdown()
            }}
            store={combobox}
            withinPortal={false}
            {...props}
        >
            <Combobox.Target>
                <TextInput
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
                    error={error}
                />
            </Combobox.Target>
            <Combobox.Dropdown hidden={!(suggestions.isFetching || suggestions.data?.length !== 0)}>
                <Combobox.Options>
                    {!!suggestions.data?.length && <>
                        <Combobox.Group label="🔍 もしかして ...">
                            {suggestions.data.map(suggest =>
                                <Combobox.Option key={suggest.artId} value={suggest.title}>
                                    {suggest.title}
                                </Combobox.Option>
                            )}
                            {suggestions.isFetching &&
                                <CenterLoader />
                            }
                        </Combobox.Group>
                    </>}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}
