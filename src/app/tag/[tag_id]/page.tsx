//タグごとの作品一覧
import { getArtsWithTag } from "@/art/tag/getArts"
import { ArtListItem } from "./ArtListItem"
import { PageTitle } from "@/components/PageTitle"
import Image from 'next/image'
import { Flex } from "@mantine/core"
import { SectionTitle } from "@/components/SectionTitle"
import LinkButton from "@/components/LinkButton"
import { AddIcon } from "@/components/icon/AddIcon"

interface PageProps {
    params: { tag_id: string }
}
const TagDetailPage = async ({ params }: PageProps) => {

    const tag = decodeURI(params.tag_id)

    const arts = await getArtsWithTag(tag)

    return (
        <div>
            <PageTitle mt="xs" mb="xs" px={20} py={20}>
                {tag}
            </PageTitle>

            {arts.map(art =>
                <ArtListItem key={art.artId} art={art} />
            )}

            {/* <button>
                <CiCirclePlus size="2rem" />
            </button> */}


            {arts.length === 0 &&
                <Flex justify="center" align="center" p={50} my="md">
                    <center>
                        <Image
                            src="/cat.png"
                            alt='none'
                            width={200}
                            height={400}
                        />
                        <PageTitle my="md">
                            作品がまだ無いようです....
                        </PageTitle>
                        <SectionTitle my="md">
                            作品を追加してみよう
                        </SectionTitle>
                        <LinkButton href="/art/new" leftSection={<AddIcon />} variant="gradient">
                            作品追加
                        </LinkButton>
                    </center>
                </Flex>
            }

        </div>
    )
}
export default TagDetailPage
