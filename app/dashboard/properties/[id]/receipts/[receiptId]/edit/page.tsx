import Form from '@/app/ui/receipts/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchReceiptById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

 
export default async function Page({ params }: { params: { receiptId: string } }) {

    const receipt = await fetchReceiptById(params.receiptId);
    if (!receipt) {
        notFound();
    }
    // Modify the receipt start_date and end_date to be a string
    receipt.rental_period_start = new Date(receipt.rental_period_start).toISOString().split('T')[0];
    receipt.rental_period_end = new Date(receipt.rental_period_end).toISOString().split('T')[0];

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Recibos', href: `/dashboard/properties/${receipt.property_id}/receipts` },
            {
                label: 'Editar Recibo',
                href: '/dashboard/receipts/create',
                active: true,
            },
            ]}
        />
        <Form receipt={receipt} />
        </main>
    );
}
