import React from "react";
import { assets } from "../assets/assets";

const CategoryList = () => {
  // const [categoryProduct, Categories] = useState([]);

  return (
    <div className="container mx-auto py-5 px-4 sm:px-10 md:px-30">
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="text-center font-bold text-2xl sm:text-3xl">
          Shop By <span className="text-lime-600">Categories</span>
        </h1>

        <div className="flex flex-wrap gap-5 py-5 sm:py-10 px-2 sm:px-10 justify-center">
          <div>
            <img
              className="h-40 w-40 rounded-full "
              src={assets.fruits}
              alt=""
            />
            <h1 className="text-center font-semibold py-3">Fruits</h1>
          </div>

          <div>
            <img
              className="h-40 w-40 rounded-full "
              src={assets.vegetables}
              alt=""
            />
            <h1 className="text-center font-semibold py-3">Vegetables</h1>
          </div>

          <div>
            <img
              className="h-40 w-40 rounded-full "
              src={assets.dairy}
              alt=""
            />
            <h1 className="text-center font-semibold py-3">Dairy</h1>
          </div>

          <div>
            <img
              className="h-40 w-40 rounded-full "
              src={assets.groceries}
              alt=""
            />
            <h1 className="text-center font-semibold py-3">Groceries</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
