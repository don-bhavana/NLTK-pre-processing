from flask import *
import pandas as pd
import numpy as np
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet 
from nltk.stem import PorterStemmer

from flask_cors import CORS ,cross_origin


app = Flask(__name__)
cors = CORS(app)

@app.route("/preprocessing", methods=["POST"])
@cross_origin()
def preprocessing():
    data = request.get_json()
    text = data['text']

    tokenized = nltk.word_tokenize(text)

    removed_punc = [w for w in tokenized if w.isalpha()]

    lowered = [w.lower() for w in removed_punc]

    stopwords = nltk.corpus.stopwords.words("english")
    removed_sw = [w for w in lowered if w not in stopwords]

    def pos_tagger(nltk_tag):
        if nltk_tag.startswith('J'):
            return wordnet.ADJ
        elif nltk_tag.startswith('V'):
            return wordnet.VERB
        elif nltk_tag.startswith('N'):
            return wordnet.NOUN
        elif nltk_tag.startswith('R'):
            return wordnet.ADV
        else:
            return None

    lemmatizer = WordNetLemmatizer()

    pos_tagged = nltk.pos_tag(removed_sw)  
    print(pos_tagged)

    wordnet_tagged = list(map(lambda x: (x[0], pos_tagger(x[1])), pos_tagged))
    print(wordnet_tagged)

    lemmatized = []
    for word, tag in wordnet_tagged:
        if tag is None:
            lemmatized.append(word)
        else:
            lemmatized.append(lemmatizer.lemmatize(word, tag))

    return {"tokenized" : tokenized, "remove_punc" : removed_punc, "removed_sw" : removed_sw, "lemmetized" : lemmatized} 


if __name__ == "__main__":
   
    app.run(host='127.0.0.1', port=5000)