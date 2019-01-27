from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import *
from sklearn.linear_model import LogisticRegression
from random import randint

data = []
data_labels = []
with open("/home/pos_tweets.txt") as f:
    for i in f:
        data.append(i)
        data_labels.append('happy')

with open("/home/neg_tweets.txt") as f:
    for i in f:
        data.append(i)
        data_labels.append('sad')

with open("/home/angry_tweets.txt") as f:
    for i in f:
        data.append(i)
        data_labels.append('angry')

vectorizer = TfidfVectorizer(min_df=5,
                                 max_df = 0.8,
                                 sublinear_tf = True,
                                 use_idf = True,decode_error = 'ignore',
                                 analyzer = "word", lowercase = False)

features = vectorizer.fit_transform(
    data
)
features_nd = features.toarray()
rand = randint(1, 10000)
X_train, X_test, y_train, y_test = train_test_split(
    features_nd,
    data_labels,
    train_size=0.80,
    random_state=rand)
log_model = LogisticRegression()
log_model = log_model.fit(X=X_train, y=y_train)

def label_new_data(sentiments):
    sentiments = vectorizer.transform(sentiments).toarray()
    labels = log_model.predict(sentiments)
    for i in range(len(labels)):
        print(labels[i])





