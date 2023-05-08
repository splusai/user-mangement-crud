import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { setTotalPerPage, setRowPerPage, setCurrentPage } from '../features/userDataSlice'
import './Pagination.css'
const Pagination = () => {
    const currentPage = useSelector((state: RootState) => state.userdata.currentPage)
    const setperpage = useSelector((state: RootState) => state.userdata.setPerPage)
    const usersall = useSelector((state: RootState) => state.userdata.users);
    const dispatch = useDispatch()
    const [itemOption,setItemOption] = useState([5])

    let totalpage = Math.ceil((usersall.total===undefined||usersall.total) / setperpage)
    let firstpage = Math.ceil(setperpage / (usersall.total ||usersall.total===undefined))

 

    const handleLimit = () => {
        let arr=[5,10,20,50,100]
        let arrlimit =[]
      let totallen=  Math.ceil((usersall.total===undefined||usersall.total) /5)
      for(let i=0;i<totallen;i++){
        arrlimit.push(arr[i])
      }
      setItemOption(arrlimit)
    }
    const hanlelimitchange = (e:any) =>{
        let limitvalset = e.target.value
        dispatch(setRowPerPage(limitvalset))
        dispatch(setCurrentPage(1))
    }
    // const handlPagechange = (type: any) => {
    //     if (type === 'prev') {
    //         if (currentPage > 1) {
    //             dispatch(setCurrentPage(currentPage - 1))
    //         }
    //     }
    //     if (type === 'next') {
    //         if (currentPage < totalpage) {
    //             dispatch(setCurrentPage(currentPage + 1))
              
    //         }
    //     }
    //     if (type === 'first') {
    //         if (currentPage <= totalpage) {
    //             dispatch(setCurrentPage(firstpage))
    //             dispatch(setCurrentPage(1))
    //         }
    //     }
    //     if (type === 'last') {
    //         if (currentPage) {
    //             dispatch(setCurrentPage(totalpage))
    //         }
    //     }
    // }
    useEffect(() => {
        dispatch(setTotalPerPage(totalpage))
    }, [totalpage,setperpage])
    return (
        <>
            <div className="pagination_wrap">
                <div className="limit">
                    <select name="limit" onClick={handleLimit} onChange={hanlelimitchange}>
                        {itemOption.map((otp: any) =>
                            <option key={otp} value={otp}>{otp}</option>
                        )}

                    </select>
                </div>
                <div className="pagebtn_wrap">
                    <Pagination/>
                    {/* <button className={`pagebtn ${currentPage === 1 ? 'disebled' : ''}`} onClick={() => handlPagechange('first')}><FirstIcon /></button> */}
                    {/* <button className={`pagebtn ${currentPage === 1 ? 'disebled' : ''}`} onClick={() => handlPagechange('prev')}><PrevIcon /></button> */}
                    {/* <span className='pagenum'>Page {currentPage} <span>Of</span>{totalpage}</span> */}
                    {/* <button className={`pagebtn ${totalpage === currentPage ? 'disebled' : ''}`} onClick={() => handlPagechange('next')}><NextIcon /></button> */}
                    {/* <button className={`pagebtn ${currentPage === totalpage ? 'disebled' : ''}`} onClick={() => handlPagechange('last')}><LastIcon /></button> */}
                </div>
            </div>
        </>
    )
}

export default Pagination