---

![](public/banner.png)


---



# Serverless REST API build with Firebase Functions, Nestjs, Node Mailer and TypeScript

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

<br>


## Description

This is a simple contact API that is connected with my [portfolio website](https://github.com/nirajprakash/nirajprakash.github.io). 


<br>

## Requirements

- [NodeJS](https://nodejs.org/en/)
- You will need a Firebase project and firebase tools cli

```
npm install -g firebase-tools
```
- [Google Recaptch v3](https://www.google.com/recaptcha/)

<br>

## Installation

```bash
$ npm install
```

<br>


## Configure
- Change [.firebaserc](.firebaserc) with your firebase project id.
- create config.json file inside [src/config](src/config). For example see  [config-example.json](src/config/config-example.json).

- Add Email Credential in config.json file.
- Add Google Recaptcha v3 server key in config.json file.



<br>


## Running the app

```bash
# for running
$ npm run start

# deploy on firebase
$ npm run deploy
```



## License
[MIT licensed](LICENSE).
