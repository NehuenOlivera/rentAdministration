'use client';

import { PropertyForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  Bars2Icon,
  BoltIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  HomeIcon,
  LightBulbIcon,
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
        <input type="hidden" name="property_id" value={property.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Tenant Name */}
        <div className="mb-4">
          <label htmlFor="tenant_name" className="mb-2 block text-sm font-medium">
            Nombre de Inquilino
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="tenant_name"
                name="tenant_name"
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
          <label htmlFor="rental_period_start" className="mb-2 block text-sm font-medium">
            Periodo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="rental_period_start"
                name="rental_period_start"
                type="date"
                placeholder="Periodo de recibo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="rental_period_end"
                name="rental_period_end"
                type="date"
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
            <label htmlFor="property_address" className="mb-2 block text-sm font-medium">
                Ubicación
            </label>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="property_address"
                        name="property_address"
                        type="string"
                        placeholder="Calle"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                        defaultValue={`${property.street_name} ${property.street_number} - ${property.floor_number} ${property.apartment_number}`}
                    />
                    <Bars2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>

        {/* Rent */}
        <div className="mb-4">
          <label htmlFor="rent_amount" className="mb-2 block text-sm font-medium">
            Alquiler
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="rent_amount"
                        name="rent_amount"
                        type="string"
                        placeholder="Monto de alquiler"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                        defaultValue={property.monthly_rent}
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div className="relative lg:col-span-1">
                    <Toggle labelOff="" labelOn="" initialState={false} inputName="rent_paid" />
                </div>
            </div>
        </div>

        {/* DGR */}
        <div className="mb-4">
          <label htmlFor="dgr_amount" className="mb-2 block text-sm font-medium">
            Direccion General de Rentas
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="dgr_amount"
                        name="dgr_amount"
                        type="string"
                        placeholder="Monto DGR"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div className="relative lg:col-span-1">
                    <Toggle labelOff="Debe" labelOn="Pagado" initialState={false} inputName="dgr_paid" />
                </div>
            </div>
        </div>

        {/* Water */}
        <div className="mb-4">
          <label htmlFor="water_amount" className="mb-2 block text-sm font-medium">
            Aguas
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="water_amount"
                        name="water_amount"
                        type="string"
                        placeholder="Monto de Aguas"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div className="relative lg:col-span-1">
                    <Toggle labelOff="Debe" labelOn="Pagado" initialState={false} inputName="water_paid" />
                </div>
            </div>
        </div>

        {/* EPEC */}
        <div className="mb-4">
          <label htmlFor="epec_amount" className="mb-2 block text-sm font-medium">
            Electricidad
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="epec_amount"
                        name="epec_amount"
                        type="string"
                        placeholder="Monto de electricidad"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <LightBulbIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div className="relative lg:col-span-1">
                    <Toggle labelOff="Debe" labelOn="Pagado" initialState={false} inputName="epec_paid" />
                </div>
            </div>
        </div>

        {/* Municipal */}
        <div className="mb-4">
          <label htmlFor="municipal_amount" className="mb-2 block text-sm font-medium">
            Municipalidad
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="municipal_amount"
                        name="municipal_amount"
                        type="string"
                        placeholder="Monto de municipalidad"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div className="relative lg:col-span-1">
                    <Toggle labelOff="Debe" labelOn="Pagado" initialState={false} inputName="municipal_paid" />
                </div>
            </div>
        </div>

        {/* Expenses */}
      <div className="mb-4">
          <label htmlFor="expenses_amount" className="mb-2 block text-sm font-medium">
            Expensas
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="expenses_amount"
                        name="expenses_amount"
                        type="string"
                        placeholder="Monto de expensas"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div className="relative lg:col-span-1">
                    <Toggle labelOff="Debe" labelOn="Pagado" initialState={false} inputName="expenses_paid" />
                </div>
            </div>
        </div>

        {/* Rentas */}
        <div className="mb-4">
          <label htmlFor="rentas_amount" className="mb-2 block text-sm font-medium">
            Rentas
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="rentas_amount"
                        name="rentas_amount"
                        type="string"
                        placeholder="Monto de rentas"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div className="relative lg:col-span-1">
                    <Toggle labelOff="Debe" labelOn="Pagado" initialState={false} inputName="rentas_paid" />
                </div>
            </div>
        </div>

        {/* Various */}
        <div className="mb-4">
          <label htmlFor="various_amount" className="mb-2 block text-sm font-medium">
            Varios
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="various_amount"
                        name="various_amount"
                        type="string"
                        placeholder="Monto de varios"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div className="relative lg:col-span-1">
                    <Toggle labelOff="Debe" labelOn="Pagado" initialState={false} inputName="various_paid" />
                </div>
            </div>
        </div>

        {/* Previous balance */}
        <div className="mb-4">
          <label htmlFor="previous_balance" className="mb-2 block text-sm font-medium">
            Balance previo
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="previous_balance"
                        name="previous_balance"
                        type="string"
                        placeholder="Monto de alquiler"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div className="relative lg:col-span-1">
                    <Toggle labelOff="Debe" labelOn="Pagado" initialState={false} inputName="previous_balance_paid" />
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
