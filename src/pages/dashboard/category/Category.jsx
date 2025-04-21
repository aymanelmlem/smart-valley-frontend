import { useFormik } from 'formik';
import React, { useState } from 'react';
import HeadSection from '../../../components/headSection/HeadSection';
import InputField from '../../../components/Input/InputField';
import { useDispatch, useSelector } from 'react-redux';
import InputUpload from '../../../components/uploadInput/InputUpload';
import * as yup from 'yup';
import { addCategories } from '../../../redux/category/category.slice';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
export default function Category() {
  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [subCategoryInput, setSubCategoryInput] = useState('');
  const validationSchema = yup.object({
    categoryName: yup
      .string()
      .min(2, 'The category must be more than or equal to 2 characters')
      .max(70, 'The category must be less than or equal to 70 characters')
      .required('The category is required'),
    subCategory: yup.array().of(yup.string()),
    categoryPicture: yup
      .mixed()
      .required('Category picture is required')
      .test(
        'fileFormat',
        'Unsupported file format. Supported formats are webp, jpeg, png',
        (value) => {
          return (
            value &&
            ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)
          );
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      categoryName: '',
      subCategory: [],
      categoryPicture: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (values[key] instanceof File) {
          formData.append(key, values[key]);
        } else {
          formData.append(key, JSON.stringify(values[key]));
        }
      }
      const response = await dispatch(addCategories(formData));
      if (response?.payload.success) {
        toast.success(response.payload.message);
        formik.resetForm();
      }else if(response?.payload.message.includes('E11000 duplicate key error collection: onlineTeachingCenter.categories index: categoryName_1 dup key')){
        toast.info("The Category Name already exists")
      } else {
        toast.error(response.payload.message);
      }
    },
  });

  const handleChangeFile = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      formik.setFieldValue(name, files[0]);
    }
  };

  const handleAddSubCategory = () => {
    if (subCategoryInput.trim() !== '') {
      formik.setFieldValue('subCategory', [
        ...formik.values.subCategory,
        subCategoryInput,
      ]);
      setSubCategoryInput('');
    }
  };

  const handleRemoveSubCategory = (indexToRemove) => {
    const updatedSubCategories = formik.values.subCategory.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue('subCategory', updatedSubCategories);
  };

  const handleEditSubCategory = (indexToEdit, newValue) => {
    const updatedSubCategories = formik.values.subCategory.map(
      (subcategory, index) => (index === indexToEdit ? newValue : subcategory)
    );
    formik.setFieldValue('subCategory', updatedSubCategories);
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Add Categories</title>
        <meta name="description" content="Add Categories page" />
        <meta name="keywords" content="Add Categories, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl m-auto">
        <HeadSection
          to="/panel/category"
          title="Add Category"
          subTitle="Categories"
          link="Add Category"
        />
        <div className="relative  overflow-hidden bg-white dark:bg-gray-900  mt-10 p-10 shadow-md rounded-lg">
          <div className="absolute -top-5 -right-5 w-32 h-32 bg-blue-500 rounded-full opacity-10 transform rotate-45"></div>
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-purple-500 rounded-full opacity-10 transform rotate-45"></div>
          <h3 className="text-blue-700 dark:text-blue-600 text-2xl font-semibold my-5">
            Basic Info
          </h3>
          <form className="space-y-5 py-10" onSubmit={formik.handleSubmit}>
            <div className="flex gap-5 flex-wrap xl:flex-nowrap">
              <InputField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.categoryName}
                name="categoryName"
                inputType="text"
                type="input"
                title={
                  formik.errors.categoryName && formik.touched.categoryName
                    ? `${formik.errors.categoryName}`
                    : 'Category name *'
                }
                styleSpan={
                  formik.errors.categoryName && formik.touched.categoryName
                    ? 'text-red-600'
                    : 'text-gray-600'
                }
                placeholder={
                  formik.errors.categoryName && formik.touched.categoryName
                    ? `${formik.errors.categoryName}`
                    : 'Category name'
                }
                inputStyle={
                  formik.errors.categoryName && formik.touched.categoryName
                    ? 'w-full dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 shadow-red-300 focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none border-red-500 focus:border-red-500 border-gray-300 bg-red-400 bg-opacity-40 text-red-800 placeholder-red-500'
                    : 'w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                }
                icon={
                  formik.errors.categoryName && formik.touched.categoryName
                    ? 'bug'
                    : 'list'
                }
                iconStyle={
                  formik.errors.categoryName && formik.touched.categoryName
                    ? 'absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500'
                    : 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                }
              />
            </div>

            <div className="flex gap-5 justify-center flex-wrap xl:flex-nowrap">
              <InputField
                onBlur={() => {}}
                onChange={(e) => setSubCategoryInput(e.target.value)}
                value={subCategoryInput}
                name="subCategoryInput"
                inputType="text"
                type="input"
                title="Sub category"
                styleSpan="text-gray-600"
                placeholder="Enter subcategory and press add"
                inputStyle="w-full focus:ring-0 shadow-md rounded-lg p-3 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                icon="layer-group"
                iconStyle="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <button
                type="button"
                onClick={handleAddSubCategory}
                className="bg-blue-600 text-white p-2 mt-9 w-60 rounded-md hover:outline-blue-500 hover:bg-blue-700"
              >
                Add subcategory
              </button>
            </div>

            {/* Display Added Subcategories */}
            <ul className="mt-4">
              {formik.values.subCategory.map((subcategory, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-100 dark:bg-gray-800 shadow-md rounded-md mb-2 flex justify-between items-center"
                >
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) =>
                      handleEditSubCategory(index, e.target.value)
                    }
                    className="focus:ring-0 shadow-md rounded-lg dark:text-gray-300 dark:bg-gray-900 dark:focus:border-gray-700 focus:outline-none focus:border-gray-500 dark:border-gray-700 border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSubCategory(index)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <InputUpload
              onChange={handleChangeFile}
              onBlur={formik.handleBlur}
              value={formik.values.categoryPicture}
              name="categoryPicture"
              title={
                formik.errors.categoryPicture && formik.touched.categoryPicture
                  ? `${formik.errors.categoryPicture}`
                  : formik.values.categoryPicture
                  ? 'Category Picture uploaded'
                  : 'Click to upload Category Picture'
              }
              paraStyle={
                formik.errors.categoryPicture && formik.touched.categoryPicture
                  ? 'mb-2 text-sm text-red-500'
                  : 'mb-2 text-sm text-gray-500'
              }
              labelStyle={
                formik.errors.categoryPicture && formik.touched.categoryPicture
                  ? 'flex dark:bg-red-800 dark:text-red-300 dark:border-red-700 dark:bg-opacity-50 flex-col items-center justify-center w-full h-64 border-2 border-red-300 border-dashed rounded-lg cursor-pointer bg-red-100'
                  : 'flex flex-col items-center justify-center w-full h-64 border-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100'
              }
              subTitle="PNG, JPG, webp"
            />

            <div className="flex justify-end">
              {isLoading ? (
                <button
                  type="submit"
                  className="bg-blue-800 text-white p-4 rounded-md"
                  disabled
                >
                  <i className="fa-solid fa-spinner fa-spin-pulse text-xl"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-800 text-white p-4 rounded-md hover:outline-double hover:outline-blue-700 hover:bg-transparent transition-all duration-300 hover:text-blue-900 hover:font-semibold"
                >
                  Add Category
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
