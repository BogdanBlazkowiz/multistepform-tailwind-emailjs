import { ErrorMessage, Field } from "formik";
export default function Input(
    dataNeeded,
    key,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    currentInput
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
                    <Field
                    className="form-input border bg-slate-500 border-black rounded-2xl p-1 flex flex-col items-center"
                    type={dataNeeded}
                    name={dataNeeded}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[{ dataNeeded }]}
                    key={key}
                />
                </label>
                
                {errors[{ dataNeeded }] &&
                    touched[{ dataNeeded }] &&
                    errors[{ dataNeeded }]}
            </div>
        </div>
    );
}
