from flask import Flask, render_template, url_for, redirect, request
from data import db_session
from data.reviews import Review
from data.requests import Request

app = Flask(__name__)
app.config['SECRET_KEY'] = 'fjklejlwhjkjlQEJK'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/clients')
def clients():
    return render_template('clients.html')

@app.route('/service/<service>')
def service(service):
    print(service)
    return render_template(service + '.html')

@app.route('/reviews')
def reviews():
    db_sess = db_session.create_session()
    reviews = db_sess.query(Review).all()
    return render_template('reviews.html', reviews=reviews)

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/add_review', methods=['POST'])
def add_review():
    db_sess = db_session.create_session()
    review = Review()
    print(request.form)
    review.name = request.form['name']
    review.header = request.form['header']
    review.text = request.form['text']
    review.imageurl = request.form['link']
    review.date = request.form['date']
    db_sess.add(review)
    db_sess.commit()
    return redirect('reviews')

@app.route('/make_order', methods=['GET', 'POST'])
def make_order():
    if request.method == 'POST':
        req = Request()
        req.mail = request.form['mail']
        req.text = request.form['text']
        db_sess = db_session.create_session()
        db_sess.add(req)
        db_sess.commit()
        return redirect('/')
    return render_template('make_order.html', text=request.args.get('text'))

@app.route('/view_requests')
def view_requests():
    db_sess = db_session.create_session()
    reqs = db_sess.query(Request).all()
    print(reqs)
    return render_template('requests.html', reqs=reqs)

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == "__main__":
    db_session.global_init('db/db.db')
    app.run(debug=True)