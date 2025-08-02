import type { Client } from "../types";

export default function ClientTable({ clients }: { clients: Client[] }) {
   return (
      <table className="w-full table-auto border-collapse mt-4">
         <thead>
            <tr className="bg-gray-100">
               <th className="border px-4 py-2 text-left">Client ID</th>
               <th className="border px-4 py-2 text-left">Name</th>
               <th className="border px-4 py-2 text-left">Email</th>
               <th className="border px-4 py-2 text-left">Created At</th>
               <th className="border px-4 py-2 text-left">Updated At</th>
               <th className="border px-4 py-2 text-left">Status</th>
            </tr>
         </thead>
         <tbody>
            {clients.map(client => (
               <tr key={client.id}>
                  <td className="border px-4 py-2">{client.id}</td>
                  <td className="border px-4 py-2">{client.name}</td>
                  <td className="border px-4 py-2">{client.email}</td>
                  <td className="border px-4 py-2">{client.createdAt}</td>
                  <td className="border px-4 py-2">{client.updatedAt}</td>
                  <td className="border px-4 py-2">{client.status}</td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}
