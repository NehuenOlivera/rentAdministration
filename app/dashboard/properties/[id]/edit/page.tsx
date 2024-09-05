import Form from '@/app/ui/properties/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchAdjustmentFrequencies, fetchPropertyById } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [property, frequencies] = await Promise.all([
        fetchPropertyById(id),
        fetchAdjustmentFrequencies(),
    ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Propiedades', href: '/dashboard/properties' },
          {
            label: 'Editar Propiedad',
            href: `/dashboard/properties/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form property={property} frequencies={frequencies} />
    </main>
  );
}