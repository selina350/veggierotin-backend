from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime



class UserVegetable(db.Model, UserMixin):
    __tablename__ = 'userVegetables'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('users.id')))
    vegetable_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('vegetables.id')))

    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="userVegetable")

    vegetable = db.relationship("Vegetable", back_populates="userVegetable")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'vegetable_id': self.vegetable_id,
            'user': self.user.to_dict(),
            'vegetable': self.vegetable.to_dict(),
            'createdAt':self.createdAt

        }
