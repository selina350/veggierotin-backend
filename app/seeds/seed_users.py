from app.models import db, User, Vegetable,environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io',
        username='Demo',
        password='password')
    marnie = User(
        email='marnie@aa.io',
        username='marnie',
        password='password')
    bobbie = User(
        email='bobbie@aa.io',
        username='bobbie',
        password='password')
    # greenPepper = Vegetable.query.filter(Vegetable.name == "green pepper").first()
    # spinach = Vegetable.query.filter(Vegetable.name == "spinach").first()
    # lettuce = Vegetable.query.filter(Vegetable.name == "lettuce").first()
    # demo.vegetables.append(greenPepper)
    # demo.vegetables.append(spinach)
    # marnie.vegetables.append(lettuce)
    # marnie.vegetables.append(spinach)
    # bobbie.vegetables.append(greenPepper)
    # bobbie.vegetables.append(lettuce)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM user_vegetable"))

    db.session.commit()
