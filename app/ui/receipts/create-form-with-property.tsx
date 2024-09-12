'use client';

import { PropertyForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  Bars2Icon,
  BoltIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  HomeIcon,
  MapPinIcon,
  StopIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createReceiptFromProperty, ReceiptState } from '@/app/lib/actions';
import { useActionState } from 'react';
import Toggle from '../toggle';

export default function Form({ property }: { property: PropertyForm }) {
  const createReceiptWithId = createReceiptFromProperty.bind(null, property.id);

  
  const initialState: ReceiptState = { errors: {}, message: null };
  const [state, formAction] = useActionState(createReceiptWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Tenant Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre de Inquilino
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                placeholder="Nombre de Inquilino"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={property.tenant_name}
              />
              <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Period being checked */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Periodo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                placeholder="Periodo de recibo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
            <label htmlFor="street_name" className="mb-2 block text-sm font-medium">
                Ubicación
            </label>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="street_name"
                        name="street_name"
                        type="string"
                        placeholder="Calle"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                        defaultValue={property.street_name}
                    />
                    <Bars2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative lg:col-span-1">
                    <input
                        id="street_number"
                        name="street_number"
                        type="string"
                        placeholder="Número"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                        defaultValue={property.street_number}
                    />
                    <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative lg:col-span-1">
                    <input
                        id="floor_number"
                        name="floor_number"
                        type="string"
                        placeholder="Piso"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={property.floor_number}
                    />
                    <StopIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative lg:col-span-1">
                    <input
                        id="apartment_number"
                        name="apartment_number"
                        type="string"
                        placeholder="Departamento"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={property.apartment_number}
                    />
                    <StopIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>

        {/* Rent */}
        <div className="mb-4">
          <label htmlFor="monthly_rent" className="mb-2 block text-sm font-medium">
            Alquiler
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="monthly_rent"
                        name="monthly_rent"
                        type="string"
                        placeholder="Monto de alquiler"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                        defaultValue={property.monthly_rent}
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative lg:col-span-1">
                    <Toggle labelOff="Debe" labelOn="Pagado" initialState={false} />
                </div>
            </div>
        </div>
      </div>

        {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/properties/${property.id}/receipts`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Recibo</Button>
      </div>
    </form>
  );
}
