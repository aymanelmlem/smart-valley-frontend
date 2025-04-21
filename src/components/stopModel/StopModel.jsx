import React from 'react';
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { allInstructors, allManager, stopEmployee } from '../../redux/instructor/instructorSlice';
import { toast } from 'react-toastify';

export default function StopModel({ id, show, close }) {
    const { isLoading } = useSelector(state => state.instructor);
    const dispatch = useDispatch();

    const stopManager = async (values) => {
        try {
            const response = await dispatch(stopEmployee({ value: values, id }));            
            if (response.payload.success) {
                toast.success(response.payload.message);
            } else {
                toast.error(response.payload.message);
            }
            dispatch(allManager())
            dispatch(allInstructors())

        } catch (error) {
            toast.error('Failed to stop the manager');
        }
    };

    const validationSchema = yup.object({
        conditionOfStop: yup.string().min(10, 'The condition must be at least 10 characters long')
    
    });

    const formik = useFormik({
        initialValues: {
            stoppedBySuperAdmin: false,
            conditionOfStop: ''
        },
        onSubmit: (values) => {
            const payload = { stoppedBySuperAdmin: values.stoppedBySuperAdmin };
            if (values.stoppedBySuperAdmin) {
                payload.conditionOfStop = values.conditionOfStop;
            }
            stopManager(payload);
        },
        validationSchema,
    });

    const handleStatusChange = (e) => {
        const value = e.target.value === 'true';
        formik.setFieldValue('stoppedBySuperAdmin', value);
        if (value) {
            formik.setFieldValue('conditionOfStop', '');
        }
    };

    return (
        <>
            <Modal className='flex justify-center items-center' show={show} size='md' popup onClose={close}>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit} className='space-y-6'>
                        <h3 className='text-xl font-medium text-gray-900'>Stop Manager</h3>
                        <div className='mb-2 block'>
                            <Label htmlFor='status' value='Status' />
                        </div>
                        <Select
                            id='status'
                            name='status'
                            onChange={handleStatusChange}
                            value={formik.values.stoppedBySuperAdmin.toString()}
                        >
                            <option disabled>Select status</option>
                            <option value='false'>Active</option>
                            <option value='true'>Stop</option>
                        </Select>
                        {formik.values.stoppedBySuperAdmin && (
                            <>
                                <div className='mb-2 block'>
                                    <Label htmlFor='Condition' value='Condition' />
                                </div>
                                <TextInput
                                    value={formik.values.conditionOfStop}
                                    name='conditionOfStop'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id='Condition'
                                    type='text'
                                    placeholder='Condition'
                                />
                                {formik.touched.conditionOfStop && formik.errors.conditionOfStop && (
                                    <div className='text-red-500'>{formik.errors.conditionOfStop}</div>
                                )}
                            </>
                        )}
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
    );
}
