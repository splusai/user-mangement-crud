import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UserList } from '../model/userlist'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../app/store'
import { addData, updatedUser, userDataTable } from '../Services/ApiService'
import { ReactComponent as CloseIcon } from '../icons/closeIcon.svg'
import { inisiData } from '../features/userDataSlice'
import './RegFrom.css'
import { Input, Button, Form, Select, Radio, Checkbox } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { message } from 'antd'

interface IRegFrom {
    frmValues: UserList,
    isChecked: UserList | any,
    IsUpdate: boolean,
    frmBtnName: string,
    frmNameShow: string,
    searchTearm: string,
    sortOrder: string,
    sortField: string,
    initialValues: UserList,
    setTostShow: React.Dispatch<React.SetStateAction<boolean>>,
    setfrmModalShow: React.Dispatch<React.SetStateAction<boolean>>,
    setfrmValues: React.Dispatch<React.SetStateAction<UserList>>,
    setDelBtn: React.Dispatch<React.SetStateAction<boolean>>,
    setEditBtn: React.Dispatch<React.SetStateAction<boolean>>,
}
export const RegFrom = (props: IRegFrom) => {
    const { setfrmModalShow, setDelBtn, setEditBtn, frmNameShow, frmBtnName, setfrmValues, initialValues, IsUpdate, setTostShow,  searchTearm, sortOrder, sortField, frmValues, isChecked } = props
    const usersall = useSelector((state: RootState) => state.userdata.users);
    const loading = useSelector((state: RootState) => state.userdata.loading);
    const currentPage = useSelector((state: RootState) => state.userdata.currentPage);
    const setperpage = useSelector((state: RootState) => state.userdata.setPerPage);
    const dispatch = useDispatch()
    const modalRef = useRef(null)
    const inputRef = useRef<HTMLInputElement>(null)

    
    const handalAddData = (values: any) => {
        console.log(values);
        if (IsUpdate) {
            const { id } = isChecked
            let user = ({ ...values, id: id })
            dispatch(updatedUser({ id, user }))
            setTostShow(true)
            // setTostShowMsg('Edit Successfully')
            message.success('Edit Successfully')
            setTimeout(() => {
                setTostShow(false)
                dispatch(userDataTable({ currentPage, setperpage, searchTearm, sortOrder, sortField }))
                setfrmModalShow(false)
            }, 2000)

            uncheckbox()
        } else {
            let uid = uniqueId()
            let formData = ({ ...values, id: uid })
            dispatch(addData({ formData }))
            setTostShow(true)
            // setTostShowMsg('Add Successfully')
            message.success('Add Successfully')
            setTimeout(() => {
                setTostShow(false)
                dispatch(userDataTable({ currentPage, setperpage, searchTearm, sortOrder, sortField }))
                setfrmModalShow(false)
            }, 2000)
            usenavigete('')
        }
    }
    const uniqueId = (length = 2) => {
        return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
    }
    const usenavigete = useNavigate()
    const handlefrmclose = (e: any) => {
        if (e.target === modalRef.current) {
            uncheckbox()
            setfrmModalShow(false)
        }
        if (e.key === 'Escape') {
            uncheckbox()
            setfrmModalShow(false)
        }
    }
    const uncheckbox = () => {
        let unchecked = usersall.data.map((x: any) => {
            if (x.isSelected === true) {
                x = { ...x, isSelected: false }
            }
            return x
        })
        dispatch(inisiData({ data: unchecked, total: usersall.total }))
        setfrmModalShow(false)
        setfrmValues({ ...initialValues })
        setDelBtn(false)
        setEditBtn(false)
        usenavigete('')
    }

    useEffect(() => {
        inputRef.current?.focus()
        document.addEventListener('keyup', handlefrmclose)
        document.removeEventListener('keyup', handlefrmclose)
    }, [])






    const [form] = useForm()
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        handalAddData(values)
    };

    const { Option } = Select;
    return (
        <>
            <div className="frm_modal" ref={modalRef} onClick={handlefrmclose} >
                <div className="frm_wrap">
                    <div className="close ripple" onClick={uncheckbox}>
                        <CloseIcon />
                    </div>

                    <h3>{frmNameShow}</h3>

                    <Form form={form} onFinish={onFinish} initialValues={frmValues}>
                        <Form.Item>
                            <Input
                                name='id'
                                type='hidden'
                            />
                        </Form.Item>


                        {/* ==UName== */}
                        <Form.Item
                            label="Name"
                            name="uname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        {/* ==UAddress== */}
                        <Form.Item
                            name="uaddress"
                            label="Address"
                            rules={[{ required: true, message: 'Please input address' }]}
                        >
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>


                        {/* ==Mobile== */}
                        <Form.Item
                            label="Mobile Number"
                            name="umobile"
                            rules={[
                                {
                                    required: true,
                                    message: 'Mobile number is required',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        {/* ==Email== */}
                        <Form.Item
                            label="Email"
                            name="uemail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Invalid email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        {/* ==gender== */}
                        <Form.Item
                            label="Gender"
                            name="ugender"
                            rules={[{ required: true, message: 'Please select your gender' }]}
                        >
                            <Radio.Group
                                name="ugender"
                            >
                                <Radio.Button value="male">Male</Radio.Button>
                                <Radio.Button value="female">Female</Radio.Button>
                            </Radio.Group>
                        </Form.Item>


                        {/* ==UCity== */}
                        <Form.Item
                            label="City"
                            name="ucity"
                            hasFeedback
                            rules={[{ required: true, message: 'Please select a city' }]}
                        >
                            <Select
                                placeholder="Please select a city"
                            >
                                <Option value="Rajkot">Rajkot</Option>
                                <Option value="Ahmedabad">Ahmedabad</Option>
                                <Option value="Surat">Surat</Option>
                                <Option value="vapi">vapi</Option>
                                <Option value="jamnagar">jamnagar</Option>
                                <Option value="Baroda">Baroda</Option>
                            </Select>
                        </Form.Item>

                        {/* ==UTerms== */}
                        <Form.Item
                            name="ucheck"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                        >
                            <Checkbox>i have read and agree to the <a href="">terms</a> and <a href="">conditions</a>.</Checkbox>
                        </Form.Item>


                        {/* ==Submit & Reset Btn== */}
                        <Button htmlType="reset">Reset</Button>
                        <Button type="primary" htmlType="submit" > Submit </Button>
                    </Form>

                </div>
            </div>
        </>
    )
}
