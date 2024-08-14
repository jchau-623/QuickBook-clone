import os
from flask import Flask, render_template, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.invoice_routes import invoice_bp
from .seeds import seed_commands
from .config import Config

# Initialize Flask app
app = Flask(__name__)

# Load configuration
app.config.from_object(Config)

# Initialize JWT Manager
jwt = JWTManager(app)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

# Register CLI commands
app.cli.add_command(seed_commands)

# Register blueprints
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(invoice_bp, url_prefix='/api/invoices')

# HTTPS redirect in production
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            return redirect(url, code=301)

# Catch-all route for React frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

# Ensure app is available for migrations and other commands
if __name__ == "__main__":
    app.run()
