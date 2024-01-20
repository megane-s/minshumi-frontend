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
    defaultValues: Pick<BusinessCard, "isPublish"> & { isPinned: boolean }
}
export const BusinessCardPublishForm: FC<BusinessCardPublishFormProps> = ({ businessCardId, className, defaultValues }) => {
    const [isPublish, setIsPublish] = useState(defaultValues.isPublish)
    const [isPinned, setIsPinned] = useState(defaultValues.isPinned)

    const publish = useMutate(async () => {
        await handleSaveBusinessCard(businessCardId, { isPublish, isPinned: isPinned || undefined })
    }, {
        loading: { toast: isPublish ? "公開中" : "保存中" },
        onSuccess: { toast: isPublish ? "公開しました" : "保存しました" },
        onError: { toast: isPublish ? "公開できませんでした" : "保存できませんでした" },
    })
    return (
        <div className={cx(flex({ flexDir: "column", gap: "md" }), className)}>
            <Card>
                <Switch
                    label="名刺を公開"
                    description="名刺を公開すると自分以外の人も名刺を閲覧できるようになったり、プロフィール画面に表示することができるようになります。"
                    className={css({ my: "md" })}
                    checked={isPublish}
                    onChange={e => setIsPublish(e.target.checked)}
                />
                {!defaultValues.isPinned &&
                    <Switch
                        label="プロフィールに表示"
                        description="作成した名刺がプロフィール画面に表示されます。"
                        className={css({ my: "md" })}
                        checked={isPublish && isPinned}
                        disabled={!isPublish}
                        onChange={e => setIsPinned(e.target.checked)}
                    />
                }
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
