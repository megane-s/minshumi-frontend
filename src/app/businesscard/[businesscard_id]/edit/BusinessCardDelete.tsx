import MutateButton from "@/components/MutateButton"
import { useMutate } from "@/util/client/useMutate"
import { FC } from "react"

interface BusinessCardDeleteProps {
    businessCardId: string;
}
export const BusinessCardDelete: FC<BusinessCardDeleteProps> = () => {
    const deleteBusinessCard = useMutate(async () => {
        // TODO サーバアクションを呼び出す
        //後はここ
        // await deleteBusinessCardAction(businessCardId)
    }, {
        loading: { toast: "削除中", button: "削除してる" },
        onSuccess: { toast: "削除しました" },
        onError: { toast: "削除できませんでした" },
    })
    return (
        <MutateButton mutation={deleteBusinessCard} variant="light" color="error">
            削除
        </MutateButton>
    )
}

