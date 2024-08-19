from flask_wtf import FlaskForm
from flask import request
from wtforms import StringField, FloatField, DateField, FieldList, FormField
from wtforms.validators import DataRequired, ValidationError
from app.models import Invoice

# Custom Validators
def invoice_number_exists(form, field):
    # Check if invoice number already exists
    invoice_number = field.data
    invoice_id = request.view_args.get('invoice_id')

    # If we're updating an invoice, check if the existing invoice number belongs to the current invoice
    existing_invoice = Invoice.query.filter(Invoice.invoice_number == invoice_number).first()
    
    if existing_invoice and (invoice_id is None or existing_invoice.id != int(invoice_id)):
        raise ValidationError('Invoice number already exists.')

class LineItemForm(FlaskForm):
    description = StringField('Description', validators=[DataRequired(message="Description is required.")])
    unit_price = FloatField('Unit Price', validators=[DataRequired(message="Unit Price is required.")])
    amount = FloatField('Amount', validators=[DataRequired(message="Amount is required.")])

    class Meta:
        csrf = False

class InvoiceForm(FlaskForm):
    company_name = StringField('Company Name', validators=[DataRequired()])
    company_address = StringField('Company Address', validators=[DataRequired()])
    company_phone = StringField('Company Phone', validators=[DataRequired()])
    bill_to_name = StringField('Bill To Name', validators=[DataRequired()])
    bill_to_address = StringField('Bill To Address', validators=[DataRequired()])
    invoice_number = StringField('Invoice Number', validators=[DataRequired(), invoice_number_exists])
    invoice_date = DateField('Invoice Date', format='%Y-%m-%d', validators=[DataRequired()])
    terms = StringField('Terms', validators=[DataRequired()])
    subtotal = FloatField('Subtotal', validators=[DataRequired()])
    tax = FloatField('Tax', validators=[DataRequired()])
    total = FloatField('Total', validators=[DataRequired()])
    contact_name = StringField('Contact Name', validators=[DataRequired()])
    contact_phone = StringField('Contact Phone', validators=[DataRequired()])
    line_items = FieldList(FormField(LineItemForm), min_entries=1, validators=[DataRequired()])

    class Meta:
        csrf = False