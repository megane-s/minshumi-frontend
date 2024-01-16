"use client"

import LinkButton from "@/components/LinkButton"
import { PageTitle } from "@/components/PageTitle"
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

                <PageTitle style={{ color: 'red' }}>
                    指定されたページが表示できませんでした
                </PageTitle>

                <LinkButton href="/">
                    トップに戻る
                </LinkButton>
            </center>
        </div>
    )
}
export default ErrorPage