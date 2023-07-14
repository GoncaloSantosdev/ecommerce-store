import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <ul className="flex space-x-2 mt-6">
        {[...Array(pages).keys()].map((x) => (
          <li key={x + 1}>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
              }
              className={`flex items-center justify-center px-3 h-8 leading-tight text-white border  rounded ${
                x + 1 === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {x + 1}
            </Link>
          </li>
        ))}
      </ul>
    )
  );
};

export default Paginate;
