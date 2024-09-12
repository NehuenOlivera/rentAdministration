import Form from '@/app/ui/receipts/create-form-with-property';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchPropertyById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

 
export default async function Page({ params }: { params: { id: string } }) {

    const property = await fetchPropertyById(params.id);
    if (!property) {
        notFound();
    }

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Recibos', href: '/dashboard/receipts' },
            {
                label: 'Crear Recibo',
                href: '/dashboard/receipts/create',
                active: true,
            },
            ]}
        />
        <Form property={property} />
        </main>
    );
}
