import { Button, Label, Modal, Select } from 'flowbite-react'
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { purcaseCourseIns, purcaseProcessing } from '../../redux/instructor/instructorSlice';

export default function PurcaseModel({id,course ,show, close}) {
    const { isLoading } = useSelector(state => state.instructor);
    const dispatch=useDispatch()
    const purcaseCourses=async(values)=>{
        const response=await dispatch(purcaseProcessing({value:values,id}))
        if (response.payload.success) {
            toast.success(response.payload.message);
        } else {
            toast.error(response.payload.message);
        }
        dispatch(purcaseCourseIns())
    }
    const formik=useFormik({
        initialValues:{
            state:"notPayed"
        },
        onSubmit:purcaseCourses
    })
  return (
<>
    <Modal className='flex justify-center items-center' show={show} size='md' popup onClose={close}>
    <Modal.Header />
    <Modal.Body>
        <form onSubmit={formik.handleSubmit} className='space-y-6'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>Purcase - {course}</h3>
            <div className='mb-2 block'>
                <Label htmlFor='status' value='Status' />
            </div>
            <Select
                id='paid'
                name='state'
                onChange={formik.handleChange}
                value={formik.values.state}
                onBlur={formik.handleBlur}
            >
                <option disabled>Select status</option>
                <option value='payed'>Paid</option>
                <option value='notPayed'>Un paid</option>
                <option value='rejectedRequest'>cancel purcase</option>
                <option value="paused">paused</option>
            </Select>
            <Button
                type='submit'
                className='text-white duration-500 transition-all hover:bg-transparent bg-rose-600 dark:bg-rose-700 dark:hover:text-rose-300 hover:text-rose-800 dark:hover:outline-double hover:outline-double dark:hover:outline-rose-70 hover:outline-rose-700'
            >
                {isLoading ? <i className='fa-solid fa-ellipsis fa-beat'></i> : 'Confirm'}
            </Button>
        </form>
    </Modal.Body>
    </Modal>
</>  )
}
