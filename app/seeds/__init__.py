from flask.cli import AppGroup
from .users import seed_users, undo_users
from .invoices import seed_invoices, undo_invoices
from app.models import db

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    try:
        # Start a transaction (without subtransactions)
        db.session.begin()
        
        # Seed data in the right order
        seed_users()
        seed_invoices()
        # Add other seed functions here

        # Commit the transaction
        db.session.commit()

    except Exception as e:
        # Rollback in case of error
        db.session.rollback()
        print(f"Error seeding data: {e}")


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    try:
        # Start a transaction (without subtransactions)
        db.session.begin()

        # Undo data in reverse order
        undo_invoices()
        undo_users()
        # Add other undo functions here

        # Commit the transaction
        db.session.commit()

    except Exception as e:
        # Rollback in case of error
        db.session.rollback()
        print(f"Error undoing seed data: {e}")
