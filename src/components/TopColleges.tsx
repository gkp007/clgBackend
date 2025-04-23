import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Contact {
    email: string;
    phone: string;
    address: string;
}

interface College {
    _id: string;
    name: string;
    location: string;
    description: string;
    establishedYear: number;
    courses: string[];
    facilities: string[];
    contact: Contact;
    images: string[];
    rating: number;
    website: string;
}

export default function CollegeRankingTable() {
    const [colleges, setColleges] = useState<College[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState('All');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({ key: 'rating', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching colleges from API...');

            const API_URL = 'http://localhost:5000/api/colleges';
            console.log('Fetching from:', API_URL);

            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('Server error response:', errorData);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received colleges data:', data);

            if (!Array.isArray(data)) {
                console.error('Received non-array data:', data);
                throw new Error('Invalid data format received from server');
            }

            console.log(`Received ${data.length} colleges`);
            setColleges(data);
        } catch (err) {
            console.error('Error fetching colleges:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while fetching colleges');
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key: string) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const mainCourses = ["All", "B.TECH", "DIPLOMA", "MBA", "MCA"];
    const courses = mainCourses.filter(course =>
        course === "All" || colleges.some(college => college.courses.includes(course))
    );

    const filteredColleges = selectedCourse === 'All'
        ? colleges
        : colleges.filter((college) => college.courses.includes(selectedCourse));

    // Add search filtering
    const searchedColleges = searchQuery
        ? filteredColleges.filter(college =>
            college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            college.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : filteredColleges;

    const sortedColleges = [...searchedColleges].sort((a, b) => {
        if (sortConfig.key === 'rating') {
            return sortConfig.direction === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        }
        return 0;
    });

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentColleges = sortedColleges.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedColleges.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                    <p>Loading colleges...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 max-w-full mx-auto">
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Error Loading Colleges</h3>
                    <p>{error}</p>
                    <button
                        onClick={fetchColleges}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (colleges.length === 0) {
        return (
            <div className="p-4 max-w-full mx-auto">
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">No Colleges Found</h3>
                    <p>There are no colleges in the database yet.</p>
                    <button
                        onClick={fetchColleges}
                        className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 px-12 max-w-full mx-auto animate-fade-in">




            <h1 className="text-4xl text-center font-extrabold md:text-4xl text-orange mb-10 leading-tight racking-tight">
                Top Colleges
            </h1>

            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search colleges by name or location..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // Reset to first page when searching
                        }}
                        className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Course Filters */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">Filter by Course</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                    {courses.map((course) => (
                        <button
                            key={course}
                            onClick={() => {
                                setSelectedCourse(course);
                                setCurrentPage(1);
                            }}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${selectedCourse === course
                                ? 'bg-orange text-white shadow-lg'
                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:text-gray-500 hover:border-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {course}
                            {course !== 'All' && (
                                <span className="ml-2 text-sm opacity-75">
                                    ({colleges.filter(college => college.courses.includes(course)).length})
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>



            {/* Table */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-4 max-w-full mx-auto overflow-x-auto sm:overflow-x-hidden shadow-lg bg-white"
            >
                <table className="w-full min-w-[700px] rounded-lg text-sm text-left">
                    <thead className="bg-gray-400 border text-white">
                        <tr>
                            <th className="p-4 rounded-tl-xl">College Name</th>
                            <th className="p-4">Location</th>
                            <th
                                className="p-4 cursor-pointer hover:bg-blue-500 transition-colors duration-200"
                                onClick={() => handleSort('rating')}
                            >
                                Rating {sortConfig.key === 'rating' && (sortConfig.direction === 'asc' ? '⬆️' : '⬇️')}
                            </th>
                            <th className="p-4">Courses</th>
                            {/* <th className="p-4">Facilities</th> */}
                            {/* <th className="p-4">Contact</th> */}
                            {/* <th className="p-4">Established Year</th> */}
                            <th className="p-4 rounded-tr-xl">Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentColleges.map((college, index) => (
                            <motion.tr
                                key={college._id}
                                className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 group relative transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg hover:z-10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <td className="p-4 group-hover:bg-transparent">
                                    <div className="font-medium text-lg group-hover:text-blue-600 transition-colors duration-200">
                                        {college.name}
                                    </div>
                                    {/* <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                                        {college.description}
                                    </div> */}
                                </td>
                                <td className="p-4 group-hover:bg-transparent">
                                    <span className="flex items-center group-hover:text-blue-600 transition-colors duration-200">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {college.location}
                                    </span>
                                </td>
                                <td className="p-4 group-hover:bg-transparent">
                                    <span className="flex items-center group-hover:text-yellow-500 transition-colors duration-200">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        {college.rating}/5
                                    </span>
                                </td>
                                <td className="p-4 group-hover:bg-transparent">
                                    <div className="flex flex-wrap gap-1">
                                        {college.courses?.map((course, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors duration-200"
                                            >
                                                {course}
                                            </span>
                                        )) || 'N/A'}
                                    </div>
                                </td>
                                {/* <td className="p-4 group-hover:bg-transparent">
                                    <div className="flex flex-wrap gap-1">
                                        {college.facilities?.map((facility, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 group-hover:bg-indigo-200 transition-colors duration-200"
                                            >
                                                {facility}
                                            </span>
                                        )) || 'N/A'}
                                    </div>
                                </td> */}
                                {/* <td className="p-4 group-hover:bg-transparent">
                                    {college.contact ? (
                                        <div className="group-hover:text-blue-600 transition-colors duration-200">
                                            <div className="flex items-center py-2">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {college.contact.email}
                                            </div>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                {college.contact.phone}
                                            </div>
                                            <div className="text-xs flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {college.contact.address}
                                            </div>
                                        </div>
                                    ) : (
                                        'N/A'
                                    )}
                                </td> */}
                                {/* <td className="p-4 group-hover:bg-transparent">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 group-hover:bg-gray-200 transition-colors duration-200">
                                        {college.establishedYear}
                                    </span>
                                </td> */}
                                <td className="p-4 group-hover:bg-transparent">
                                    {college.website && (
                                        <a
                                            href={college.website.startsWith('http') ? college.website : `http://${college.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200 group-hover:underline"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Visit Website
                                        </a>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4 p-4 border-t border-gray-100">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(indexOfLastItem, sortedColleges.length)}</span>{' '}
                                of <span className="font-medium">{sortedColleges.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number
                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}