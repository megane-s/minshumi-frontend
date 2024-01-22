import MutateButton from "@/components/MutateButton"
import { useMutate } from "@/util/client/useMutate"
import { FC } from "react"
import { deleteBusinessCardAction } from "./actions";

interface BusinessCardDeleteProps {
    businessCardId: string;
}
export const BusinessCardDelete: FC<BusinessCardDeleteProps> = ({ businessCardId }) => {
    const deleteBusinessCard = useMutate(async () => {
        // TODO サーバアクションを呼び出す
        await deleteBusinessCardAction(businessCardId)
    }, {
        loading: { toast: "削除しています", button: "削除中" },
        onSuccess: { toast: "削除しました" },
        onError: { toast: "削除できませんでした" },
    })
    return (
        <MutateButton mutation={deleteBusinessCard} variant="light" color="error">
            削除
        </MutateButton>
    )
}

