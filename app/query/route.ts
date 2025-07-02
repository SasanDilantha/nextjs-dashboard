// app/query/route.ts

import { NextResponse } from 'next/server';
import postgres from 'postgres';

// Initialize the connection with SSL
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Define the GET handler
export async function GET() {
  try {
    const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}
