import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';

interface ContactFormValues {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Required"),
    subject: Yup.string().required("Required"),
    message: Yup.string()
        .required("Required")
        .min(10, "Message must be at least 10 characters"),
});

const initialValues: ContactFormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

const ContactUsForm = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (values: ContactFormValues, { resetForm }: any) => {
        try {
            const response = await axios.post('http://localhost:5000/api/contactUs', values);
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
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl border-2 border-orange"
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                        Contact Us
                    </h2>

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            Message sent successfully!
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
                        <Form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="mt-1 w-[90%] block w-full rounded-xl border border-gray-300 bg-white/60 backdrop-blur-sm px-4 py-3 text-gray-800 transition-all duration-300"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-sm text-red-600 mt-1" />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className="mt-1 w-[90%] block w-full rounded-xl border border-gray-300 bg-white/60 backdrop-blur-sm px-4 py-3 text-gray-800 transition-all duration-300"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <Field
                                    name="subject"
                                    type="text"
                                    className="mt-1 w-[90%] block w-full rounded-xl border border-gray-300 bg-white/60 backdrop-blur-sm px-4 py-3 text-gray-800 transition-all duration-300"
                                />
                                <ErrorMessage name="subject" component="div" className="text-sm text-red-600 mt-1" />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <Field
                                    as="textarea"
                                    name="message"
                                    rows={4}
                                    className="mt-1 w-[90%] block w-full rounded-xl border border-gray-300 bg-white/60 backdrop-blur-sm px-4 py-3 text-gray-800 transition-all duration-300"
                                />
                                <ErrorMessage name="message" component="div" className="text-sm text-red-600 mt-1" />
                            </div>

                            <div className="flex justify-center">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                        relative group overflow-hidden
                                        border-2 border-orange text-orange
                                        bg-transparent px-10 py-4 font-poppins font-medium text-[18px]
                                        transition-all duration-300 ease-in-out
                                        hover:bg-orange-500 hover:text-white
                                        rounded-xl
                                        hover:shadow-[0px_10px_28px_rgba(255,165,0,0.4)]
                                        active:scale-95 cursor-pointer
                                    `}
                                >
                                    Send Message
                                </motion.button>
                            </div>
                        </Form>
                    </Formik>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUsForm; 