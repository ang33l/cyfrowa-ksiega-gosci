import { ImSpinner9 } from "react-icons/im"
import { PiSpinnerGap } from "react-icons/pi"
export default function Spinner({ text }: { text?: string }) {
    return (<div className="flex flex-col gap-4 justify-center items-center">
        {text && (<p>{text}</p>)}
        <ImSpinner9 className={'animate-spin'} />
    </div>)
}