import { Loader } from "@/components/Loader"
import { center } from "styled-system/patterns"

const LoadingPage = () => {
    return (
        <div className={center({ my: "xl" })}>
            <Loader
                size="xl"
            />
        </div>
    )
}
export default LoadingPage
