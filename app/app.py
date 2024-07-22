from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///invoices.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client = db.Column(db.String(100), nullable=False)
    month = db.Column(db.String(20), nullable=False)
    items = db.Column(db.JSON, nullable=False)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/api/invoices', methods=['POST'])
def add_invoice():
    data = request.json
    new_invoice = Invoice(client=data['client'], month=data['month'], items=data['items'])
    db.session.add(new_invoice)
    db.session.commit()
    return jsonify(new_invoice.id), 201

@app.route('/api/invoices', methods=['GET'])
def get_invoices():
    invoices = Invoice.query.all()
    return jsonify([{'id': inv.id, 'client': inv.client, 'month': inv.month, 'items': inv.items} for inv in invoices])

@app.route('/api/invoices/<int:invoice_id>', methods=['GET'])
def get_invoice(invoice_id):
    invoice = Invoice.query.get(invoice_id)
    if not invoice:
        return jsonify({'error': 'Invoice not found'}), 404
    return jsonify({'id': invoice.id, 'client': invoice.client, 'month': invoice.month, 'items': invoice.items})

@app.route('/api/invoices/<int:invoice_id>', methods=['DELETE'])
def delete_invoice(invoice_id):
    invoice = Invoice.query.get(invoice_id)
    if not invoice:
        return jsonify({'error': 'Invoice not found'}), 404
    db.session.delete(invoice)
    db.session.commit()
    return jsonify({'message': 'Invoice deleted'})

if __name__ == '__main__':
    app.run(debug=True)
