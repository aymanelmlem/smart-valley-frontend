import  { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getRandomColor } from '../../../../utils/api';
import HeadSection from '../../../../components/headSection/HeadSection';
import { updateSupCategory } from '../../../../redux/category/category.slice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../../assets/favicon.png';
export default function UpdateSubCategory() {
  const [searchParam] = useSearchParams();
  const subCategory = searchParam.get('subCategory');
  const subCategoryId = searchParam.get('subCategoryId');
  const categoryId = searchParam.get('categoryId');

  let subCategoryArr = subCategory ? subCategory.split(',') : [];
  let subCategoryIdArr = subCategoryId ? subCategoryId.split(',') : [];

  const [subInputValue, setSubInputValue] = useState(
    subCategoryIdArr.map((id, index) => ({
      subCategoryId: id,
      subCategoryName: subCategoryArr[index] || '',
    }))
  );

  const dispatch = useDispatch();

  const updateSubCtg = async (id, value, status = 'update') => {
    const formData = new FormData();
    formData.append('subCategory', JSON.stringify(value.subCategory));
    const res = await dispatch(
      updateSupCategory({ id, value: formData, status })
    );

    if (res.payload?.success) {
      toast.success(res.payload.message);
    } else {
      toast.error(res.payload?.message || 'Update failed');
    }
  };

  const handleChange = (index, field, value) => {
    const newSubCategories = [...subInputValue];
    newSubCategories[index] = { ...newSubCategories[index], [field]: value };
    setSubInputValue(newSubCategories);
  };

  const handleSubmit = () => {
    updateSubCtg(categoryId, { subCategory: subInputValue }, 'update');
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit subCategories</title>
        <meta name="description" content="Edit subCategories page" />
        <meta
          name="keywords"
          content="Edit subCategories, elearning, education"
        />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="max-w-screen-xl mx-auto  text-gray-900  dark:text-white">
        <HeadSection
          to="/panel/updateSubCategory"
          title="Edit Subcategory"
          subTitle="subcategory"
          link="Edit subcategory"
        />
        <h2 className="m-2 text-2xl mt-5 text-gray-900 dark:text-white">
          SubCategory :
        </h2>
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
        <h2 className="m-2 text-2xl text-gray-900 dark:text-white">
          SubCategory Id :
        </h2>
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
          <form className="grid w-full md:w-[500px] gap-4 bg-blue-100 dark:bg-gray-900 p-3 shadow-md rounded-md">
            {subInputValue.map((sub, index) => (
              <div key={index}>
                <label
                  htmlFor={`subCategoryId-${index}`}
                  className="dark:text-gray-100"
                >
                  Subcategory ID
                </label>
                <input
                  type="text"
                  id={`subCategoryId-${index}`}
                  value={sub.subCategoryId}
                  onChange={(e) =>
                    handleChange(index, 'subCategoryId', e.target.value)
                  }
                  className="w-full focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <label
                  htmlFor={`subCategory-${index}`}
                  className="dark:text-gray-100"
                >
                  Subcategory Name <span className="text-rose-800">(New)</span>
                </label>
                <input
                  type="text"
                  id={`subCategory-${index}`}
                  value={sub.subCategoryName}
                  onChange={(e) =>
                    handleChange(index, 'subCategoryName', e.target.value)
                  }
                  className="w-full focus:ring-0 shadow-md rounded-lg p-3 pl-10 mt-2 focus:outline-none focus:border-gray-500 border-gray-300 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleSubmit}
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
