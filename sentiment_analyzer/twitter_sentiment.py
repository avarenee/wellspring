from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import *
from sklearn.linear_model import LogisticRegression
from random import randint

data = []
data_labels = []
with open("./pos_tweets.txt") as f:
    for i in f:
        data.append(i)
        data_labels.append('happy')

with open("./neg_tweets.txt") as f:
    for i in f:
        data.append(i)
        data_labels.append('sad')

with open("./angry_tweets.txt") as f:
    for i in f:
        data.append(i)
        data_labels.append('angry')

vectorizer = CountVectorizer(
    analyzer = 'word',
    lowercase = False
)
features = vectorizer.fit_transform(
    data
)
features_nd = features.toarray()
X_train, X_test, y_train, y_test = train_test_split(
    features_nd,
    data_labels,
    train_size=0.80,
    random_state=1234)
log_model = LogisticRegression()
log_model = log_model.fit(X=X_train, y=y_train)





