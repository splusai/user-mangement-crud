import LoderImg from '../icons/imggif.gif'
import './Loader.css'
const Loadar = () => {
  return (
    <>
      <div className="loader">
        <img src={LoderImg} alt="gifimg" />
      </div>
    </>
  )
}

export default Loadar