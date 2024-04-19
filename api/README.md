## Flexbosch API

### How to install?

Make sure you have node installed (LTS version).<br>

Then run the following in your shell of choice to install the app<br>

```
cd root/location/of/folder # make sure you end up in the root folder of the app
npm i
```

Install the database (mysql) on your sql server of choice, this is all stored in `db.sql` <br>

Then configure your local db settings and what port you want to use in `config.json`<br>
Make sure your port is not already in use and make sure the database is imported.<br>


### Run the app

```
    npm start
```