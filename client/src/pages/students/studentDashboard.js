import '../Home.css';
import { Link } from "react-router-dom";

export default function Home() {
   const tiles = [
    { title: "Enroll New Course", color: "bg-blue-200", link: "/enroll" },
    { title: "New Assignments", color: "bg-green-200", link: "/studentassignments" },
    { title: "My Results", color: "bg-purple-200", link: "/studentsresults" },
    { title: "Time Table", color: "bg-pink-200", link: "/timetable" },
  ];
  return (
    <div>
<section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
      {tiles.map((tile, index) => (
        <Link
          to={tile.link}
          key={index}
          className={`${tile.color} text-green rounded-2xl shadow-lg p-8 flex items-center justify-center text-xl font-semibold hover:opacity-90 transition`}
        >
          {tile.title}
        </Link>
      ))}
    </div>
    </div>
  );
}
