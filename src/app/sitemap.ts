import { getArts } from "@/art/get";
import { getAllTags } from "@/art/tag/get";
import { getUsers } from "@/user/get";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const current = new Date()
  const [arts, users, tags] = await Promise.all([
    getArts(),
    getUsers(),
    getAllTags(),
  ])
  return [
    // トップ
    {
      url: url(""),
      lastModified: current,
      changeFrequency: "yearly",
      priority: 1,
    },
    // 作品
    ...arts.map(art => ({
      url: url(`/art/${art.artId}`),
      lastModified: current,
      changeFrequency: "monthly",
      priority: 0.9,
    } as const)),
    // ユーザ
    ...users.map(user => ({
      url: url(`/user/${user.id}`),
      lastModified: current,
      changeFrequency: "monthly",
      priority: 0.6,
    } as const)),
    // タグ
    ...tags.map(tag => ({
      url: url(`/tag/${tag}`),
      lastModified: current,
      changeFrequency: "monthly",
      priority: 0.8,
    } as const)),
    // 検索
    {
      url: url("/search/art"),
      lastModified: current,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: url("/search/user"),
      lastModified: current,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ]
}

const url = (path: string) => {
  const baseUrl = new URL("https://minshumi.com")
  baseUrl.pathname = path
  return baseUrl.toString()
}
