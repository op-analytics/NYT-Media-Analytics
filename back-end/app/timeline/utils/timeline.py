# The frequency data for each word in words for the year range given.
def getWordFrequencyData(models, words, year_from, year_to):
    frequencyData = []
    for year, model in models.items():
        year = int(year)
        if year < year_from or year > year_to:
            continue
        for word in words:
            try:
                wordCount = model.wv.vocab[word].count
                wordFreq = (wordCount / model.totalWordCount) * 100
                wordRank = model.wv.vocab[word].index + 1
            except KeyError:  # The word is not in vocabulary for this year.
                wordCount = 0
                wordFreq = 0
                wordRank = 0
            # Get the index of the object containing the current word in frequencyData.
            dataIndex = next(
                (index for (index, w) in enumerate(frequencyData) if w["word"] == word),
                None,
            )
            # If the word is not already in frequencyData.
            if dataIndex == None:
                frequencyData.append(
                    {
                        "word": word,
                        "data": [
                            {
                                "year": year,
                                "rank": wordRank,
                                "wordCount": wordCount,
                                "wordFreq": wordFreq,
                            }
                        ],
                    }
                )
            else:
                # If the word already exists in frequency data, just append the current year's data.
                frequencyData[dataIndex]["data"].append(
                    {
                        "year": year,
                        "rank": wordRank,
                        "wordCount": wordCount,
                        "wordFreq": wordFreq,
                    }
                )
    # Sort all words datasets by year
    for wordData in frequencyData:
        wordData["data"].sort(key=lambda x: int(x["year"]))
    return frequencyData
