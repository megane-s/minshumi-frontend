"use client"

import LinkButton from "@/components/LinkButton"
import Image from 'next/image'

const ErrorPage = () => {
    return (
        <div>
            <Image
                src="/500.png"
                alt='500'
                width={800}
                height={800}
            />

            <p>指定されたページが表示できませんでした</p>
            <LinkButton href="/">
                トップに戻る
            </LinkButton>
        </div>
    )
}
export default ErrorPage