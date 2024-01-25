import { FC } from "react"

interface DateViewProps {
    date: Date
    variant: "before"
}
// TODO dateによる分岐
const DateView: FC<DateViewProps> = ({ date }) => {
    const today = new Date()
    if (today.getFullYear() > date.getFullYear()) {
        return `${today.getFullYear() - date.getFullYear()}年前`
    }
    if (today.getMonth() > date.getMonth()) {
        return `${today.getMonth() - date.getMonth()}ヶ月前`
    }
    if (today.getDate() > date.getDate()) {
        return `${today.getDate() - date.getDate()}日前`
    }
    if (today.getHours() > date.getHours()) {
        return `${today.getHours() - date.getHours()}時間前`
    }
    return `${today.getMinutes() - date.getMinutes()}分前`
}

export default DateView
