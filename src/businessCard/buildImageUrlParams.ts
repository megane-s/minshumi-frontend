import { BusinessCard, BusinessCardInterestTag, BusinessCardLikeArt } from "./type"

export const buildImageUrlParams = ({
    type, username, icon, interestTags, arts, backgroundImage, themeColor, rank,
}: {
    type: string
    username: string
    icon: string
    interestTags: string[],
    arts: string[],
    backgroundImage: string,
    themeColor: string,
    rank: string | null,
}) => {
    const params = {
        type,
        username,
        icon,
        interest_tags: interestTags.join(","),
        arts: arts.join(","),
        background_image: backgroundImage,
        theme_color: themeColor,
        rank: rank ?? "",
    }
    return params
}

export const buildImageUrlParamsFromBusinessCard = (
    businessCard: BusinessCard,
    interestTags: BusinessCardInterestTag[],
    arts: BusinessCardLikeArt[],
) =>
    buildImageUrlParams({
        type: businessCard.type,
        username: businessCard.name,
        icon: businessCard.imageUrl,
        interestTags,
        arts,
        backgroundImage: businessCard.backgroundImageUrl,
        themeColor: businessCard.themeColor,
        rank: businessCard.rank,
    })
