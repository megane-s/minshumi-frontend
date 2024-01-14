"use server"

import { updateInterestTags } from '@/art/tag/interest/update';
import { ArtTag } from '@/art/type';
import { getSession } from '@/auth/server/auth';
import { notImplementError } from '@/util/notImplement';

export const handleUpdateInterestTags = async ({
    mediaTags,
    genreTags,
    otherTags,
    originalTags,
}: {
    mediaTags: ArtTag[],
    genreTags: ArtTag[],
    otherTags: ArtTag[],
    originalTags: ArtTag[],
}) => {
    const session = await getSession()
    if (!session) {
        throw notImplementError(`ログインする必要があります`)
    }
    await updateInterestTags(session.user.id, [
        ...mediaTags,
        ...genreTags,
        ...otherTags,
        ...originalTags,
    ])
}
