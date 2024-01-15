import LinkButton from '@/components/LinkButton'
import Image from 'next/image'

export default function NotFound() {
    return (
        <div>
            <Image
                src="/404.png"
                alt='404'
                width={800}
                height={400}
            />

            <center>
                <p style={{ color: 'red' }}>
                    指定されたページが見つかりません
                </p>

                <LinkButton href="/">
                    トップに戻る
                </LinkButton>
            </center>
        </div>
    )
}
