from flask import render_template, make_response
from app import app
from app.usr_repr import color_fills

@app.route('/')
@app.route('/index')
def index():
	user = {
		'username': 'Ada'
		}
	return render_template("landing.html", title = "Wellspring", user = user)

@app.route('/plant')
def cbt_form():
	return render_template("survey.html", title = "Wellspring - Plant a Thought")

@app.route('/your-wellspring')
def wellspring():
	c1 = color_fills[0]
	c2 = color_fills[1]
	c3 = color_fills[2]
	c4 = color_fills[3]
	return render_template("wellspring.html", title = "Wellspring - Plant a Thought", c1=c1, c2=c2, c3=c3, c4=c4)