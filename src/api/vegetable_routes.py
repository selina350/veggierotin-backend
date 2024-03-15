from flask import Blueprint, request, jsonify
from src.models import Vegetable, User, db,UserVegetable
from .user_routes import get_all_vegetables_by_user1
from sqlalchemy import desc


vegetable_routes = Blueprint('vegetables', __name__)

@vegetable_routes.route("")
def get_all_vegetables():

    vegetables = db.session.query(Vegetable).all()
    return {'vegetables': [vegetable.to_dict() for vegetable in vegetables]}

@vegetable_routes.route("/random")
def get_random_three_vegetables():

    current_user_id = 1
    n = Vegetable.query.count()
    subquery = db.session.query(UserVegetable.vegetable_id).filter(UserVegetable.user_id == current_user_id).order_by(desc(UserVegetable.createdAt)).limit(n-3)
    print("subquery",subquery)
    unused_vegetables = Vegetable.query.filter(~Vegetable.id.in_(subquery)).limit(3)

    return {'vegetables': [vegetable.to_dict() for vegetable in unused_vegetables]}
