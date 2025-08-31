import './Home.css';
import cover from '../assets/cover.png';
import CountingCircle from "../components/CountingCircle";

export default function Home() {
  return (
    <div>
<img src={cover} alt="FuturaTech Cover" className="w-full" />
     <div className="p-6 space-y-20">
      {/* Hero */}
      <section className="text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to FuturaTech University</h2>
        <p className="text-lg text-gray-600">Empowering the future with innovation and technology.</p>
      </section>

      {/* Counters */}
      <section className="flex flex-wrap gap-6 justify-center">
        <CountingCircle target={10000} label="Graduates" />
        <CountingCircle target={100} label="Courses" />
        <CountingCircle target={1200} label="Lectures" />
      </section>

      {/* About Us */}
      <section id="about" className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold mb-4">About Us</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          FuturaTech University is a forward-thinking institution dedicated to providing cutting-edge education in technology, science, and innovation. We believe in hands-on learning, real-world experience, and preparing students for the future.
        </p>
        <p className="text-gray-700 text-lg mt-4">
            Our curriculum is designed to bridge academic theory with real-world practice, and we are proud to offer hands-on learning experiences, industry partnerships, and globally recognized programs that empower students to become leaders in the tech world.
          </p>
         <a href="/about"><button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          View More
        </button>
        </a>
      </section>

      {/* Courses */}
      <section id="courses" className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold mb-4">Our Courses</h3>
        <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
          <li>Bachelor of Computer Science</li>
          <li>Data Science & AI Engineering</li>
          <li>Software Engineering</li>
          <li>Cybersecurity & Ethical Hacking</li>
          <li>Web & Mobile App Development</li>
        </ul>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          All Courses
        </button>
      </section>

      {/* Contact Us */}
      <section id="contact" className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold mb-4">Contact Us</h3>
        <p className="text-gray-700 text-lg mb-2">
          📍 123 Future Lane, Colombo, Sri Lanka
        </p>
        <p className="text-gray-700 text-lg mb-2">
          📞 +94 77 123 4567
        </p>
        <p className="text-gray-700 text-lg">
          📧 info@futuratech.edu.lk
        </p>
      </section>
    </div>
</div>
  );
}
