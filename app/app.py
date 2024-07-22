from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Store invoices in memory (for simplicity)
invoices = []

@app.route('/api/invoices', methods=['POST'])
def add_invoice():
    data = request.json
    invoices.append(data)
    return jsonify(data), 201

@app.route('/api/invoices/<int:invoice_id>', methods=['GET'])
def get_invoice(invoice_id):
    if invoice_id < len(invoices):
        return jsonify(invoices[invoice_id])
    return jsonify({'error': 'Invoice not found'}), 404

@app.route('/api/invoices/<int:invoice_id>/total', methods=['GET'])
def calculate_total(invoice_id):
    if invoice_id < len(invoices):
        invoice = invoices[invoice_id]
        total = sum(item['amount'] for item in invoice['items'])
        return jsonify({'total': total})
    return jsonify({'error': 'Invoice not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
