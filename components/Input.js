const Input = ({ inputValue, setInputValue, setInputIsFocused, inputIsFocused, fieldName, inputType, fieldId }) => {
  const focusField = () => {
    setInputIsFocused(true)
    document.getElementById(fieldId).focus()
}

    return (
        <div
            onClick={()=>{focusField()}} 
            className={`w-80 mb-5 rounded-3xl cursor-text border py-3 px-6 relative z-0 ${
              inputIsFocused || inputValue !== ""
                ? "border-black box-shadow-bottom-solid"
                : "border-gray-400"
            }`}
          >
            <label
              className={`text-md text-typathon-grey cursor-text z-10 absolute top-2 left-4 px-3 py-1 transition duration-200 bg-white 
                    ${inputIsFocused || inputValue !== "" ? "-translate-y-6" : "translate-y-0"}`}
            >
              {fieldName}
            </label>
            <input
              id={fieldId} 
              type={inputType}
              className={`z-30 border-transparent bg-transparent outline-none w-full`}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onBlur={() => {
                setInputIsFocused(false);
              }}
              onFocus={() => {
                setInputIsFocused(true);
              }}
              value={inputValue}
            />
          </div>
    )
}

export default Input