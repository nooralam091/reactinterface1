import {useState,useEffect,useCallback} from "react";
import { BsFillBarChartFill } from "react-icons/bs";
import AddAppointment from "./components/AddApointments";
import Search from "./components/Search";
import AppointmentInfo from "./components/AppointmentInfo";


function App() {
  let [AppointmentList,setAppointmentList]=useState([]);
  let [query,setQuery]=useState("");
  let [sortBy,setSortBy]=useState("petName");
  let [orderBy,setOrderBy]=useState("asc");
  const filteredAppointmentsList=AppointmentList.filter(
    item=>{
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase()) 
      )
    }
  ).sort((a,b)=>{
    let order=(orderBy==='asc')?1:-1;
    return(
      a[sortBy].toLowerCase()<b[sortBy].toLowerCase()
      ?1*order:-1*order
    )
  })



  const fetchData=useCallback(()=>
  {
    fetch("./data.json")
    .then(response=>{return response.json()})
    .then(data=>setAppointmentList(data))
  },[]);

    useEffect(()=>{
      fetchData()
    //   fetch("./data.json")
    // .then(response=>{return response.json()})
    // .then(data=>setAppointmentList(data))
    },[fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BsFillBarChartFill className="inline-block text-red-400 align-auto" />
        Your appointments
      </h1>
      <AddAppointment />
      <Search query={query}
      onQueryChange={myQuery=>setQuery(myQuery)} 
      orderBy={orderBy}
      orderByChange={myOrderBy=>setOrderBy(myOrderBy)}
      sortBy={sortBy}
      onSortByChange={mySortBy=>setSortBy(mySortBy)}/>
      
      <ul className="divide-y divide-gray-200">        
        {filteredAppointmentsList.map((appointment) => (          
          <AppointmentInfo 
          key={appointment.id} 
          appointment={appointment} 
          onDeleteAppointment={
            appointmentId=>
            setAppointmentList(AppointmentList.filter(appointment=>appointment.id!==appointmentId))
          }/>
        ))}
      </ul>
    </div>
  );
}

export default App;
