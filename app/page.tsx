import Chart from "@/components/Chart"
import Tickets from "@/components/Tickets"
import { tickets } from "../components/FakeData";

const DashBoard = async () => {


  return (
    <div className="p-3 w-full flex flex-col lg:flex-row justify-center">
      <Tickets />
      {/* <Chart data={tickets}/> */}
    </div>
  )
}

export default DashBoard
