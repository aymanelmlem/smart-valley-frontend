import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { evaluateFinalRequest } from '../../redux/instructor/instructorSlice';

export default function EvaluateFinalRequest({ id, show, close }) {
    const { isLoading } = useSelector((state) => state.instructor);
    const dispatch = useDispatch();

    const EvaluateReq = async (values) => {
        const { state, payState, reasonOfReject } = values;
            let payload;

            if (state === 'accepted') {
                payload = { state, payState };
            } else {
                payload = { state, reasonOfReject };
            }
        const response = await dispatch(evaluateFinalRequest({ value: payload, id }));

        if (response.payload.success) {
            toast.success(response.payload.message);
            dispatch(RequestsEmp());
        } else {
            toast.error(response.payload.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            state: 'accepted',
            reasonOfReject: '',
            payState: false,
        },
        onSubmit: EvaluateReq,
    });

    const handleStatusChange = (e) => {
        const value = e.target.value;
        formik.setFieldValue('state', value);
        if (value !== 'rejected') {
            formik.setFieldValue('reasonOfReject', '');
        }
    };

    return (
        <Modal className='flex justify-center items-center' show={show} size='md' popup onClose={close}>
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={formik.handleSubmit} className='space-y-6'>
                    <h3 className='text-xl font-medium text-gray-900'>Evaluate Request</h3>
                    <div className='mb-2 block'>
                        <Label htmlFor='state' value='State' />
                    </div>
                    <Select
                        id='state'
                        name='state'
                        onChange={handleStatusChange}
                        value={formik.values.state}
                        onBlur={formik.handleBlur}
                    >
                        <option disabled>Select status</option>
                        <option value='accepted'>Accepted</option>
                        <option value='rejected'>Rejected</option>
                    </Select>
                    {formik.values.state === 'rejected' && (
                        <>
                            <div className='mb-2 block'>
                                <Label htmlFor='Condition' value='Reason for Rejection' />
                            </div>
                            <TextInput
                                value={formik.values.reasonOfReject}
                                name='reasonOfReject'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                id='Condition'
                                type='text'
                                placeholder='Reason for rejection'
                            />
                            {formik.touched.reasonOfReject && formik.errors.reasonOfReject && (
                                <div className='text-red-500'>{formik.errors.reasonOfReject}</div>
                            )}
                        </>
                    )}
                    {formik.values.state === 'accepted' && (
                        <>
                            <div className='mb-2 block'>
                                <Label htmlFor='payState' value='Payment Status' />
                            </div>
                            <Select
                                id='payState'
                                name='payState'
                                onChange={formik.handleChange}
                                value={formik.values.payState}
                                onBlur={formik.handleBlur}
                            >
                                <option disabled>Select status</option>
                                <option value='true'>Paid</option>
                                <option value='false'>Unpaid</option>
                            </Select>
                        </>
                    )}
                    <Button
                        type='submit'
                        className='text-white duration-500 transition-all hover:bg-transparent bg-blue-600 hover:text-blue-800 hover:outline-double hover:outline-blue-700'
                    >
                        {isLoading ? <i className='fa-solid fa-ellipsis fa-beat'></i> : 'Confirm'}
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

