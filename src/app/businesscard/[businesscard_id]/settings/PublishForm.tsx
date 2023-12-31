"use client"

import { BusinessCard, BusinessCardId } from "@/businessCard/type"
import { Card } from "@/components/Card"
import MutateButton from "@/components/MutateButton"
import { Switch } from "@/components/Switch"
import { useMutate } from "@/util/client/useMutate"
import { FC, useState } from "react"
import { css, cx } from "styled-system/css"
import { flex } from "styled-system/patterns"
import { handleSaveBusinessCard } from "../edit/actions"

interface BusinessCardPublishFormProps {
    businessCardId: BusinessCardId
    className?: string
    defaultValues: Pick<BusinessCard, "isPublish" | "canComment">
}
export const BusinessCardPublishForm: FC<BusinessCardPublishFormProps> = ({ businessCardId, className, defaultValues }) => {
    const [isPublish, setIsPublish] = useState(defaultValues.isPublish)
    const [canComment, setCanComment] = useState(defaultValues.canComment)

    const publish = useMutate(async () => {
        await handleSaveBusinessCard(businessCardId, { isPublish, canComment })
    }, {
        loading: { toast: isPublish ? "公開中" : "保存中" },
        onSuccess: { toast: isPublish ? "公開しました" : "保存しました" },
        onError: { toast: isPublish ? "公開できませんでした" : "保存できませんでした" },
    })
    return (
        <div className={cx(flex({ flexDir: "column", gap: "md" }), className)}>
            <Card>
                <Switch
                    label="名刺を公開する"
                    description="名刺を公開すると自分以外の人も名刺を閲覧できるようになったり、プロフィール画面に表示することができるようになります。"
                    className={css({ my: "md" })}
                    checked={isPublish}
                    onChange={e => setIsPublish(e.target.checked)}
                />
                <Switch
                    label="コメントを許可する"
                    description="名刺の他のユーザがコメントできるようにします。"
                    className={css({ my: "md" })}
                    checked={isPublish && canComment}
                    disabled={!isPublish}
                    onChange={e => setCanComment(e.target.checked)}
                />
            </Card>
            <div className={flex({ justify: "center" })}>
                <MutateButton mutation={publish} variant="filled">
                    {isPublish
                        ? "公開"
                        : "保存"
                    }
                </MutateButton>
            </div>
        </div>
    )
}
