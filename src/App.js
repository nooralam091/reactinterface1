import { BsFillBarChartFill } from "react-icons/bs";
import AddAppointment from "./components/AddApointments";
import Search from "./components/Search";
import AppointmentInfo from "./components/AppointmentInfo";
import AppontmentList from "./data.json"

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BsFillBarChartFill className="inline-block text-red-400 align-auto" />
        Your appointments
      </h1>
      <AddAppointment />
      <Search />

      <ul className="divide-y divide-gray-200">
        {AppontmentList.map((appointment) => (
          <AppointmentInfo key={appointment.id} appointment={appointment}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
