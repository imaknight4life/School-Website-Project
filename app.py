from flask import *

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return render_template("index.html")

@app.route("/contact")
def contact():
    return render_template("form.html")

@app.route("/trade")
def trade():
    return render_template("trade.html")

@app.route("/about_me")
def about_me():
    return render_template("about_me.html")

@app.route("/lessons")
def lessons():
    return render_template("lessons.html")

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

# main driver function
if __name__ == '__main__':

    # run() method of Flask c
    # lass runs the application 
    # on the local development server.

    app.run(debug=True, host="0.0.0.0", port="9290")
