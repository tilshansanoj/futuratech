import './Home.css';
import cover from '../assets/cover2.png';

export default function Home() {
  return (
    <div>
<img src={cover} alt="FuturaTech Cover" className="w-full" />
<section className="text-center">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
      </section>
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
<section id="form" className="max-w-4xl mx-auto">
    

</section>
    </div>
  );
}
