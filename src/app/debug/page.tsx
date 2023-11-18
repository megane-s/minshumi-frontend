import { onlyDevelopPage } from "@/util/server/onlyDevelop";
import Content from "./Content";

export default function DebugPage() {
    onlyDevelopPage()
    return (
        <Content />
    )
}
