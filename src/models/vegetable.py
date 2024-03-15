from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Vegetable(db.Model):
    __tablename__ = 'vegetables'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(), nullable=False)

    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    userVegetable = db.relationship("UserVegetable", back_populates="vegetable")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url
        }
