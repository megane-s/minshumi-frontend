import LinkButton from '@/components/LinkButton'
import { PageTitle } from '@/components/PageTitle'
import Image from 'next/image'

export default function NotFound() {
    return (
        <div>
            <center>
                <Image
                    src="/404.png"
                    alt='404'
                    width={800}
                    height={400}
                />


                <PageTitle style={{ color: 'red' }}>
                    指定されたページが見つかりません
                </PageTitle>

                <LinkButton href="/">
                    トップに戻る
                </LinkButton>
            </center>
        </div>
    )
}
