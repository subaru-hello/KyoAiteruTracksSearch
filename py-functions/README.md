# py-functions

Describe your project here.

### add packages

```
rye add [package]
```

### sync

```
 % rye sync --no-dev
Reusing already existing virtualenv
Generating production lockfile: /Users/subaru/development/TracksForPrivateAthleteDB/py-functions/requirements.lock
Generating dev lockfile: /Users/subaru/development/TracksForPrivateAthleteDB/py-functions/requirements-dev.lock
Installing dependencies
Resolved 53 packages in 9ms
Audited 53 packages in 0.43ms
Done!
```

## functions の新規開発

###

1. functions を handlers 配下に置いて main.py から呼び出す
   handlers/test.py

```python
  from firebase_functions import https_fn
from src.models.scrape import Scrape

# https_fn.Requestを受け付けて、https_fn.Responseを返すようにする
@https_fn.on_request()
def introduction(req: https_fn.Request) -> https_fn.Response:
    you = req.args.get("me")
    age = req.args.get("age")
    introduce_myself = Scrape(you,age)
    return https_fn.Response(f"{introduce_myself.introduce()}")
```

main.py

```
from src.handlers.test import introduction

initialize_app()

introduction
```

2. firebase deploy --only functions を実行する
