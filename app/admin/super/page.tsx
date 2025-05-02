import { AddOperator } from "@/components/admin/addOperator";
import { ChangeAdminPassword } from "@/components/admin/changeAdminPassword";

export default function SuperAdminPage() {
  return (

    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">Super Admin Page</h1>
        <AddOperator/>
        <ChangeAdminPassword/>

      
    </main>
  );
}