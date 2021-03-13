v - 0.0.9

# Developing Locally

run `docker-compose up` to bring up a mongo db and an optional UI. If this runs successfully you will have mongodb running on port 27017
and an admin UI running on 8001

Ensure you have a .env file in the root folder with the following self explanatory fields :

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
UPDATE_METRIC_THRESHOLD=
DB_URL=
DB_NAME=
DB_COLLECTION_NAME=
```

# Notes

metrics endpoint : /metrics
port : 3000
