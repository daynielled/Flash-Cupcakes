"""Flask app for Cupcakes"""
from flask import Flask, jsonify, request, render_template

from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///cupcakes"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secretbestie'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)


@app.route('/')
def root():
    """Home page"""
    return render_template("index.html")

@app.route('/api/cupcakes')
def get_all_cupcakes():
    """Get data about all cupcakes"""
    cupcakes = [cupcake.to_dict() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)


    # cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    # return jsonify(cupcakes)


@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():

    data = request.json

    cupcake = Cupcake(**data)
    cupcake.image = data.get('image', 'https://tinyurl.com/demo-cupcake')

    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake=cupcake.serialize()), 201
   

@app.route('/api/cupcakes/<int:id>')
def get_single_cupcake(id):
    """Get data about a single cupcake"""    
    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:id>', methods=['PATCH'])
def update_cupcake(id):
    """Update information about a single cupcake"""    
    cupcake = Cupcake.query.get_or_404(id)
    cupcake.flavor= request.json.get('flavor', cupcake.flavor)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.image = request.json.get('image', cupcake.image)
   
    db.session.commit()

    return jsonify(cupcake=cupcake.serialize())


@app.route('/api/cupcakes/<int:id>', methods=['DELETE'])
def delete_cupcake(id):
    """Delete a cupcake"""
    cupcake = Cupcake.query.get_or_404(id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="deleted")



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5100)