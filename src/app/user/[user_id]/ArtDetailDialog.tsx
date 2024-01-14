import { ArtAppeal } from "@/art/type"
import { Dialog, DialogProps } from "@/components/Dialog"
import LinkButton from "@/components/LinkButton"
import { SectionTitle } from "@/components/SectionTitle"
import Link from "next/link"
import { FC } from "react"
import Image from "next/image"
import { flex } from "styled-system/patterns"

interface ArtDetailDialogProps extends DialogProps {
    art: ArtAppeal
}
export const ArtDetailDialog: FC<ArtDetailDialogProps> = ({ art, ...dialogProps }) => {
    return (
        <Dialog {...dialogProps}>
            <Link href={`/art/${art.artId}`} >
                <Image
                    src={art.imageUrl}
                    alt={art.title}
                    width={200}
                    height={100}
                    style={{ width: "100%", height: "auto", maxHeight: "50vh", objectFit: "cover" }}
                />
            </Link>

            <SectionTitle>
                <div className={flex({ w: "100%", justify: "space-between", align: "center", my: "sm" })}>
                    <div>
                        {art.title}
                    </div>
                    <LinkButton variant="light" size="xs" href={`/art/${art.artId}`}>
                        作品のページへ
                    </LinkButton>
                </div>
            </SectionTitle>
            {art.likePoint}
        </Dialog>
    )
}
