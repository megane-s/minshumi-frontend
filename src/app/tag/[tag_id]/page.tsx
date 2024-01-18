//タグごとの作品一覧
import { getArtsWithTag } from "@/art/tag/getArts"
import { ArtListItem } from "./ArtListItem"
import { PageTitle } from "@/components/PageTitle"
import Image from 'next/image'
import { Flex } from "@mantine/core"
import { SectionTitle } from "@/components/SectionTitle"
import LinkButton from "@/components/LinkButton"

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
                <Flex justify="center" align="center" p={50}>
                    <center>
                        <Image
                            src="/cat.png"
                            alt='404'
                            width={200}
                            height={400}
                        />
                        <PageTitle >
                            作品がまだ無いようです....
                        </PageTitle>
                        <SectionTitle>
                            作品を追加してみよう<LinkButton href="/art/new" variant="gradient">作品追加</LinkButton>
                        </SectionTitle>

                    </center>
                </Flex>
            }

        </div>
    )
}
export default TagDetailPage
