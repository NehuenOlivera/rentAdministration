import Form from '@/app/ui/properties/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Propiedades', href: '/dashboard/properties' },
          {
            label: 'Crear Propiedades',
            href: '/dashboard/properties/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}