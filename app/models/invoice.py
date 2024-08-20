from .db import db
from .invoicelineitem import InvoiceLineItem

class Invoice(db.Model):
    __tablename__ = 'invoices'

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    company_address = db.Column(db.String(255), nullable=False)
    company_phone = db.Column(db.String(20), nullable=False)
    bill_to_name = db.Column(db.String(255), nullable=False)
    bill_to_address = db.Column(db.String(255), nullable=False)
    invoice_number = db.Column(db.String(50), nullable=False)
    invoice_date = db.Column(db.Date, nullable=False)
    terms = db.Column(db.String(255), nullable=False)
    subtotal = db.Column(db.Float, nullable=False)
    tax = db.Column(db.Float, nullable=False, default=0.0)
    total = db.Column(db.Float, nullable=False)
    contact_name = db.Column(db.String(255), nullable=False)
    contact_phone = db.Column(db.String(20), nullable=False)
    
    # Relationship to InvoiceLineItem (one-to-many) with cascade
    line_items = db.relationship('InvoiceLineItem', backref='invoice', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'company_name': self.company_name,
            'company_address': self.company_address,
            'company_phone': self.company_phone,
            'bill_to_name': self.bill_to_name,
            'bill_to_address': self.bill_to_address,
            'invoice_number': self.invoice_number,
            'invoice_date': self.invoice_date.isoformat(),
            'terms': self.terms,
            'subtotal': self.subtotal,
            'tax': self.tax,
            'total': self.total,
            'contact_name': self.contact_name,
            'contact_phone': self.contact_phone,
            'line_items': [item.to_dict() for item in self.line_items]
        }
