"use client"

import LinkButton from "@/components/LinkButton"
import Image from 'next/image'

const ErrorPage = () => {
    return (
        <div>
            <center>
                <Image
                    src="/500.png"
                    alt='500'
                    width={800}
                    height={400}
                />

                <p style={{ color: 'red' }}>
                    指定されたページが表示できませんでした
                </p>

                <LinkButton href="/">
                    トップに戻る
                </LinkButton>
            </center>
        </div>
    )
}
export default ErrorPage