import { employees } from "@/employees";



const Users = () => {

  //format to uk date
  const formatDate = (dateString: string) => {
    const options: {} = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className='p-4'>
      <table className="w-full lg:w-9/12">
        <thead className="gap-y-2">
          <tr className="grid grid-cols-6 lg:grid-cols-8 gap-4 text-center py-2 px-2 border-b-2">
            <th className="col-span-2 lg:col-span-2">Name</th>
            <th className="hidden lg:flex lg:col-span-2">Email</th>
            <th className="col-span-2 lg:col-span-2">Phone</th>
            <th className="col-span-2 lg:col-span-2">Start-Date</th>
          </tr>
        </thead>
        <tbody className="gap-y-2">
          {employees.map((employee, id) => (
            <tr key={id} className='text-center text-wrap cursor-pointer grid grid-cols-6 lg:grid-cols-8 gap-4 py-2 border-b-2 h-24 lg:h-20 px-2'>
              <td className="col-span-2 lg:col-span-2  flex items-center justify-center">
                {employee.name}
              </td>
              <td className="hidden lg:col-span-2  lg:flex items-center justify-center">
                {employee.email}
              </td>
              <td className="col-span-2 lg:col-span-2  flex items-center justify-center">
                {employee.phone}
              </td>
              <td className="col-span-2 lg:col-span-2  flex items-center justify-center">
                {formatDate(employee.startDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
