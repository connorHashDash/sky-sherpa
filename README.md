# Sky Sherpa

The goal of Sky-Sherpa is to provide an all-in-one flight booking platform which looks and feels like a premium product.

To gain the most out this project, I'm trying to use as little as possible in the way of frameworks on both the frontend and backend.

While it would be great to attract authentic users to the platform, it's far from my main goal, the goal of Sky-Sherpa is for me to learn.

Check it out at [https://sky-sherpa.com](https://sky-sherpa.com) (currently, there's just a holding page)

## Developing

To get the project running, navigate to the ./static/ folder and run:

```
npm run dev
```

That will create both a locally running backend server and a vite development server which will speak to each other (
you'll have to provide your own database solution. MySQL or MariaDB). I haven't got round to making a migration solution either, 
so you'll have to backwards engineer schemas.

## Configuring

You'll need to provide a config file also, the Go server needs this to know what to do, where to connect to your database

The expected schema is as follows:

```javascript

{
  "server_conf": {
    "port": ":8080",
    "logs_dir": "./logs/",
    "ssl_cert": "(only required if is_ssl is true)",
    "ssl_priv_key": "(only required if is_ssl is true)",
    "is_ssl": false
  }, 
  "mariadb_conf": {
    "username": "(details for connecting with your database)",
    "passw": "",
    "net": "",
    "addr": "",
    "db_name": ""
  },
  "duffel": {
    "key": "(Make an account with duffel for a key)"
  },
  "files": {
    "dir": "./static/"
  }
}
```
```
```
