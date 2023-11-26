import { Art } from "@/art/type";

export type InputRelatedArt = (
    | Pick<Art, "title" | "imageUrl"> // 新規に登録する作品
    | Art // すでに存在する作品
)
export type InputRelatedArts = InputRelatedArt[]
