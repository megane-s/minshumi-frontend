"use server"


import { revalidatePath } from "next/cache";
import { updateNewArtSession } from "./cookies";
import { NewArtSessionInput } from "./type";

export const updateNewArtSessionAction = async (input: NewArtSessionInput, revalidateKey: string) => {
    await updateNewArtSession(input)
    revalidatePath(revalidateKey)
}
