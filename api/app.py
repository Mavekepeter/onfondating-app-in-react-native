from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db
from route import routes

app = Flask(__name__)
CORS(app, origins=["http://localhost:8081"], supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/dating_app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(routes)

if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True, port=5001,host='0.0.0.0')
