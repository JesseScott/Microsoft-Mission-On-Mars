import cognitive_face as CF

KEY = 'd65cfbff71f543ecabc93d2fd6714ae3'  # Replace with a valid subscription key (keeping the quotes in place).
CF.Key.set(KEY)


# You can use this example JPG or replace the URL below with your own URL to a JPEG image.
#img_url = 'https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/detection1.jpg'
img_url = 'https://raw.githubusercontent.com/MissionMarsFourthHorizon/Mission-Briefings/master/CognitiveServices/images/CrewPhoto.jpg'
result = CF.face.detect(img_url)
print(result)


# [{u'faceId': u'68a0f8cf-9dba-4a25-afb3-f9cdf57cca51', u'faceRectangle': {u'width': 89, u'top': 66, u'height': 89, u'left': 446}}]
