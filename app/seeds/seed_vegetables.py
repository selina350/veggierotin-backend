from app.models import db, Vegetable, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_vegetables():
    greenPepper = Vegetable(
        name='green pepper',
        url='https://i5.walmartimages.com/seo/Fresh-Green-Bell-Pepper-Each_15c8fcf1-7b73-429e-8a7c-802091d818f1.4730164455d5cc0a04d2b1f675971dd1.jpeg')
    spinach = Vegetable(
        name='spinach',
        url='https://assets.wfcdn.com/im/09663992/resize-h445%5Ecompr-r85/2410/241082391/Spinach+Leaves+On+Canvas+by+Marta+Ortiz+Print.jpg')
    greenBean = Vegetable(
        name='green bean',
        url='https://m.media-amazon.com/images/I/811isaKVZDL.__AC_SY300_SX300_QL70_FMwebp_.jpg')
    lettuce = Vegetable(
        name='lettuce',
        url='https://www.eatingwell.com/thmb/C3hOp6IbZKlMD1_CFEpBcezigqs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Is-It-Safe-to-Eat-Romaine-Lettuce-d78b20b0c9444d61b9d4adda8a432aba.jpg')
    kale = Vegetable(
        name='kale',
        url='https://www.livingseedcompany.com/cdn/shop/products/organic-lacinato-kale-brassica-oleracea-340630_1024x1024@2x.jpg')
    carrot = Vegetable(
        name='carrot',
        url='https://m.media-amazon.com/images/I/71UcnaFmd5L.__AC_SX300_SY300_QL70_FMwebp_.jpg')
    popato = Vegetable(
        name='potato',
        url='https://www.alimentarium.org/sites/default/files/media/image/2017-02/AL027-01_pomme_de_terre_0_0.jpg')
    pumpkin = Vegetable(
        name='pumpkin',
        url='https://m.media-amazon.com/images/I/61D-z8YRH3L.__AC_SX300_SY300_QL70_FMwebp_.jpg')
    yam = Vegetable(
        name='yam',
        url='https://www.grocery.com/store/image/cache/catalog/cyber-sweetz/sweet-potatoes-8-lb-sweet-potatoes-3-lb-B07QQN7S35-600x600.jpg')
    tomato = Vegetable(
        name='tomato',
        url='https://growhoss.com/cdn/shop/products/jolene-tomato.jpg')

    db.session.add(greenPepper)
    db.session.add(spinach)
    db.session.add(greenBean)
    db.session.add(lettuce)
    db.session.add(kale)
    db.session.add(carrot)
    db.session.add(popato)
    db.session.add(pumpkin)
    db.session.add(yam)
    db.session.add(tomato)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_vegetables():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM vegetables"))

    db.session.commit()
