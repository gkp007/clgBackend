// src/screens/Scholarship.tsx
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUserGraduate, FaFileDownload } from "react-icons/fa";
import axios from "axios";

interface College {
    _id: string;
    name: string;
    courses: string[];
}

interface ScholarshipFormValues {
    fullName: string;
    mobileNumber: string;
    emailId: string;
    aadharNo: string;
    annualIncome: string;
    counsellor_no: string;
    How_did_you_hear_about_us: string;
    tenthPercentage: string;
    twelfthPercentage: string;
    graduation: string;
    interestedCollege: string;
    interestedStream: string;
}

const validationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    mobileNumber: Yup.string().length(10, "Must be 10 digits").required("Required"),
    emailId: Yup.string().email("Invalid email format").required("Required"),
    aadharNo: Yup.string().length(12, "Must be 12 digits").required("Required"),
    annualIncome: Yup.string().required("Required"),
    counsellor_no: Yup.string(),
    How_did_you_hear_about_us: Yup.string().required("Required"),
    tenthPercentage: Yup.string().required("Required"),
    twelfthPercentage: Yup.string().required("Required"),
    graduation: Yup.string(),
    interestedCollege: Yup.string().required("Required"),
    interestedStream: Yup.string().required("Required"),
});

const hearAboutUsOptions = [
    { value: "from friends", label: "From Friends" },
    { value: "through ad", label: "Through Ad" },
    { value: "others", label: "Others" }
];

export default function Scholarship() {
    const [collegeOptions, setCollegeOptions] = useState<{ value: string; label: string }[]>([]);
    const [streamOptions, setStreamOptions] = useState<{ value: string; label: string }[]>([]);
    const [colleges, setColleges] = useState<College[]>([]);
    const [selectedCollege, setSelectedCollege] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:5000/api/colleges/");
                const collegesData: College[] = res.data;
                setColleges(collegesData);

                // Format college options
                const formattedColleges = collegesData.map((college) => ({
                    value: college._id,
                    label: college.name
                }));

                setCollegeOptions([{ value: "", label: "Select College" }, ...formattedColleges]);
                setStreamOptions([{ value: "", label: "Select Course" }]);
            } catch (error) {
                console.error("Error fetching dropdown data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    // Update streams when college selection changes
    const handleCollegeChange = (collegeId: string, setFieldValue: (field: string, value: any) => void) => {
        setSelectedCollege(collegeId);
        setFieldValue('interestedCollege', collegeId);
        setFieldValue('interestedStream', ''); // Reset stream selection

        if (!collegeId) {
            setStreamOptions([{ value: "", label: "Select Course" }]);
            return;
        }

        const selectedCollege = colleges.find(college => college._id === collegeId);
        if (selectedCollege) {
            const formattedStreams = selectedCollege.courses.map(course => ({
                value: course,
                label: course
            }));
            setStreamOptions([{ value: "", label: "Select Course" }, ...formattedStreams]);
        }
    };

    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const initialValues: ScholarshipFormValues = {
        fullName: "",
        mobileNumber: "",
        emailId: "",
        aadharNo: "",
        annualIncome: "",
        counsellor_no: "",
        How_did_you_hear_about_us: "",
        tenthPercentage: "",
        twelfthPercentage: "",
        graduation: "",
        interestedCollege: "",
        interestedStream: "",
    };

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: ScholarshipFormValues, { resetForm }: any) => {
        try {
            const response = await axios.post("http://localhost:5000/api/submissions", values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setSuccess("🎉 Your scholarship form has been submitted successfully!");
            setError(null);
            resetForm();

            setTimeout(() => setSuccess(null), 5000);
        } catch (err: any) {
            console.error("Submission failed:", err);
            setError("🚫 Failed to submit the form. Please try again later.");
            setSuccess(null);

            setTimeout(() => setError(null), 5000);
        }
    };


    const inputClass =
        "mt-1 block w-full rounded-xl border border-gray-600 bg-white/60 px-4 py-3 text-gray-800 placeholder:text-gray-400";

    const errorClass = "text-sm text-red-600 mt-1";

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className=" mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange to-pink-600">
                        Scholarship Application
                    </h1>
                    <p className="mt-3 text-lg text-gray-600">Fill out your details to apply</p>
                    {/* <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-gradient rounded-full hover:shadow-xl transition-all duration-300 flex items-center justify-center mx-auto gap-2"
                    >
                        <FaFileDownload className="text-xl" />
                        Download Guidelines
                    </motion.button> */}
                </motion.div>

                {/* Add Eligibility Component */}



                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl border-2 border-orange shadow-sm"
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Personal Details Section */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <FaUserGraduate className="text-3xl text-orange" />
                                            <h2 className="text-2xl font-bold text-orange-600">Personal Details</h2>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            <div>
                                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                                <Field name="fullName" className={inputClass} />
                                                <ErrorMessage name="fullName" component="div" className={errorClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                                <Field name="mobileNumber" className={inputClass} />
                                                <ErrorMessage name="mobileNumber" component="div" className={errorClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">Email ID</label>
                                                <Field name="emailId" type="email" className={inputClass} />
                                                <ErrorMessage name="emailId" component="div" className={errorClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="aadharNo" className="block text-sm font-medium text-gray-700">Aadhar No.</label>
                                                <Field name="aadharNo" className={inputClass} />
                                                <ErrorMessage name="aadharNo" component="div" className={errorClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">Annual Income</label>
                                                <Field name="annualIncome" type="number" className={inputClass} />
                                                <ErrorMessage name="annualIncome" component="div" className={errorClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="How_did_you_hear_about_us" className="block text-sm font-medium text-gray-700">How did you hear about us?</label>
                                                <Field
                                                    as="select"
                                                    name="How_did_you_hear_about_us"
                                                    className={inputClass}
                                                >
                                                    <option value="">Select an option</option>
                                                    {hearAboutUsOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="How_did_you_hear_about_us" component="div" className={errorClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="counsellor_no" className="block text-sm font-medium text-gray-700">Counsellor Mobile No. (Optional)</label>
                                                <Field name="counsellor_no" className={inputClass} />
                                                <ErrorMessage name="counsellor_no" component="div" className={errorClass} />
                                            </div>


                                        </div>
                                    </div>

                                    {/* Educational Details Section */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <FaGraduationCap className="text-3xl text-orange" />
                                            <h2 className="text-2xl font-bold text-orange-600">Educational Details</h2>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            <div>
                                                <label htmlFor="tenthPercentage" className="block text-sm font-medium text-gray-700">10th Percentage</label>
                                                <Field name="tenthPercentage" type="number" className={inputClass} />
                                                <ErrorMessage name="tenthPercentage" component="div" className={errorClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="twelfthPercentage" className="block text-sm font-medium text-gray-700">12th Percentage</label>
                                                <Field name="twelfthPercentage" type="number" className={inputClass} />
                                                <ErrorMessage name="twelfthPercentage" component="div" className={errorClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="graduation" className="block text-sm font-medium text-gray-700">Graduation % (Optional)</label>
                                                <Field name="graduation" type="number" className={inputClass} />
                                            </div>

                                            <div>
                                                <label htmlFor="interestedCollege" className="block text-sm font-medium text-gray-700">Interested College</label>
                                                <Field
                                                    as="select"
                                                    name="interestedCollege"
                                                    className={`${inputClass} ${loading ? 'opacity-50' : ''}`}
                                                    disabled={loading}
                                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                        handleCollegeChange(e.target.value, setFieldValue);
                                                    }}
                                                >
                                                    {loading ? (
                                                        <option>Loading colleges...</option>
                                                    ) : (
                                                        collegeOptions.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))
                                                    )}
                                                </Field>
                                                {loading && <div className="text-sm text-gray-600">Loading colleges...</div>}
                                            </div>

                                            <div>
                                                <label htmlFor="interestedStream" className="block text-sm font-medium text-gray-700">Interested Course</label>
                                                <Field
                                                    as="select"
                                                    name="interestedStream"
                                                    className={inputClass}
                                                    disabled={!selectedCollege}
                                                >
                                                    {streamOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6 text-center"
                                    >
                                        {success}
                                    </motion.div>
                                )}

                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded mb-6 text-center">
                                        {error}
                                    </div>
                                )}


                                {/* Submit Button */}
                                <div className="mt-12 flex justify-center">
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`
      relative group overflow-hidden
      border-2 border-orange text-orange
      bg-transparent px-10 py-4 font-poppins font-medium text-[18px]
      rounded-tl-full rounded-br-full transition-all duration-300 ease-in-out
      hover:bg-orange-500 hover:text-orange
      hover:shadow-[0px_10px_28px_rgba(255,165,0,0.4)]
      active:scale-95 cursor-pointer
    `}
                                    >
                                        Submit Application
                                    </motion.button>
                                </div>
                            </Form>
                        )}


                    </Formik>
                </motion.div>
            </div>
        </div>
    );
}
