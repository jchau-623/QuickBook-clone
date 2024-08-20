from flask import Blueprint, request, jsonify, abort
from app.models.invoice import Invoice
from app.models.invoicelineitem import InvoiceLineItem
from app.models.db import db
from app.forms import InvoiceForm

invoice_bp = Blueprint('invoices', __name__)

@invoice_bp.route('/', methods=['POST'])
def create_invoice():
    print("Received data:", request.json)  # Log the incoming data to inspect

    form = InvoiceForm(meta={'csrf': False})  # Ensure CSRF is disabled if not used

    form.process(data=request.json)  # Manually process the request data

    if not form.validate():
        print("Form validation errors:", form.errors)  # Log form validation errors
        return jsonify(form.errors), 400

    # Create the invoice
    invoice = Invoice(
        company_name=form.company_name.data,
        company_address=form.company_address.data,
        company_phone=form.company_phone.data,
        bill_to_name=form.bill_to_name.data,
        bill_to_address=form.bill_to_address.data,
        invoice_number=form.invoice_number.data,
        invoice_date=form.invoice_date.data,
        terms=form.terms.data,
        subtotal=form.subtotal.data,
        tax=form.tax.data,
        total=form.total.data,
        contact_name=form.contact_name.data,
        contact_phone=form.contact_phone.data
    )

    # Add line items
    for item in form.line_items.data:
        line_item = InvoiceLineItem(
            description=item['description'],
            unit_price=item['unit_price'],
            amount=item['amount'],
            invoice=invoice
        )
        db.session.add(line_item)

    db.session.add(invoice)
    db.session.commit()

    return jsonify(invoice.to_dict()), 201


# Route to get all invoices
@invoice_bp.route('/', methods=['GET'])
def get_invoices():
    invoices = Invoice.query.all()
    return jsonify([invoice.to_dict() for invoice in invoices]), 200


# Route to get a specific invoice by ID
@invoice_bp.route('/<int:invoice_id>', methods=['GET'])
def get_invoice(invoice_id):
    invoice = Invoice.query.get_or_404(invoice_id)
    return jsonify(invoice.to_dict()), 200


# Route to update an existing invoice
@invoice_bp.route('/<int:invoice_id>', methods=['PUT'])
def update_invoice(invoice_id):
    # Log the incoming request data to debug what is being sent
    print("Received data:", request.json)

    invoice = Invoice.query.get_or_404(invoice_id)
    form = InvoiceForm(meta={'csrf': False})

    # Manually populate the form with data from request.json to bypass validation issues
    form.process(data=request.json)

    # If the form does not validate, log and return errors
    if not form.validate():
        print("Form validation errors:", form.errors)
        return jsonify(form.errors), 400

    # Update the invoice details if the form validation passed
    invoice.company_name = form.company_name.data
    invoice.company_address = form.company_address.data
    invoice.company_phone = form.company_phone.data
    invoice.bill_to_name = form.bill_to_name.data
    invoice.bill_to_address = form.bill_to_address.data
    invoice.invoice_number = form.invoice_number.data
    invoice.invoice_date = form.invoice_date.data
    invoice.terms = form.terms.data
    invoice.subtotal = form.subtotal.data
    invoice.tax = form.tax.data
    invoice.total = form.total.data
    invoice.contact_name = form.contact_name.data
    invoice.contact_phone = form.contact_phone.data

    # Delete old line items and add the new ones
    InvoiceLineItem.query.filter_by(invoice_id=invoice.id).delete()
    for item in form.line_items.data:
        line_item = InvoiceLineItem(
            description=item['description'],
            unit_price=item['unit_price'],
            amount=item['amount'],
            invoice=invoice
        )
        db.session.add(line_item)

    # Commit the changes to the database
    db.session.commit()

    # Return the updated invoice as JSON
    return jsonify(invoice.to_dict()), 200


# Route to delete an invoice
@invoice_bp.route('/<int:invoice_id>', methods=['DELETE'])
def delete_invoice(invoice_id):
    invoice = Invoice.query.get_or_404(invoice_id)
    db.session.delete(invoice)
    db.session.commit()
    return jsonify({"message": "Invoice deleted successfully"}), 200
