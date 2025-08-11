from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(15), unique=True, nullable=False)
    name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    county = db.Column(db.String(50))
    town = db.Column(db.String(50))

    details = db.relationship('UserDetails', backref='user', uselist=False)
    description = db.relationship('UserDescription', backref='user', uselist=False)
    matches_sent = db.relationship('MatchRequest', foreign_keys='MatchRequest.requester_id', backref='requester', lazy=True)
    matches_received = db.relationship('MatchResult', foreign_keys='MatchResult.receiver_id', backref='receiver', lazy=True)

class UserDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    education = db.Column(db.String(100))
    profession = db.Column(db.String(100))
    marital_status = db.Column(db.String(20))
    religion = db.Column(db.String(50))
    ethnicity = db.Column(db.String(50))

class UserDescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    description = db.Column(db.Text)

class MatchRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    age_range = db.Column(db.String(20))
    town = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class MatchResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    match_info = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class Interest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    from_user = db.Column(db.String(15)) 
    to_user = db.Column(db.String(15))    
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
