from app.models import db, User

def seed_users():
    existing_user = User.query.filter_by(email='johnchau666@netscape.net').first()
    if not existing_user:
        user = User(
            email='johnchau666@netscape.net',
            password='password'
        )
        db.session.add(user)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
