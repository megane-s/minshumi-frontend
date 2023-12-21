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

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const FollowerScalarFieldEnumSchema = z.enum(['userId','followerId']);

export const BlockUserScalarFieldEnumSchema = z.enum(['userId','blockUserId']);

export const UserRankScalarFieldEnumSchema = z.enum(['userId','rank']);

export const ArtScalarFieldEnumSchema = z.enum(['artId','title','imageUrl','description','userId']);

export const RelatedArtScalarFieldEnumSchema = z.enum(['userId','artId','relatedArtId','artArtId']);

export const ArtTagScalarFieldEnumSchema = z.enum(['artId','tag']);

export const InterestTagScalarFieldEnumSchema = z.enum(['userId','tag']);

export const ArtGoodUserScalarFieldEnumSchema = z.enum(['artId','userId','artArtId']);

export const RecommendArtScalarFieldEnumSchema = z.enum(['userId','artId','likePoint']);

export const WatchingArtScalarFieldEnumSchema = z.enum(['userId','artId']);

export const BookmarkArtScalarFieldEnumSchema = z.enum(['userId','artId']);

export const BusinessCardScalarFieldEnumSchema = z.enum(['businessCardId','userId','backgroundImageUrl','canComment','imageUrl']);

export const BusinessCardLikeArtScalarFieldEnumSchema = z.enum(['businessCardId','likeArtId']);

export const BusinessCardRankScalarFieldEnumSchema = z.enum(['businessCardId','rank']);

export const BusinessCardCommentScalarFieldEnumSchema = z.enum(['commentId','businessCardId','content','commentUserId','createAt','updateAt']);

export const BusinessCardCommentGoodUserScalarFieldEnumSchema = z.enum(['commentId','goodUserId']);

export const BusinessCardGoodUserScalarFieldEnumSchema = z.enum(['businessCardId','userId']);

export const NotificationScalarFieldEnumSchema = z.enum(['notificationId','userId','content','type']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
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
})

export type User = z.infer<typeof UserSchema>

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
  userId: z.string().nullable(),
})

export type Art = z.infer<typeof ArtSchema>

/////////////////////////////////////////
// RELATED ART SCHEMA
/////////////////////////////////////////

export const RelatedArtSchema = z.object({
  userId: z.string(),
  artId: z.string(),
  relatedArtId: z.string(),
  artArtId: z.string().nullable(),
})

export type RelatedArt = z.infer<typeof RelatedArtSchema>

/////////////////////////////////////////
// ART TAG SCHEMA
/////////////////////////////////////////

export const ArtTagSchema = z.object({
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
// RECOMMEND ART SCHEMA
/////////////////////////////////////////

export const RecommendArtSchema = z.object({
  userId: z.string(),
  artId: z.string(),
  likePoint: z.string(),
})

export type RecommendArt = z.infer<typeof RecommendArtSchema>

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
  backgroundImageUrl: z.string(),
  canComment: z.boolean(),
  imageUrl: z.string(),
})

export type BusinessCard = z.infer<typeof BusinessCardSchema>

/////////////////////////////////////////
// BUSINESS CARD LIKE ART SCHEMA
/////////////////////////////////////////

export const BusinessCardLikeArtSchema = z.object({
  businessCardId: z.string(),
  likeArtId: z.string(),
})

export type BusinessCardLikeArt = z.infer<typeof BusinessCardLikeArtSchema>

/////////////////////////////////////////
// BUSINESS CARD RANK SCHEMA
/////////////////////////////////////////

export const BusinessCardRankSchema = z.object({
  businessCardId: z.string(),
  rank: z.string(),
})

export type BusinessCardRank = z.infer<typeof BusinessCardRankSchema>

/////////////////////////////////////////
// BUSINESS CARD COMMENT SCHEMA
/////////////////////////////////////////

export const BusinessCardCommentSchema = z.object({
  commentId: z.string().cuid(),
  businessCardId: z.string(),
  content: z.string(),
  commentUserId: z.string(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
})

export type BusinessCardComment = z.infer<typeof BusinessCardCommentSchema>

/////////////////////////////////////////
// BUSINESS CARD COMMENT GOOD USER SCHEMA
/////////////////////////////////////////

export const BusinessCardCommentGoodUserSchema = z.object({
  commentId: z.string(),
  goodUserId: z.string(),
})

export type BusinessCardCommentGoodUser = z.infer<typeof BusinessCardCommentGoodUserSchema>

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
