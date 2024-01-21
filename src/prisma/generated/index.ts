import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const TestScalarFieldEnumSchema = z.enum(['id','createAt','updateAt','message']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','pinnedBusinessCardId']);

export const UserCommentScalarFieldEnumSchema = z.enum(['commentId','content','commentUserId','createAt','updateAt']);

export const UserCommentGoodUserScalarFieldEnumSchema = z.enum(['commentId','goodUserId']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const FollowerScalarFieldEnumSchema = z.enum(['userId','followerId']);

export const BlockUserScalarFieldEnumSchema = z.enum(['userId','blockUserId']);

export const UserRankScalarFieldEnumSchema = z.enum(['userId','rank']);

export const ArtScalarFieldEnumSchema = z.enum(['artId','title','imageUrl','description','searchId','userId','createAt','updateAt']);

export const ArtEditHistoryScalarFieldEnumSchema = z.enum(['artId','updateAt','updateUserId']);

export const ArtTitleEditHistoryScalarFieldEnumSchema = z.enum(['artId','updateAt','title']);

export const ArtImageUrlEditHistoryScalarFieldEnumSchema = z.enum(['artId','updateAt','imageUrl']);

export const ArtDescriptionEditHistoryScalarFieldEnumSchema = z.enum(['artId','updateAt','description']);

export const ArtTagsEditHistoryScalarFieldEnumSchema = z.enum(['artId','updateAt','tags']);

export const RelatedArtScalarFieldEnumSchema = z.enum(['userId','artId','relatedArtId','type']);

export const ArtTagScalarFieldEnumSchema = z.enum(['artId','tagType','tag']);

export const InterestTagScalarFieldEnumSchema = z.enum(['userId','tag']);

export const ArtGoodUserScalarFieldEnumSchema = z.enum(['artId','userId','artArtId']);

export const ArtAppealScalarFieldEnumSchema = z.enum(['userId','artId','likePoint']);

export const WatchingArtScalarFieldEnumSchema = z.enum(['userId','artId']);

export const BookmarkArtScalarFieldEnumSchema = z.enum(['userId','artId']);

export const BusinessCardScalarFieldEnumSchema = z.enum(['businessCardId','userId','type','name','rank','themeColor','imageUrl','backgroundImageUrl','isPublish','canComment']);

export const BusinessCardLikeArtScalarFieldEnumSchema = z.enum(['businessCardId','no','likeArtTitle','artArtId']);

export const BusinessCardInterestTagScalarFieldEnumSchema = z.enum(['businessCardId','tag']);

export const BusinessCardGoodUserScalarFieldEnumSchema = z.enum(['businessCardId','userId']);

export const NotificationScalarFieldEnumSchema = z.enum(['notificationId','userId','content','type']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RelatedArtTypeSchema = z.enum(['PREV','NEXT']);

export type RelatedArtTypeType = `${z.infer<typeof RelatedArtTypeSchema>}`

export const ArtTagTypeSchema = z.enum(['MEDIA','GENRE','OTHER','CUSTOM']);

export type ArtTagTypeType = `${z.infer<typeof ArtTagTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TEST SCHEMA
/////////////////////////////////////////

export const TestSchema = z.object({
  id: z.bigint(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
  message: z.string(),
})

export type Test = z.infer<typeof TestSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  pinnedBusinessCardId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER COMMENT SCHEMA
/////////////////////////////////////////

export const UserCommentSchema = z.object({
  commentId: z.string().cuid(),
  content: z.string(),
  commentUserId: z.string(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
})

export type UserComment = z.infer<typeof UserCommentSchema>

/////////////////////////////////////////
// USER COMMENT GOOD USER SCHEMA
/////////////////////////////////////////

export const UserCommentGoodUserSchema = z.object({
  commentId: z.string(),
  goodUserId: z.string(),
})

export type UserCommentGoodUser = z.infer<typeof UserCommentGoodUserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// FOLLOWER SCHEMA
/////////////////////////////////////////

export const FollowerSchema = z.object({
  userId: z.string(),
  followerId: z.string(),
})

export type Follower = z.infer<typeof FollowerSchema>

/////////////////////////////////////////
// BLOCK USER SCHEMA
/////////////////////////////////////////

export const BlockUserSchema = z.object({
  userId: z.string(),
  blockUserId: z.string(),
})

export type BlockUser = z.infer<typeof BlockUserSchema>

/////////////////////////////////////////
// USER RANK SCHEMA
/////////////////////////////////////////

export const UserRankSchema = z.object({
  userId: z.string(),
  rank: z.string(),
})

export type UserRank = z.infer<typeof UserRankSchema>

/////////////////////////////////////////
// ART SCHEMA
/////////////////////////////////////////

export const ArtSchema = z.object({
  artId: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  searchId: z.number().int().nullable(),
  userId: z.string().nullable(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
})

export type Art = z.infer<typeof ArtSchema>

/////////////////////////////////////////
// ART EDIT HISTORY SCHEMA
/////////////////////////////////////////

export const ArtEditHistorySchema = z.object({
  artId: z.string(),
  updateAt: z.coerce.date(),
  updateUserId: z.string().nullable(),
})

export type ArtEditHistory = z.infer<typeof ArtEditHistorySchema>

/////////////////////////////////////////
// ART TITLE EDIT HISTORY SCHEMA
/////////////////////////////////////////

export const ArtTitleEditHistorySchema = z.object({
  artId: z.string(),
  updateAt: z.coerce.date(),
  title: z.string(),
})

export type ArtTitleEditHistory = z.infer<typeof ArtTitleEditHistorySchema>

/////////////////////////////////////////
// ART IMAGE URL EDIT HISTORY SCHEMA
/////////////////////////////////////////

export const ArtImageUrlEditHistorySchema = z.object({
  artId: z.string(),
  updateAt: z.coerce.date(),
  imageUrl: z.string(),
})

export type ArtImageUrlEditHistory = z.infer<typeof ArtImageUrlEditHistorySchema>

/////////////////////////////////////////
// ART DESCRIPTION EDIT HISTORY SCHEMA
/////////////////////////////////////////

export const ArtDescriptionEditHistorySchema = z.object({
  artId: z.string(),
  updateAt: z.coerce.date(),
  description: z.string(),
})

export type ArtDescriptionEditHistory = z.infer<typeof ArtDescriptionEditHistorySchema>

/////////////////////////////////////////
// ART TAGS EDIT HISTORY SCHEMA
/////////////////////////////////////////

export const ArtTagsEditHistorySchema = z.object({
  artId: z.string(),
  updateAt: z.coerce.date(),
  tags: z.string().array(),
})

export type ArtTagsEditHistory = z.infer<typeof ArtTagsEditHistorySchema>

/////////////////////////////////////////
// RELATED ART SCHEMA
/////////////////////////////////////////

export const RelatedArtSchema = z.object({
  type: RelatedArtTypeSchema,
  userId: z.string(),
  artId: z.string(),
  relatedArtId: z.string(),
})

export type RelatedArt = z.infer<typeof RelatedArtSchema>

/////////////////////////////////////////
// ART TAG SCHEMA
/////////////////////////////////////////

export const ArtTagSchema = z.object({
  tagType: ArtTagTypeSchema,
  artId: z.string(),
  tag: z.string(),
})

export type ArtTag = z.infer<typeof ArtTagSchema>

/////////////////////////////////////////
// INTEREST TAG SCHEMA
/////////////////////////////////////////

export const InterestTagSchema = z.object({
  userId: z.string(),
  tag: z.string(),
})

export type InterestTag = z.infer<typeof InterestTagSchema>

/////////////////////////////////////////
// ART GOOD USER SCHEMA
/////////////////////////////////////////

export const ArtGoodUserSchema = z.object({
  artId: z.string(),
  userId: z.string(),
  artArtId: z.string(),
})

export type ArtGoodUser = z.infer<typeof ArtGoodUserSchema>

/////////////////////////////////////////
// ART APPEAL SCHEMA
/////////////////////////////////////////

export const ArtAppealSchema = z.object({
  userId: z.string(),
  artId: z.string(),
  likePoint: z.string(),
})

export type ArtAppeal = z.infer<typeof ArtAppealSchema>

/////////////////////////////////////////
// WATCHING ART SCHEMA
/////////////////////////////////////////

export const WatchingArtSchema = z.object({
  userId: z.string(),
  artId: z.string(),
})

export type WatchingArt = z.infer<typeof WatchingArtSchema>

/////////////////////////////////////////
// BOOKMARK ART SCHEMA
/////////////////////////////////////////

export const BookmarkArtSchema = z.object({
  userId: z.string(),
  artId: z.string(),
})

export type BookmarkArt = z.infer<typeof BookmarkArtSchema>

/////////////////////////////////////////
// BUSINESS CARD SCHEMA
/////////////////////////////////////////

export const BusinessCardSchema = z.object({
  businessCardId: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  name: z.string(),
  rank: z.string().nullable(),
  themeColor: z.string(),
  imageUrl: z.string(),
  backgroundImageUrl: z.string(),
  isPublish: z.boolean(),
  canComment: z.boolean(),
})

export type BusinessCard = z.infer<typeof BusinessCardSchema>

/////////////////////////////////////////
// BUSINESS CARD LIKE ART SCHEMA
/////////////////////////////////////////

export const BusinessCardLikeArtSchema = z.object({
  businessCardId: z.string(),
  no: z.string().cuid(),
  likeArtTitle: z.string(),
  artArtId: z.string().nullable(),
})

export type BusinessCardLikeArt = z.infer<typeof BusinessCardLikeArtSchema>

/////////////////////////////////////////
// BUSINESS CARD INTEREST TAG SCHEMA
/////////////////////////////////////////

export const BusinessCardInterestTagSchema = z.object({
  businessCardId: z.string(),
  tag: z.string(),
})

export type BusinessCardInterestTag = z.infer<typeof BusinessCardInterestTagSchema>

/////////////////////////////////////////
// BUSINESS CARD GOOD USER SCHEMA
/////////////////////////////////////////

export const BusinessCardGoodUserSchema = z.object({
  businessCardId: z.string(),
  userId: z.string(),
})

export type BusinessCardGoodUser = z.infer<typeof BusinessCardGoodUserSchema>

/////////////////////////////////////////
// NOTIFICATION SCHEMA
/////////////////////////////////////////

export const NotificationSchema = z.object({
  notificationId: z.string().cuid(),
  userId: z.string(),
  content: z.string(),
  type: z.string(),
})

export type Notification = z.infer<typeof NotificationSchema>
