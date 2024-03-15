from flask import Blueprint, jsonify,request
from src.models import User, Vegetable, db, UserVegetable
user_routes = Blueprint('users', __name__)


@user_routes.route('/<int:user_id>/vegetables', methods=['GET'])
def get_all_vegetables_by_user1(user_id):

    user = User.query.get(1)
    user_vegetables = UserVegetable.query.filter_by(user_id=user.id).all()

    if user_vegetables:
      return {'user_vegetables': [user_vegetable.to_dict() for user_vegetable in user_vegetables]}



@user_routes.route('/1/vegetables/<int:vegetable_id>', methods=['POST'])
def recommand_new_vegetable(vegetable_id):
    """
    save the vegetable and user to join table
    """
    current_user_id = 1
    vegetable = Vegetable.query.get(vegetable_id)
    if vegetable:
      new_user_vegetable = UserVegetable(user_id=current_user_id, vegetable_id=vegetable_id)
      db.session.add(new_user_vegetable)
      db.session.commit()
      return {'message': [f'succefully saved vegetable {vegetable.to_dict()["name"]} in join table']}, 200
