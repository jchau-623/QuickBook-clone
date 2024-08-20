from .db import db

class InvoiceLineItem(db.Model):
    __tablename__ = 'invoice_line_items'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    unit_price = db.Column(db.Float, nullable=True)
    amount = db.Column(db.Float, nullable=False)
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoices.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'unit_price': self.unit_price,
            'amount': self.amount
        }
