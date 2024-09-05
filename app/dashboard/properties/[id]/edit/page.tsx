import Form from '@/app/ui/properties/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchAdjustmentFrequencies, fetchPropertyById } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [property, frequencies] = await Promise.all([
        fetchPropertyById(id),
        fetchAdjustmentFrequencies(),
    ]);
    // Modify the property start_date and end_date to be a string
    property.start_date = new Date(property.start_date).toISOString().split('T')[0];
    property.end_date = new Date(property.end_date).toISOString().split('T')[0];
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