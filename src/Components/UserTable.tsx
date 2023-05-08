import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { UserList } from '../model/userlist'
import { ReactComponent as SearchIcon } from '../icons/search.svg'
import { ReactComponent as AddIcon } from '../icons/addUser.svg'
import debounce from 'lodash.debounce'
import { RegFrom } from './RegFrom'
// import Pagination from './Pagination'
import DarkTheme from './DarkTheme'
import { useLocation, useNavigate } from 'react-router-dom'
import Loadar from './Loadar'
import { setCurrentPage } from '../features/userDataSlice'
import { deleteUser, userDataTable } from '../Services/ApiService'
import { useTranslation } from 'react-i18next'
import './UserTable.css'
import { Input, Modal, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { message } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'

const colsth = [
    { heading: "Id", sortfiled: 'id' },
    { heading: "Name", sortfiled: 'uname' },
    { heading: "Address", sortfiled: 'uaddress' },
    { heading: "Mobile", sortfiled: 'umobile' },
    { heading: "Email", sortfiled: 'uemail' },
    { heading: "City", sortfiled: 'ucity' },
    { heading: "Gender", sortfiled: 'ugender' }
]

export const UserTable = () => {
    const { t, i18n } = useTranslation()
    const initialValues = {
        id: '',
        uname: '',
        uaddress: '',
        umobile: '',
        uemail: '',
        ucity: '',
        ugender: '',
        ucheck: false,
    }
    const usersall = useSelector((state: RootState) => state.userdata.users);
    const currentPage = useSelector((state: RootState) => state.userdata.currentPage);
    const setperpage = useSelector((state: RootState) => state.userdata.setPerPage);
    const loading = useSelector((state: RootState) => state.userdata.loading);
    const messageBrows = useSelector((state: RootState) => state.userdata.message);
    const dispatch = useDispatch()
    const [frmValues, setfrmValues] = useState<UserList>(initialValues)


    const [isChecked, setIsChecked] = useState<UserList | any>({})
    const [searchTearm, setSearchTearm] = useState('')
    const [delBtn, setDelBtn] = useState(false)
    const [editBtn, setEditBtn] = useState(false)
    const [sortField, setSortField] = useState('id')
    const [sortOrder, setSortOrder] = useState('desc')
    const [frmModalShow, setfrmModalShow] = useState(false)
    const [IsUpdate, setIsUpdate] = useState(true)
    const [tostShow, setTostShow] = useState(false)
    const [frmNameShow, setFrmNameShow] = useState(`${t('Registration')}`)
    const [frmBtnName, setFrmBtnName] = useState('Sing up')
    const [selectedId, setSelectedId] = useState('');
    const location = useLocation()
    const navigete = useNavigate()


    const handlefromshow = () => {
        setfrmModalShow(true)
    }


    const handleSearch = (e: any) => {
        setSearchTearm(e.target.value)
        dispatch(setCurrentPage(1))
        setDelBtn(false)
        setEditBtn(false)
    }

    const debouncedChangeHandler = useCallback(
        debounce(handleSearch, 1000)
        , []);


    useEffect(() => {
        if (location.pathname === '/create' || location.pathname === '/edit') {
            setfrmModalShow(true)
        } else {
            setfrmModalShow(false)
        }
        dispatch(userDataTable({ currentPage, setperpage, sortOrder, sortField, searchTearm }))
    }, [currentPage, setperpage, sortOrder, sortField, searchTearm])

    if (messageBrows) {
        return (<h3>Something went to wrong. Please try again later.</h3>)
    }


    const columns: ColumnsType<UserList> = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: {
                compare: (a: any, b: any) => a.id - b.id,
            },
        },
        {
            title: 'Name',
            dataIndex: 'uname',
            sorter: (a: any, b: any) => a.uname.localeCompare(b.uname)
        },
        {
            title: 'Address',
            dataIndex: 'uaddress',
            sorter: (a: any, b: any) => a.uaddress.localeCompare(b.uaddress)
        },
        {
            title: 'Mobile',
            dataIndex: 'umobile',
            sorter: (a: any, b: any) => a.umobile.localeCompare(b.umobile)
        },
        {
            title: 'Email',
            dataIndex: 'uemail',
            sorter: (a: any, b: any) => a.uemail.localeCompare(b.uemail)
        },
        {
            title: 'City',
            dataIndex: 'ucity',
            sorter: (a: any, b: any) => a.ucity.localeCompare(b.ucity)
        },
        {
            title: 'Gender',
            dataIndex: 'ugender',
            sorter: (a: any, b: any) => a.ugender.localeCompare(b.ugenderFF)
        },
        {
            key: "5",
            title: "Actions",
            render: (values) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => { handlefromshow(); setFrmBtnName('Save'); onEditStudent(values); setFrmNameShow(`${t("Update")}`); navigete(`/edit`) }} />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteStudent(values);
                            }}
                            style={{ color: "red", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const onChange: TableProps<UserList>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    const onEditStudent = ({ id, uname, uaddress, umobile, uemail, ugender, ucheck, ucity }: any) => {
        let updateval: any = { id, uname, uaddress, umobile, uemail, ugender, ucheck, ucity }
        setIsChecked(updateval)
        console.log(id);
        setfrmValues(updateval)
        setIsUpdate(true)
    };


    const onDeleteStudent = (values: any) => {
        navigete(`/delete`)
        Modal.confirm({
            title: "Are you sure, you want to delete this student record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setSelectedId(values.id);
                dispatch(deleteUser(values.id))
                setTostShow(true)
                message.success('Delete user Successfully')
                setTimeout(() => {
                    setTostShow(false)
                    dispatch(userDataTable({ currentPage, setperpage, searchTearm, sortOrder, sortField }))
                }, 4000)
                console.log(selectedId);
            },
        });
    };


    return (
        <>
            <div className="main_wrap">
                {frmModalShow === true ? <RegFrom frmBtnName={frmBtnName} setEditBtn={setEditBtn} frmNameShow={frmNameShow} setDelBtn={setDelBtn} initialValues={initialValues} setfrmValues={setfrmValues} setTostShow={setTostShow} sortField={sortField} sortOrder={sortOrder} searchTearm={searchTearm} IsUpdate={IsUpdate} isChecked={isChecked} frmValues={frmValues} setfrmModalShow={setfrmModalShow} /> : false}
                {loading !== true || <Loadar />}
                <div className="tbl_wrap">
                    <div className='tblheading_top'>
                        <h3>Users Details</h3>
                        <DarkTheme />
                    </div>
                    <div className="tblhading">
                        <div className="search_wrap">
                            <Input onChange={debouncedChangeHandler} placeholder='Search...' />
                            <div className="searchicon">
                                <SearchIcon onClick={() => searchTearm !== '' ? debouncedChangeHandler : ''} />
                            </div>
                        </div>

                        <div className="adduser">
                            <AddIcon onClick={() => { handlefromshow(); setIsUpdate(false); setFrmBtnName('Sing up'); setFrmNameShow(`${t('Registration')}`); navigete(`/create`) }} />
                        </div>
                    </div>
                    <div className="tbl_scroll">

                        <div>
                            <Table columns={columns} dataSource={usersall.data} onChange={onChange} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
