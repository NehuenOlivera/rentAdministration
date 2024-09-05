'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const PropertyFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    street_name: z.string(),
    street_number: z.string(),
    floor_number: z.string(),
    apartment_number: z.string(),
    city: z.string(),
    dgr_code: z.string(),
    municipal_code: z.string(),
    epec_client_number: z.string(),
    epec_contract_number: z.string(),
    water_contract_number: z.string(),
    landlord_name: z.string(),
    tenant_name: z.string(),
    tenant_cuit_cuil: z.string(),
    contact_person_name: z.string(),
    contact_person_phone: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    adjustment_frequency_id: z.coerce.number(),
    monthly_rent: z.coerce.number(),
    comments: z.string(),
});

const CreateProperty = PropertyFormSchema.omit({ id: true, city: true });

export async function createProperty(formData: FormData) {
    const {
        name,
        street_name,
        street_number,
        floor_number,
        apartment_number,
        dgr_code,
        municipal_code,
        epec_client_number,
        epec_contract_number,
        water_contract_number,
        landlord_name,
        tenant_name,
        tenant_cuit_cuil,
        contact_person_name,
        contact_person_phone,
        start_date,
        end_date,
        adjustment_frequency_id,
        monthly_rent,
        comments,
    } = CreateProperty.parse({
        name: formData.get('name'),
        street_name: formData.get('street_name'),
        street_number: formData.get('street_number'),
        floor_number: formData.get('floor_number'),
        apartment_number: formData.get('apartment_number'),
        dgr_code: formData.get('dgr_code'),
        municipal_code: formData.get('municipal_code'),
        epec_client_number: formData.get('epec_client_number'),
        epec_contract_number: formData.get('epec_contract_number'),
        water_contract_number: formData.get('water_contract_number'),
        landlord_name: formData.get('landlord_name'),
        tenant_name: formData.get('tenant_name'),
        tenant_cuit_cuil: formData.get('tenant_cuit_cuil'),
        contact_person_name: formData.get('contact_person_name'),
        contact_person_phone: formData.get('contact_person_phone'),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date'),
        adjustment_frequency_id: formData.get('adjustment_frequency_id'),
        monthly_rent: formData.get('monthly_rent'),
        comments: formData.get('comments'),
    });

    const rent_amount_in_cents = monthly_rent * 100;
    const city = 'Córdoba';

    try {
        await sql`
            INSERT INTO properties (
                name,
                street_name,
                street_number,
                floor_number,
                apartment_number,
                city,
                dgr_code,
                municipal_code,
                epec_client_number,
                epec_contract_number,
                water_contract_number,
                landlord_name,
                tenant_name,
                tenant_cuit_cuil,
                contact_person_name,
                contact_person_phone,
                start_date,
                end_date,
                monthly_rent,
                adjustment_frequency_id,
                comments
            )
            VALUES (
                ${name},
                ${street_name},
                ${street_number},
                ${floor_number},
                ${apartment_number},
                ${city},
                ${dgr_code},
                ${municipal_code},
                ${epec_client_number},
                ${epec_contract_number},
                ${water_contract_number},
                ${landlord_name},
                ${tenant_name},
                ${tenant_cuit_cuil},
                ${contact_person_name},
                ${contact_person_phone},
                ${start_date},
                ${end_date},
                ${rent_amount_in_cents},
                ${adjustment_frequency_id},
                ${comments}
            )
        `;
        // TODO: Implementar redireccion despues de crear la propiedad
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to create property.');
    }

    revalidatePath('/dashboard/properties');
    redirect('/dashboard/properties');
}

const UpdateProperty = PropertyFormSchema.omit({ id: true, city: true });

export async function updateProperty(id: string, formData: FormData) {
    const {
        name,
        street_name,
        street_number,
        floor_number,
        apartment_number,
        dgr_code,
        municipal_code,
        epec_client_number,
        epec_contract_number,
        water_contract_number,
        landlord_name,
        tenant_name,
        tenant_cuit_cuil,
        contact_person_name,
        contact_person_phone,
        start_date,
        end_date,
        adjustment_frequency_id,
        monthly_rent,
        comments,
    } = UpdateProperty.parse({
        name: formData.get('name'),
        street_name: formData.get('street_name'),
        street_number: formData.get('street_number'),
        floor_number: formData.get('floor_number'),
        apartment_number: formData.get('apartment_number'),
        dgr_code: formData.get('dgr_code'),
        municipal_code: formData.get('municipal_code'),
        epec_client_number: formData.get('epec_client_number'),
        epec_contract_number: formData.get('epec_contract_number'),
        water_contract_number: formData.get('water_contract_number'),
        landlord_name: formData.get('landlord_name'),
        tenant_name: formData.get('tenant_name'),
        tenant_cuit_cuil: formData.get('tenant_cuit_cuil'),
        contact_person_name: formData.get('contact_person_name'),
        contact_person_phone: formData.get('contact_person_phone'),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date'),
        adjustment_frequency_id: formData.get('adjustment_frequency_id'),
        monthly_rent: formData.get('monthly_rent'),
        comments: formData.get('comments'),
    });

    const rent_amount_in_cents = monthly_rent * 100;
    const city = 'Córdoba';

    const new_start_date = start_date === '' ? new Date().toISOString().split('T')[0] : start_date;
    const new_end_date = end_date === '' ? new Date().toISOString().split('T')[0] : end_date;

    try {
        await sql`
            UPDATE properties
            SET
                name = ${name},
                street_name = ${street_name},
                street_number = ${street_number},
                floor_number = ${floor_number},
                apartment_number = ${apartment_number},
                city = ${city},
                dgr_code = ${dgr_code},
                municipal_code = ${municipal_code},
                epec_client_number = ${epec_client_number},
                epec_contract_number = ${epec_contract_number},
                water_contract_number = ${water_contract_number},
                landlord_name = ${landlord_name},
                tenant_name = ${tenant_name},
                tenant_cuit_cuil = ${tenant_cuit_cuil},
                contact_person_name = ${contact_person_name},
                contact_person_phone = ${contact_person_phone},
                start_date = ${new_start_date},
                end_date = ${new_end_date},
                monthly_rent = ${rent_amount_in_cents},
                adjustment_frequency_id = ${adjustment_frequency_id},
                comments = ${comments}
            WHERE id = ${id}
        `;

        // TODO: Implementar redireccion despues de actualizar la propiedad
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update property.');
    }

    revalidatePath('/dashboard/properties');
    redirect('/dashboard/properties');
}

export async function deleteProperty(id: string) {
    try {
        await sql`DELETE FROM properties WHERE id = ${id}`;
        revalidatePath('/dashboard/properties');
        return { message: 'Propiedad eliminada' };
    } catch (error) {
        return { message: 'Database error: Error al eliminar la propiedad' };
    }
  }
