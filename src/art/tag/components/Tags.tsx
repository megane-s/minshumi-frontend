import { ArtTag } from "@/art/type"
import { Badge } from "@/components/Badge"
import { Flex } from "@mantine/core"
import Link from "next/link"
import { FC } from "react"

interface TagsProps {
  tags: ArtTag[]
}
export const Tags: FC<TagsProps> = ({ tags }) => {
  return (
    <Flex gap="xs" wrap="wrap" rowGap="0px" columnGap="xs">
      {tags.map(tag =>
        <Link href={`/tag/${tag}`} key={tag}>
          <Badge>
            {tag}
          </Badge>
        </Link>
      )}
    </Flex>
  )
}
