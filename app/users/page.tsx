export const employees = [
  {
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "+44 7911 123456",
      dob: "1985-02-15",
      startDate: "2020-01-10"
  },
  {
      name: "Jane Smith",
      email: "janesmith@hotmail.com",
      phone: "+44 7911 234567",
      dob: "1990-07-22",
      startDate: "2018-04-23"
  },
  {
      name: "Michael Brown",
      email: "michaelbrown@gmail.com",
      phone: "+44 7911 345678",
      dob: "1988-11-10",
      startDate: "2019-09-15"
  },
  {
      name: "Emily Davis",
      email: "emilydavis@hotmail.com",
      phone: "+44 7911 456789",
      dob: "1992-03-30",
      startDate: "2021-05-18"
  },
  {
      name: "William Johnson",
      email: "williamjohnson@gmail.com",
      phone: "+44 7911 567890",
      dob: "1983-08-05",
      startDate: "2017-11-30"
  }
];

console.log(employees);



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
