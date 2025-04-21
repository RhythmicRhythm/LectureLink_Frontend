// TextInput.js
const TextInput = ({ label, id, type = "text", placeholder, error, touched, value, onChange, onBlur }) => {
    const errorStyle = error && touched ? "border-red-300 focus:border-red-300" : "border-gray-200 focus:border-gray-200";
    return (
      <div className="mt-2">
        <label className="text-xs text-gray-500 mb-2">{label}</label>
        <input
          className={`w-full px-8 py-3 rounded-lg mb-2 
            text-gray-800 font-medium bg-[#fff] border-2
             ${errorStyle} placeholder-gray-500 text-sm 
             focus:outline-none`}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && touched && <p className="error text-xs text-red-300">{error}</p>}
      </div>
    );
  };
  
  export default TextInput;
  