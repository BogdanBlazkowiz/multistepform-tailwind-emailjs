import React, { useState } from "react";
import { Formik } from "formik";
import Input from "./Input";
import Select from "./Select";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
// parse and assert validity
// const user = await userSchema.validate(await fetchUser());

(function () {
    emailjs.init({
        publicKey: "A0QsLE0qgXfa-I8FF",
    });
})();

const Basic = (inputsRef) => {
    const sendEmail = (name, message, happiness, email) => {
        emailjs.send("service_f5rd7pq", "template_jzrzt99", {
            from_name: "Malherbe Matthieu",
            to_name: name,
            message: message,
            happiness: happiness,
            email: email,
        });
    };
    const messageSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        message: Yup.string().required("Message is required"),
        happiness: Yup.string().required("Happiness value is required"),
    });
    const [currentPage, setCurrentPage] = useState(0);
    const paginationHandler = (evt) => {
        let modifier = evt;
        if (typeof evt != Number) {
            modifier = parseInt(evt.target.value);
        }

        let previousPage = parseInt(currentPage);
        setCurrentPage(previousPage + modifier);
    };
    return (
        <div className="flex flex-col items-center bg-slate-400 rounded-2xl p-10 w-fit justify-center gap-3">
            <h1>Multistep form example</h1>
            <h1>Give us your opinion!</h1>
            <div className="bg-slate-400">
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        message: "",
                        happiness: "",
                    }}
                    initialErrors={{}}
                    initialTouched={{}}
                    validationSchema={messageSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            sendEmail(
                                values.name,
                                values.message,
                                values.happiness,
                                values.email
                            );
                            alert("Sent succesfully!");
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form
                            className="flex flex-col items-center gap-5"
                            onSubmit={handleSubmit}
                        >
                            {Input(
                                "name",
                                0,
                                handleChange,
                                handleBlur,
                                values,
                                errors,
                                touched,
                                currentPage
                            )}
                            {Input(
                                "email",
                                0,
                                handleChange,
                                handleBlur,
                                values,
                                errors,
                                touched,
                                currentPage
                            )}
                            {Input(
                                "message",
                                1,
                                handleChange,
                                handleBlur,
                                values,
                                errors,
                                touched,
                                currentPage
                            )}
                            {Select(
                                "happiness",
                                1,
                                handleChange,
                                handleBlur,
                                values,
                                errors,
                                touched,
                                currentPage,
                                [
                                    "",
                                    "Very happy",
                                    "Happy",
                                    "Neutral",
                                    "Unhappy",
                                    "Very Unhappy",
                                ]
                            )}
                            <button
                                className="bg-gray-500 rounded-xl w-fit p-2"
                                type="button"
                                onClick={paginationHandler}
                                hidden={parseInt(currentPage) > 0}
                                value={1}
                            >
                                Next
                            </button>
                            <button
                                className="bg-gray-500 rounded-xl w-fit p-2"
                                type="button"
                                onClick={paginationHandler}
                                hidden={parseInt(currentPage) < 1}
                                value={-1}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-gray-500 rounded-xl w-fit p-2"
                                type="submit"
                                hidden={parseInt(currentPage) < 1}
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Basic;
