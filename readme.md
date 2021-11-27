# Phone-Store API

## About ❔

---

This is the back-end repository of PhoneStore, an e-commerce for mobile phones.

</br>

## How to run 🏃‍♀️💨

---

```bash
# Clone this repository
$ git clone https://github.com/Deltinha/back-phone-store

# Access the project folder cmd/terminal
$ cd back-phone-store

# Install the dependencies
$ npm install

#Create an teplate database
$ sudo -u postgres createdb -T template0 phone_store

#Restore the dump file
$ sudo -u postgres psql phone_store < 'database.sql'

#Create a new file called .env in the root folder using .env-example as template.
$ cp .env-example .env
 
# Feed the newly created file with the info of your database.

# Run the application in development mode
$ npm run dev
```

</br>

## Tech Stack 💾

---

<br/>

<p align="center">
<img alt="nodejs" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img alt="expressjs" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img alt="postgresql" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
<img alt="jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
<img alt="eslint" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
</p>

<br>
<br>
<br>

---

<p align='center'>
  Made by <a  href="https://github.com/rabbithay">Thayaná Coelho</a> e <a  href="https://github.com/Deltinha/">Moisés Brandão</a>
</p>
