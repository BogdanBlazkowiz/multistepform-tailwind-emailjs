import { ErrorMessage } from "formik";
export default function Select(
    dataNeeded,
    key,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    currentInput,
    selectValues
) {
    return (
        <div
            className="border border-black rounded-2xl w-80"
            hidden={!(currentInput === key)}
        >
            <div className="input-container flex flex-col items-center">
                <label
                    htmlFor={dataNeeded}
                    className="flex items-center flex-col"
                >
                    {dataNeeded}:
                    <ErrorMessage
                        name={dataNeeded}
                        component="div"
                        className="error"
                    />
                </label>
                <select
                    className="form-input border bg-slate-500 border-black rounded-2xl p-1 flex flex-col items-center"
                    type={dataNeeded}
                    name={dataNeeded}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[{ dataNeeded }]}
                    key={key}
                    >
                    {selectValues.map((elem, index) => {
                        return <option value={elem} key={index}>{(!elem) ? "Please choose an option" : elem}</option>
                    })}
                </select>
                {errors[{ dataNeeded }] &&
                    touched[{ dataNeeded }] &&
                    errors[{ dataNeeded }]}
            </div>
        </div>
    );
}
