// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type PropertiesTable = {
  id: string;
  name: string;
  street_name: string;
  street_number: string;
  floor_number: string;
  apartment_number: string;
  city: string;
  dgr_code: string;
  municipal_code: string;
  epec_client_number: string;
  epec_contract_number: string;
  water_contract_number: string;
  landlord_name: string;
  tenant_name: string;
  tenant_cuit_cuil: string;
  contact_person_name: string;
  contact_person_phone: string;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  adjustment_frequency_id: number;
  comments: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type FrequencyField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type PropertyForm = {
  id: string;
  name: string;
  street_name: string;
  street_number: string;
  floor_number: string;
  apartment_number: string;
  city: string;
  dgr_code: string;
  municipal_code: string;
  epec_client_number: string;
  epec_contract_number: string;
  water_contract_number: string;
  landlord_name: string;
  tenant_name: string;
  tenant_cuit_cuil: string;
  contact_person_name: string;
  contact_person_phone: string;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  adjustment_frequency_id: number;
  comments: string;
};
