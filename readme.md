<img align="right" src="./assets/images/icons/petix.jpg" width=200 height=200>

# Petix

[![Release](https://img.shields.io/github/release/Jonathan25J/Petix.svg)](https://github.com/Jonathan25J/Petix/releases/latest)
[![Build](https://github.com/Jonathan25J/Petix/actions/workflows/docker-compose.yml/badge.svg)](https://github.com/Jonathan25J/Petix/actions/workflows/docker-compose.yml)
![!JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&)

The Petix bot/app is largely rebuild in version 2.0.0 so that the app still can be hosted without crashing each time. You can see the old and current functionality of this app in the provided images.

## Invite app
It's not possible to invite this app.

## Hosting
- Have the following software installed: `Node` and the `Docker Engine`
- Create a `.env` file in the root folder with the following content 
```bash
# App
APP_TOKEN = [APP TOKEN]
APP_CLIENT_ID = [APP CLIENT ID]
```
- Replace the values inside the brackets `[]` with your values and remove the brackets itself
- Run `docker compose up -d`
- Run `node deploy-commands`

## Images
### Version 2.0.0
<img src="./assets/images/menus/v2.0.0.png">

### Version 1.0.0
<img src="./assets/images/menus/v1.0.0.png">