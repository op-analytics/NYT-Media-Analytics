import os
from gensim.models import KeyedVectors
from functools import reduce


def loadModels(path):
    '''Loads and returns all models in the given path as a dictionary'''
    # raise OSError if path is invalid or is a file
    if not os.path.exists(path):
        raise OSError("given path %s does not exist" % path)
    if os.path.isfile(path):
        raise OSError("given path %s is not a folder" % path)
    models = {}
    numOfModels = 0
    files = os.listdir(path)
    for file in files:
        # Skip files that don't appear to be models
        if file.lower().endswith(('.npy', '.md', '-example')) or os.path.isdir(path+str(file)) or file.startswith('.'):
            continue
        # Try opening the model and ignore error thrown if it is not a model
        try:
            model = KeyedVectors.load(path+file, mmap='r')
            model.syn0norm = model.wv.syn0  # prevent recalc of normed vectors
            model.totalWordCount = reduce(
                lambda total, word: total+word.count, model.wv.vocab.values(), 0)
            models[str(file)] = model
            numOfModels = numOfModels + 1
        except Exception as e:
            raise e
    if numOfModels == 0:
        raise OSError("No models were found in given path %s" % path)
    return models