from flask import Blueprint, request, jsonify, abort
from app.models.invoice import Invoice
from app.models.invoicelineitem import InvoiceLineItem
from app.models.db import db
from app.forms import InvoiceForm 

invoice_bp = Blueprint('invoices', __name__)

# Route to create a new invoice
@invoice_bp.route('/', methods=['POST'])
def create_invoice():
    form = InvoiceForm()

    if not form.validate_on_submit():
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
    invoice = Invoice.query.get_or_404(invoice_id)
    form = InvoiceForm()

    if not form.validate_on_submit():
        return jsonify(form.errors), 400

    # Update the invoice details
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

    # Update line items
    InvoiceLineItem.query.filter_by(invoice_id=invoice.id).delete()
    for item in form.line_items.data:
        line_item = InvoiceLineItem(
            description=item['description'],
            unit_price=item['unit_price'],
            amount=item['amount'],
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
