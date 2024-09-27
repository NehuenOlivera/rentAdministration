import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  FrequencyField,
  PropertiesTable,
  PropertyForm,
  ReceiptForm,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchPropertyById(id: string) {
  try {
    const data = await sql<PropertyForm>`
      SELECT *
      FROM properties
      WHERE properties.id = ${id};
    `;

    const property = data.rows.map((property) => ({
      ...property,
      // Convert rent amount from cents to dollars
      monthly_rent: property.monthly_rent / 100,
    }));

    return property[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch property.');
  }
}

const PROPERTIES_PER_PAGE = 10;
export async function fetchFilteredProperties(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * PROPERTIES_PER_PAGE;

  try {
    const properties = await sql<PropertiesTable>`
      SELECT *
      FROM properties
      WHERE
        name::text ILIKE ${`%${query}%`} OR
        tenant_name::text ILIKE ${`%${query}%`}
      ORDER BY name ASC
      LIMIT ${PROPERTIES_PER_PAGE} OFFSET ${offset}
    `;

    return properties.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch properties.');
  }
}

export async function fetchPropertiesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM properties
    WHERE
      name::text ILIKE ${`%${query}%`} OR
      street_name::text ILIKE ${`%${query}%`} OR
      municipal_code::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / PROPERTIES_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of properties.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchAdjustmentFrequencies() {
  try {
    const data = await sql<FrequencyField>`
      SELECT
        id,
        name
      FROM adjustmentfrequencies
    `;

    const frequencies = data.rows;
    return frequencies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all frequencies.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchReceiptsFromProperty(
  propertyId: string
) {
  try {
    const receipts = await sql`
      SELECT
      rentreceipts.id,
      rentreceipts.property_id,
      rentreceipts.tenant_name,
      rentreceipts.rental_period_start,
      rentreceipts.rental_period_end,
      rentreceipts.property_address,
      rentreceipts.rent_amount,
      rentreceipts.rent_paid,
      rentreceipts.dgr_amount,
      rentreceipts.dgr_paid,
      rentreceipts.water_amount,
      rentreceipts.water_paid,
      rentreceipts.epec_amount,
      rentreceipts.epec_paid,
      rentreceipts.municipal_amount,
      rentreceipts.municipal_paid,
      rentreceipts.expenses_amount,
      rentreceipts.expenses_paid,
      rentreceipts.various_amount,
      rentreceipts.various_paid,
      rentreceipts.previous_balance,
      rentreceipts.previous_balance_paid,
      rentreceipts.total_amount,
      CASE 
        WHEN rentreceipts.rent_paid AND rentreceipts.dgr_paid AND rentreceipts.water_paid AND rentreceipts.epec_paid AND 
            rentreceipts.municipal_paid AND rentreceipts.expenses_paid AND 
            rentreceipts.various_paid AND rentreceipts.previous_balance_paid 
        THEN TRUE
        ELSE FALSE
      END AS isAllPaid
      FROM properties
      JOIN rentreceipts ON properties.id = rentreceipts.property_id
      WHERE rentreceipts.property_id = ${propertyId}
      ORDER BY rentreceipts.rental_period_start DESC      
    `;

    return receipts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch receipts from property.');
  }
}

export async function fetchReceiptById(id: string) {
  try {
    const data = await sql<ReceiptForm>`
      SELECT *
      FROM rentreceipts
      WHERE rentreceipts.id = ${id};
    `;

    const receipt = data.rows.map((receipt) => ({
      ...receipt,
      // Convert rent amount from cents to dollars
      rent_amount: receipt.rent_amount / 100,
      dgr_amount: receipt.dgr_amount / 100,
      water_amount: receipt.water_amount / 100,
      epec_amount: receipt.epec_amount / 100,
      municipal_amount: receipt.municipal_amount / 100,
      expenses_amount: receipt.expenses_amount / 100,
      various_amount: receipt.various_amount / 100,
      previous_balance: receipt.previous_balance / 100,
      total_amount: receipt.total_amount / 100,
    }));

    return receipt[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch property.');
  }
}
