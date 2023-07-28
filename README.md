## BACKEND

## Installation
```
express --no-view --git ./
```
```
npm i cors dotenv node-fetch bcrypt uid2
```

## Dans le fichier app.js

```
require('dotenv').config();
```
```
const fetch = require('node-fetch');
```
```
const cors = require('cors');
app.use(cors())
```