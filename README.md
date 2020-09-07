<!-- <a href="http://www.tomerzaidler.com"><img src="https://avatars3.githubusercontent.com/u/50677880?s=460&u=d57cc592bedd144f97deb17f535b6e793f8cb27c&v=4" title="Tomer Zaidler" alt="Tomer Zaidler"></a>

Tomer Zaidler -->

# Users-server

> API server on that listen on port 3200

> Built with express

> Users system using mongoDB for storage and jwt for authentication

---

## Table of Contents 


- [Installation](#installation)
- [API](#api)
- [Contributing](#contributing)
- [Team](#team)
- [Support](#support)
- [License](#license)


---

## API call Example 

```javascript
// api call example

const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username, password });
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (err) {
        logger.error(`createUser failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};
```

---

## Installation

- install node.js

### Clone

- Clone this repo to your local machine using `https://github.com/tomerzaidler/users-server-p`

### Setup

- one line command setup

> now install npm

```shell
$ npm install
```

---
## API
> base url is http://localhost:3200/api/1
- /create -> **POST request**
- /get -> **GET request**
- /delete -> **DELETE request**
- /login -> **POST request**
- /edit -> **PATCH request**
- /get/all -> **GET request**

> How to add another route?
- Create another file in the api folder
- Import new file to the routes.js
- Add a route with the imported file example:
```javascript
router.use('/new-route', require('./api/new-file'));
```
---

## Contributing

> To get started...

### Step 1

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/tomerzaidler/users-server-p.git`

### Step 2

- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/tomerzaidler/users-server-p/compare" target="_blank">`https://github.com/tomerzaidler/users-server-p/compare`</a>.

---

## Team


**Tomer Zaidler**

<a href="https://github.com/tomerzaidler"><img src="https://avatars3.githubusercontent.com/u/50677880?s=460&u=d57cc592bedd144f97deb17f535b6e793f8cb27c&v=4?s=200" title="Tomer Zaidler" alt="Tomer Zaidler"></a> 


---

## Support

Reach out to me at one of the following places!

- Website at <a href="http://www.tomerzaidler.com" target="_blank">`tomerzaidler.com`</a>
- Email: tomerzaidler@gmail.com

---

## License


- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2015 © <a href="http://www.tomerzaidler.com" target="_blank">Tomer Zaidler</a>.
