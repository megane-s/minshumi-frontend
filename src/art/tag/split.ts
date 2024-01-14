import { getGenreTags, medias, others } from "../components/tag/tags"
import { ArtTag } from "../type"

export const splitTags = (tags: ArtTag[]) => {
    const mediaTags: ArtTag[] = []
    const genreTags: ArtTag[] = []
    const otherTags: ArtTag[] = []
    // media と other
    const notGroupedTags: ArtTag[] = []
    tags.forEach((tag) => {
        if (medias.includes(tag)) {
            mediaTags.push(tag)
        } else if (others.includes(tag)) {
            otherTags.push(tag)
        } else {
            notGroupedTags.push(tag)
        }
    })
    // genre
    const genres = getGenreTags(mediaTags)
    notGroupedTags.forEach((tag, index) => {
        if (genres.includes(tag)) {
            genreTags.push(tag)
            notGroupedTags.splice(index, 1)
        }
    })
    // originalTags
    const originalTags: ArtTag[] = notGroupedTags
    return {
        mediaTags,
        genreTags,
        otherTags,
        originalTags,
    }
}
