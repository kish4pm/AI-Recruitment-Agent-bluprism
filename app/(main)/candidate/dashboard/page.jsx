import react from "react";
import WelcomeContainer from './_components/WelcomeContainer';
import CreateOptions from "./_components/CreateOptions";

function DashboardC() {

    return (
      
      <div>
        <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
        <CreateOptions/>
      </div>
    );
  }
  
export default DashboardC;