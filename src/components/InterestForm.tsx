import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';

interface InterestFormValues {
    name: string;
    college: string;
    course: string;
    batch: string;
    mobile: string;
    email: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    college: Yup.string().required("Required"),
    course: Yup.string().required("Required"),
    batch: Yup.string().required("Required"),
    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Required"),
});

const initialValues: InterestFormValues = {
    name: "",
    college: "",
    course: "",
    batch: "",
    mobile: "",
    email: "",
};

const InterestForm = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (values: InterestFormValues, { resetForm }: any) => {
        try {
            const response = await axios.post('http://localhost:5000/api/interestForm', values);
            if (response.data) {
                setSuccess(true);
                resetForm();
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (err) {
            setError("Failed to submit form. Please try again.");
            setTimeout(() => setError(""), 3000);
        }
    };

    return (
        <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
            <div className=" mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl border-2 border-orange border-2"
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                        Express Your Interest
                    </h2>

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            Form submitted successfully!
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <Field
                                    name="name"
                                    type="text"
                                    className="mt-1 w-[90%] block w-full rounded-xl border border-gray-300 bg-white/60  backdrop-blur-sm px-4 py-3 text-gray-800  transition-all duration-300"
                                />
                                <ErrorMessage name="name" component="div" className="text-sm text-red-600 mt-1" />
                            </div>

                            <div>
                                <label htmlFor="college" className="block text-sm font-medium text-gray-700">
                                    College Name
                                </label>
                                <Field
                                    name="college"
                                    type="text"
                                    className="mt-1 w-[90%] block w-full rounded-xl border border-gray-300 bg-white/60  backdrop-blur-sm px-4 py-3 text-gray-800  transition-all duration-300"
                                />
                                <ErrorMessage name="college" component="div" className="text-sm text-red-600 mt-1" />
                            </div>

                            <div>
                                <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                                    Course
                                </label>
                                <Field
                                    name="course"
                                    type="text"
                                    className="mt-1 w-[90%] block w-full rounded-xl border border-gray-300 bg-white/60  backdrop-blur-sm px-4 py-3 text-gray-800  transition-all duration-300"
                                />
                                <ErrorMessage name="course" component="div" className="text-sm text-red-600 mt-1" />
                            </div>

                            <div>
                                <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
                                    Batch
                                </label>
                                <Field
                                    name="batch"
                                    type="text"
                                    className="mt-1 w-[90%] block w-full rounded-xl border border-gray-300 bg-white/60  backdrop-blur-sm px-4 py-3 text-gray-800  transition-all duration-300"
                                />
                                <ErrorMessage name="batch" component="div" className="text-sm text-red-600 mt-1" />
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                    Mobile Number
                                </label>
                                <Field
                                    name="mobile"
                                    type="text"
                                    className="mt-1 w-[90%] block w-full rounded-xl border border-gray-300 bg-white/60  backdrop-blur-sm px-4 py-3 text-gray-800  transition-all duration-300"
                                />
                                <ErrorMessage name="mobile" component="div" className="text-sm text-red-600 mt-1" />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="mt-1 w-[90%] block w-full rounded-xl border border-gray-300 bg-white/60  backdrop-blur-sm px-4 py-3 text-gray-800  transition-all duration-300"
                                />
                                <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
                            </div>


                            <div className="md:col-span-2 flex justify-center">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
            relative group overflow-hidden
            border-2 border-orange text-orange
            bg-transparent px-10 py-4 font-poppins font-medium text-[18px]
            transition-all duration-300 ease-in-out
            hover:bg-orange-500 hover:text-orange
            rounded-xl
            hover:shadow-[0px_10px_28px_rgba(255,165,0,0.4)]
            active:scale-95 cursor-pointer
        `}
                                >
                                    submit the interest form
                                </motion.button>
                            </div>


                        </Form>
                    </Formik>
                </motion.div>
            </div>
        </div>
    );
};

export default InterestForm; 