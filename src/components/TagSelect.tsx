"use client"

import { ArtTag } from "@/art/type"
import { FC, memo } from "react"
import { Flex, FlexProps } from "@mantine/core"
import { Button } from "./Button"
import { CheckIcon } from "./icon/Check"

const toggleTag = (prevTags: ArtTag[], tag: ArtTag) => {
    const newTags = [...prevTags]
    const index = newTags.indexOf(tag)
    if (index !== -1) {
        newTags.splice(index, 1)
    } else {
        newTags.push(tag)
    }
    return newTags
}

interface TagSelectProps extends FlexProps {
    selectedTags: ArtTag[]
    onChangeSelected: (selectedTags: ArtTag[]) => void
    tags: ArtTag[]
}
const TagSelect: FC<TagSelectProps> = ({ selectedTags, tags, onChangeSelected, ...props }) => {
    return (
        <Flex gap="xs" wrap="wrap" {...props}>
            {tags.map(tag =>
                <TagSelectItem
                    key={tag}
                    tag={tag}
                    isSelected={selectedTags.includes(tag)}
                    onClick={() => onChangeSelected(toggleTag(selectedTags, tag))}
                />
            )}
        </Flex>
    )
}

export default memo(TagSelect)

interface TagSelectItemProps {
    onClick: () => void
    tag: ArtTag
    isSelected: boolean
}
const TagSelectItem: FC<TagSelectItemProps> = ({ tag, isSelected, onClick }) => {
    return (
        <Button key={tag}
            variant={isSelected ? "filled" : "outline"}
            size="compact-sm"
            radius="xl"
            onClick={onClick}
            leftSection={isSelected && <CheckIcon />}
        >
            {tag}
        </Button>
    )
}
