from app.models import db, Invoice, InvoiceLineItem
from datetime import datetime

# Seed function to add invoices
def seed_invoices():
    # Create an example invoice without subtotal, tax, and total initially
    invoice = Invoice(
        company_name="Shy, LLC",
        company_address="8 Laurel Lane, Old Westbury, NY 11568",
        company_phone="516-739-4688",
        bill_to_name="Mikiya By Chubby Flushing LLC",
        bill_to_address="135-41 37th Avenue, 2nd Floor Rear, Flushing, NY 11354",
        invoice_number="0502",
        invoice_date=datetime.strptime('2024-07-01', '%Y-%m-%d'),
        terms="Due On or Before the 10th of the following month",
        contact_name="John Chau",
        contact_phone="917-578-9029"
    )

    # Adding line items based on the invoice
    line_items = [
        InvoiceLineItem(description="Base rent 7/1/24-7/31/24", unit_price=40536.64, amount=40536.64),
        InvoiceLineItem(description="Maintenance fees 5/1/24-5/31/24", unit_price=2577.14, amount=2577.14),
        InvoiceLineItem(description="Garbage", unit_price=2289.02, amount=2289.02),
        InvoiceLineItem(description="Water & Sewage", unit_price=254.36, amount=254.36),
        InvoiceLineItem(description="Insurance", unit_price=4555.58, amount=4555.58),
        InvoiceLineItem(description="Elevator", unit_price=288.79, amount=288.79),
        InvoiceLineItem(description="Electricity (common area electricity from Feb to May 2024)", unit_price=150.00, amount=150.00),
        InvoiceLineItem(description="Telephone", unit_price=108.88, amount=108.88),
        InvoiceLineItem(description="Sprinkler Maintenance", unit_price=92.54, amount=92.54),
        InvoiceLineItem(description="Fire Alarm Maintenance", unit_price=7739.17, amount=7739.17),
        InvoiceLineItem(description="Fire Alarm Monitoring", unit_price=2577.14, amount=2577.14)
    ]

    # Add line items to the invoice
    invoice.line_items.extend(line_items)

    # Calculate subtotal
    subtotal = sum(item.amount for item in line_items)

    # Set tax (assuming tax is 0% in this case, modify if you have a tax rate)
    tax = 0.0

    # Calculate total
    total = subtotal + tax

    # Update invoice with calculated values
    invoice.subtotal = subtotal
    invoice.tax = tax
    invoice.total = total

    # Add the invoice to the session and commit
    db.session.add(invoice)
    db.session.commit()

# Function to undo the seeding
def undo_invoices():
    db.session.execute('TRUNCATE invoices RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE invoice_line_items RESTART IDENTITY CASCADE;')
    db.session.commit()
