export default function CompanyTable({ companies }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-600">
            <th className="p-2 border text-left">Id</th>
            <th className="p-2 border text-left">Company Name</th>
            <th className="p-2 border text-left">Location</th>
            <th className="p-2 border text-left">Industry</th>
          </tr>
        </thead>
        <tbody>
          {companies?.map((company, idx) => (
            <tr key={idx} className="hover:bg-gray-500">
              <td className="p-2 border">{idx + 1}</td>
              <td className="p-2 border">{company.name}</td>
              <td className="p-2 border">{company.location}</td>
              <td className="p-2 border">{company.industry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
