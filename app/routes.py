from flask import render_template, make_response
from app import app

@app.route('/')
@app.route('/index')
def index():
	user = {
		'username': 'Ada'
		}
	return render_template("index.html", title = "Wellspring", user = user)