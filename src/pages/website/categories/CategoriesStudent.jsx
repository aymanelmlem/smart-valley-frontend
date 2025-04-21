import { Link } from 'react-router-dom';

export default function CategoriesStudent({ data }) {
  return (
    <Link
  to={`/CoursesByCategories/${data?._id}`}
  className="relative group block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
>
  {/* خلفية بصرية */}
  <div className="relative h-56 overflow-hidden">
    <img
      src={data?.categoryPicture?.secure_url}
      alt=""
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0  bg-black bg-opacity-80"></div>
  </div>

  <div className="absolute inset-0 flex flex-col justify-end p-4 text-white z-10">
    <h3 className="text-lg font-extrabold uppercase mb-2 group-hover:text-sky-600 transition-colors duration-300">
      {data.categoryName.replace(/"/g, '')}
    </h3>

    <div className="flex flex-wrap gap-2">
      {data.subCategory.slice(0, 3).map((sub) => (
        <span
          key={sub.subCategoryId}
          className="bg-blue-800 text-white  rounded-full px-3 py-1 text-xs font-medium shadow-lg"
        >
          {sub.subCategoryName}
        </span>
      ))}
    </div>
  </div>

  
</Link>

  
  
  );
}
