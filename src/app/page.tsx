import { getArtsWithTag } from "@/art/tag/getArts"

export default async function Home() {
  const arts = await getArtsWithTag("アニメ")
  console.log(arts)
  return (
    <main>
    </main>
  )
}
