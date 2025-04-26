import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getRandomColor } from '../../../../utils/api';
import HeadSection from '../../../../components/headSection/HeadSection';
import { updateSupCategory } from '../../../../redux/category/category.slice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function DeleteCategory() {
    const [searchParam] = useSearchParams();
    const subCategory = searchParam.get("subCategory");
    const subCategoryId = searchParam.get("subCategoryId");
    const categoryId = searchParam.get("categoryId");
    let subCategoryArr = subCategory ? subCategory.split(',') : [];
    let subCategoryIdArr = subCategoryId ? subCategoryId.split(',') : [];
    const [subInputValue, setSubInputValue] = useState({subCategory:[]});
    const dispatch = useDispatch();
    const deleteSubCtg = async (id, value, status = "delete") => {
        const formData = new FormData();
        formData.append("subCategory", JSON.stringify(value.subCategory)); 
        const res = await dispatch(updateSupCategory({ id, value: formData, status }));
    
        if (res.payload?.success) {
            toast.success(res.payload.message);
        } else {
            toast.error(res.payload?.message || 'Update failed');
        }
    };
    const handleChange = (e) => {
        const newValue = e.target.value.split(',').map(item => item.trim());
        setSubInputValue({ subCategory: newValue });
    };
    
    return (
    <>
        <div className="max-w-screen-xl mx-auto  text-gray-900  dark:text-white">
            <HeadSection to="/panel/delcategory" title="Delete Subcategory" subTitle="subcategory" link="Delete subcategory"/>
            <h2 className="m-2 text-2xl mt-5 text-gray-900 dark:text-white">SubCategory :</h2>
            <div className="flex flex-wrap">
                {subCategoryArr.slice().map((ctg, index) => (
                <span
                    className="m-2 py-1 px-10 rounded-md text-white"
                    style={{ backgroundColor: getRandomColor() }}
                    key={index}
                >
                    {ctg}
                </span>
                ))}
            </div>
            
            <h2 className="m-2 text-2xl text-gray-900 dark:text-white">SubCategory ID :</h2>
            <div className="flex flex-wrap">
                {subCategoryIdArr.slice().map((ctg, index) => (
                <span
                    className="m-2 py-1 px-10 rounded-md text-white"
                    style={{ backgroundColor: getRandomColor() }}
                    key={index}
                >
                    {ctg}
                </span>
                ))}
            </div>
            
            <div className="flex justify-center mt-8">
                <form className="grid w-full md:w-[500px] gap-4 bg-blue-100 dark:bg-gray-900 p-5 shadow-md rounded-md">
                <div>
                    <label htmlFor="subCategory" className="dark:text-gray-100">
                    Subcategory ID: Enter the <span className="text-rose-800 font-bold">Subcategory ID(s)</span> including the one corresponding to the Subcategory Name you want to delete.
                    </label>
                    <input
                    type="text"
                    id="subCategory"
                    name="subCategory"
                    placeholder="Subcategory ID"
                    value={subInputValue.subCategory.join(', ')}
                    onChange={handleChange}
                    className="w-full focus:ring-0 shadow-md rounded-lg p-3 pl-4 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500"
                    />
                </div>
                <button
                    type="button"
                    onClick={() => deleteSubCtg(categoryId, subInputValue, 'delete')}
                    className="bg-purple-500 py-2 rounded-md px-10 text-white dark:bg-purple-600"
                >
                    Edit
                </button>
                </form>
            </div>
        </div>
    </>
    );
}
