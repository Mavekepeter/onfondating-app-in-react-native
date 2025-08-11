from flask import Blueprint, request, jsonify
from models import db, User, UserDetails, UserDescription, MatchRequest, MatchResult, Interest
from datetime import datetime

routes = Blueprint('routes', __name__)

@routes.route('/register', methods=['POST'])
def register():
    data = request.json
    existing = User.query.filter_by(phone_number=data['phone']).first()
    if existing:
        return jsonify({'message': 'User already exists'}), 400
    user = User(
        phone_number=data['phone'],
        name=data['name'],
        age=data['age'],
        gender=data['gender'],
        county=data['county'],
        town=data['town']
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Registered successfully!! welcome at onfon ✨✨🎉🎉🎉🎉✨✨'})

@routes.route('/details', methods=['POST'])
def add_details():
    data = request.json
    user = User.query.filter_by(phone_number=data['phone']).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    details = UserDetails(
        user_id=user.id,
        education=data['education'],
        profession=data['profession'],
        marital_status=data['marital_status'],
        religion=data['religion'],
        ethnicity=data['ethnicity']
    )
    db.session.add(details)
    db.session.commit()
    return jsonify({'message': 'you details have being added, Thank you for choosing onfon media😊😊😊'})

@routes.route('/description', methods=['POST'])
def add_description():
    data = request.json
    user = User.query.filter_by(phone_number=data['phone']).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    description = UserDescription(
        user_id=user.id,
        description=data['description']
    )
    db.session.add(description)
    db.session.commit()
    return jsonify({'message': 'You are wonderfull congrates🌹🌹🌹🌹 desc added'})


@routes.route('/match', methods=['POST'])
def match_request():
    data = request.json
    user = User.query.filter_by(phone_number=data['phone']).first()
    if not user:
        return jsonify({'message': 'User not found '}), 404
    match = MatchRequest(
        requester_id=user.id,
        age_range=data['age_range'],
        town=data['town']
    )
    db.session.add(match)
    db.session.commit()
    
    matches = User.query.filter(User.town.ilike(f"%{data['town']}%")).filter(User.id != user.id).limit(3).all()
    result = []
    for m in matches:
        result.append({
            'name': m.name,
            'age': m.age,
            'phone': m.phone_number
        })
    return jsonify({'matches': result})

@routes.route('/more-details/<phone>', methods=['GET'])
def get_more_details(phone):
    user = User.query.filter_by(phone_number=phone).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    details = user.details
    response = {
        'name': user.name,
        'age': user.age,
        'county': user.county,
        'town': user.town,
        'education': details.education if details else '',
        'profession': details.profession if details else '',
        'marital_status': details.marital_status if details else '',
        'religion': details.religion if details else '',
        'ethnicity': details.ethnicity if details else ''
    }
    return jsonify(response)

@routes.route('/describe/<phone>', methods=['GET'])
def describe_user(phone):
    user = User.query.filter_by(phone_number=phone).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    if not user.description:
        return jsonify({'description': 'Not provided yet'})
    return jsonify({'description': user.description.description})

@routes.route('/interest', methods=['POST'])
def express_interest():
    data = request.json
    print("Received data:", data)

    if not data or 'phone' not in data or 'interests' not in data:
        return jsonify({'error': 'Missing phone or interests'}), 400

    interest = Interest(
        from_user=data['phone'],
        to_user=data['interests'].strip()  
    )
    db.session.add(interest)
    db.session.commit()
    return jsonify({'message': 'Interest send hold on we will reach to you in a few😉🤞🤞✌'})
