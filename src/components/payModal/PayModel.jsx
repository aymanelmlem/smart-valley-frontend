import { Button, Label, Modal, Select } from 'flowbite-react'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allInstructors, PayingEmployee } from '../../redux/instructor/instructorSlice';
import { toast } from 'react-toastify';

export default function PayModel({id, show, close}) {
    const { isLoading } = useSelector(state => state.instructor);
    const dispatch=useDispatch()
    const payState=async(values)=>{
        const response=await dispatch(PayingEmployee({value:values,id}))        
        if (response.payload.success) {
            toast.success(response.payload.message);
        } else {
            toast.error(response.payload.message);
        }
        dispatch(allInstructors())
    }
    const formik=useFormik({
        initialValues:{
            payState:false
        },
        onSubmit:payState
    })
  return (
<>
    <Modal className='flex justify-center items-center' show={show} size='md' popup onClose={close}>
    <Modal.Header />
    <Modal.Body>
        <form onSubmit={formik.handleSubmit} className='space-y-6'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>Paying</h3>
            <div className='mb-2 block'>
                <Label htmlFor='status' value='Status' />
            </div>
            <Select
                id='paid'
                name='payState'
                onChange={formik.handleChange}
                value={formik.values.payState}
                onBlur={formik.handleBlur}
            >
                <option disabled>Select status</option>
                <option value='true'>Paid</option>
                <option value='false'>Un paid</option>
            </Select>
            <Button
                type='submit'
                className='text-white duration-500 transition-all hover:bg-transparent bg-rose-600 hover:text-rose-800 hover:outline-double hover:outline-rose-700'
            >
                {isLoading ? <i className='fa-solid fa-ellipsis fa-beat'></i> : 'Confirm'}
            </Button>
        </form>
    </Modal.Body>
    </Modal>
</>
  )
}
