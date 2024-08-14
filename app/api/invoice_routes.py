from flask import Blueprint, request, jsonify, abort
from app.models.invoice import Invoice
from app.models.invoicelineitem import InvoiceLineItem
from app.models.db import db
from datetime import datetime

invoice_bp = Blueprint('invoices', __name__)

# Route to create a new invoice
@invoice_bp.route('/', methods=['POST'])
def create_invoice():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Create the invoice
    invoice = Invoice(
        company_name=data.get('company_name'),
        company_address=data.get('company_address'),
        company_phone=data.get('company_phone'),
        bill_to_name=data.get('bill_to_name'),
        bill_to_address=data.get('bill_to_address'),
        invoice_number=data.get('invoice_number'),
        invoice_date=datetime.strptime(data.get('invoice_date'), '%Y-%m-%d'),
        terms=data.get('terms'),
        subtotal=data.get('subtotal'),
        tax=data.get('tax', 0.0),
        total=data.get('total'),
        contact_name=data.get('contact_name'),
        contact_phone=data.get('contact_phone')
    )

    # Add line items
    for item in data.get('line_items', []):
        line_item = InvoiceLineItem(
            description=item.get('description'),
            unit_price=item.get('unit_price'),
            amount=item.get('amount'),
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
    invoice = Invoice.query.get_or_404(invoice_id)
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Update the invoice details
    invoice.company_name = data.get('company_name', invoice.company_name)
    invoice.company_address = data.get('company_address', invoice.company_address)
    invoice.company_phone = data.get('company_phone', invoice.company_phone)
    invoice.bill_to_name = data.get('bill_to_name', invoice.bill_to_name)
    invoice.bill_to_address = data.get('bill_to_address', invoice.bill_to_address)
    invoice.invoice_number = data.get('invoice_number', invoice.invoice_number)
    invoice.invoice_date = datetime.strptime(data.get('invoice_date'), '%Y-%m-%d')
    invoice.terms = data.get('terms', invoice.terms)
    invoice.subtotal = data.get('subtotal', invoice.subtotal)
    invoice.tax = data.get('tax', invoice.tax)
    invoice.total = data.get('total', invoice.total)
    invoice.contact_name = data.get('contact_name', invoice.contact_name)
    invoice.contact_phone = data.get('contact_phone', invoice.contact_phone)

    # Update line items
    if 'line_items' in data:
        InvoiceLineItem.query.filter_by(invoice_id=invoice.id).delete()
        for item in data['line_items']:
            line_item = InvoiceLineItem(
                description=item.get('description'),
                unit_price=item.get('unit_price'),
                amount=item.get('amount'),
                invoice=invoice
            )
            db.session.add(line_item)

    db.session.commit()

    return jsonify(invoice.to_dict()), 200

# Route to delete an invoice
@invoice_bp.route('/<int:invoice_id>', methods=['DELETE'])
def delete_invoice(invoice_id):
    invoice = Invoice.query.get_or_404(invoice_id)
    db.session.delete(invoice)
    db.session.commit()
    return jsonify({"message": "Invoice deleted successfully"}), 200
