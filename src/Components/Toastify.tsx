
import { ReactComponent as CloseIcon } from '../icons/closeIcon.svg'
import './Toastify.css'
interface IToastify  {
    tostShowMsg:string,
}

const Toastify = (props: IToastify) => {
    const {tostShowMsg} = props
  return (
    <>
    <div className="tost_wrap">
    <div className="content">
        <p>{tostShowMsg}</p>
        <CloseIcon />
    </div>
    </div>
    </>
  )
}

export default Toastify