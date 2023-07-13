/* eslint-disable react/prop-types */
const Message = ({ variant, children }) => {
  return (
    <div
      className={
        variant === "danger"
          ? `p-4 mb-4 text-sm rounded-lg bg-red-100 text-red-800`
          : "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      }
    >
      <span className="font-medium">{children}</span>
    </div>
  );
};

export default Message;
