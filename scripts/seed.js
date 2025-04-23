require('dotenv').config();
const mongoose = require('mongoose');

const collegeData = [
    {
        name: "MIT College of Engineering",
        location: "Pune, Maharashtra",
        courses: ["B.TECH", "MBA", "MCA"],
        rating: 4.8,
        description:
            "A premier engineering institution known for its excellence in technical education",
        establishedYear: 1983,
        facilities: [
            "Modern Laboratories",
            "Sports Complex",
            "Library",
            "Hostel",
            "Cafeteria",
        ],
        contact: {
            email: "info@mitcollege.edu",
            phone: "+91-20-12345678",
            address: "MIT Campus, Pune, Maharashtra",
        },
        website: "www.mitcollege.edu",
    },
    {
        name: "VIT Engineering College",
        location: "Vellore, Tamil Nadu",
        courses: ["B.TECH", "DIPLOMA", "MBA"],
        rating: 4.7,
        description: "One of India's top private engineering institutions",
        establishedYear: 1984,
        facilities: [
            "Research Centers",
            "Innovation Lab",
            "Library",
            "Sports Complex",
            "Hostel",
        ],
        contact: {
            email: "admissions@vit.edu",
            phone: "+91-41-67890123",
            address: "VIT Campus, Vellore, Tamil Nadu",
        },
        website: "www.vit.edu",
    },
    {
        name: "BITS Pilani",
        location: "Pilani, Rajasthan",
        courses: ["B.TECH", "MBA", "MCA"],
        rating: 4.9,
        description:
            "Leading technical and science institute with multiple campuses",
        establishedYear: 1964,
        facilities: [
            "Advanced Labs",
            "Innovation Center",
            "Library",
            "Sports Complex",
            "Hostel",
        ],
        contact: {
            email: "info@bitspilani.edu",
            phone: "+91-15-98765432",
            address: "BITS Campus, Pilani, Rajasthan",
        },
        website: "www.bits-pilani.ac.in",
    },
    {
        name: "Symbiosis Institute",
        location: "Pune, Maharashtra",
        courses: ["MBA", "MCA", "DIPLOMA"],
        rating: 4.6,
        description: "Renowned for management and technical education",
        establishedYear: 1971,
        facilities: [
            "Digital Library",
            "Computer Labs",
            "Auditorium",
            "Cafeteria",
            "Gym",
        ],
        contact: {
            email: "admissions@symbiosis.edu",
            phone: "+91-20-45678901",
            address: "Symbiosis Campus, Pune, Maharashtra",
        },
        website: "www.symbiosis.ac.in",
    },
    {
        name: "IIT Delhi",
        location: "New Delhi, Delhi",
        courses: ["B.TECH", "MBA"],
        rating: 5.0,
        description: "Premier institute for engineering and technology education",
        establishedYear: 1961,
        facilities: [
            "Research Labs",
            "Innovation Hub",
            "Library",
            "Sports Complex",
            "Hostels",
        ],
        contact: {
            email: "info@iitd.ac.in",
            phone: "+91-11-23456789",
            address: "IIT Campus, Hauz Khas, New Delhi",
        },
        website: "www.iitd.ac.in",
    },
    {
        name: "Government Polytechnic",
        location: "Mumbai, Maharashtra",
        courses: ["DIPLOMA"],
        rating: 4.2,
        description: "Leading government institute for diploma courses",
        establishedYear: 1957,
        facilities: ["Technical Labs", "Workshop", "Library", "Cafeteria"],
        contact: {
            email: "info@gpmumbai.edu",
            phone: "+91-22-34567890",
            address: "GP Campus, Mumbai, Maharashtra",
        },
        website: "www.gpmumbai.ac.in",
    },
    {
        name: "NMIMS University",
        location: "Mumbai, Maharashtra",
        courses: ["MBA", "B.TECH", "MCA"],
        rating: 4.5,
        description:
            "Top-ranked private university for management and technical education",
        establishedYear: 1981,
        facilities: [
            "Bloomberg Lab",
            "Computer Center",
            "Library",
            "Auditorium",
            "Cafeteria",
        ],
        contact: {
            email: "admissions@nmims.edu",
            phone: "+91-22-89012345",
            address: "NMIMS Campus, Mumbai, Maharashtra",
        },
        website: "www.nmims.edu",
    },
    {
        name: "Manipal Institute of Technology",
        location: "Manipal, Karnataka",
        courses: ["B.TECH", "MCA", "DIPLOMA"],
        rating: 4.6,
        description: "Part of Manipal University, known for technical excellence",
        establishedYear: 1957,
        facilities: [
            "Innovation Center",
            "Research Labs",
            "Library",
            "Sports Complex",
            "Hostels",
        ],
        contact: {
            email: "info@manipal.edu",
            phone: "+91-82-67890123",
            address: "MIT Campus, Manipal, Karnataka",
        },
        website: "www.manipal.edu",
    },
    {
        name: "IIIT Bangalore",
        location: "Bangalore, Karnataka",
        courses: ["B.TECH", "MCA"],
        rating: 4.7,
        description: "Specialized in Information Technology education and research",
        establishedYear: 1999,
        facilities: [
            "Research Labs",
            "Innovation Hub",
            "Digital Library",
            "Sports Complex",
        ],
        contact: {
            email: "admissions@iiitb.ac.in",
            phone: "+91-80-78901234",
            address: "IIIT Campus, Bangalore, Karnataka",
        },
        website: "www.iiitb.ac.in",
    },
    {
        name: "SP Jain Institute",
        location: "Mumbai, Maharashtra",
        courses: ["MBA"],
        rating: 4.8,
        description: "Global business school with multiple international campuses",
        establishedYear: 1981,
        facilities: [
            "Trading Room",
            "Innovation Lab",
            "Library",
            "Auditorium",
            "Cafeteria",
        ],
        contact: {
            email: "info@spjain.org",
            phone: "+91-22-56789012",
            address: "SP Jain Campus, Mumbai, Maharashtra",
        },
        website: "www.spjain.org",
    },
];

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college_db';

// Define the College schema
const collegeSchema = new mongoose.Schema({
    name: String,
    location: String,
    courses: [String],
    rating: Number,
    description: String,
    establishedYear: Number,
    facilities: [String],
    contact: {
        email: String,
        phone: String,
        address: String
    },
    website: String
});

const College = mongoose.model('College', collegeSchema);

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await College.deleteMany({});
        console.log('Cleared existing colleges');

        // Insert new data
        const insertedColleges = await College.insertMany(collegeData);
        console.log(`Successfully inserted ${insertedColleges.length} colleges`);

        console.log('Database seeding completed');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the seeding function
seedDatabase(); 