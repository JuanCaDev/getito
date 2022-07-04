import urllib.parse
from hashlib import sha256
from hmac import HMAC
from datetime import datetime

parameters = {
  'UserID': 'look@me.com',
  'Version': '1.0',
  'Action': 'FeedList',
  'Format':'XML',
  'Timestamp': datetime.now().isoformat()
}
api_key = 'b1bdb357ced10fe4e9a69840cdd4f0e9c03d77fe'
concatenated = urllib.parse.urlencode(sorted(parameters.items()))

print(parameters.items())
print(sorted(parameters.items()))
print(concatenated)


# parameters['Signature'] = HMAC(api_key, concatenated, sha256).hexdigest()

# print('parameters signature')
# print(parameters['Signature'])