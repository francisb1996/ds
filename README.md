run `npm i` to install dependencies
run `npm start` to test locally (`http://localhost:3000`)
run `sls deploy` while signed into AWS to deploy

endpoints:
  POST - <url>/authenticate
  POST - <url>/api/v1/{tenant}
    sample body:
        {
            "externalTrackingID": "test-tracking-id",
            "products": [
                {
                    "product": "RxPredictiveModel"
                },
                {
                    "product": "DHD"
                }
            ]
        }
  GET - <url>/api/v1/{tenant}/{resourceID}