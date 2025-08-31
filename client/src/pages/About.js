import './Home.css';
import cover from '../assets/cover2.png';

export default function Home() {
  return (
    <div>
<img src={cover} alt="FuturaTech Cover" className="w-full" />
<section className="text-center">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
      </section>
      <section id="about" className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold mb-4">About Us</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          FuturaTech University is a forward-thinking institution dedicated to providing cutting-edge education in technology, science, and innovation. We believe in hands-on learning, real-world experience, and preparing students for the future.
        </p>
        <p className="text-gray-700 text-lg mt-4">
            Our curriculum is designed to bridge academic theory with real-world practice, and we are proud to offer hands-on learning experiences, industry partnerships, and globally recognized programs that empower students to become leaders in the tech world.
          </p>
         
      </section>

    </div>
  );
}
