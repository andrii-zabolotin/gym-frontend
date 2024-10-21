import spinner from "../icegif-1258.gif"

export default function Loader({...props}) {
  return (
    <>
        <img src={spinner} alt="Spinner" className="size-16" {...props}/>
    </>
  )
}