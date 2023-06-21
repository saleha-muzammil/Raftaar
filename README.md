## Raftaar

### Running Code:
1. Open backend folder in VSC and run `npm i` and then `node index.js`
2. Open frontend folder in VSC and run `npm i` and then run `npm start`

### Folder Structure 
- Frontend
  1. login contains authentication pages and processes
  2. views contain the screens visible to the authenticated user
  3. App.js has a global state. It does need some refactoring. @dork-writes will sort it out.

- Backend
  1. middleware contain middleware function that execute for route protection
  2. models contain MongoDB collection schemas
  3. routes contain use case specific routes. For announcements, make a new model file like Announcement.js and a new route file such as announcement.js
  4. .env file contains environment variables and will be accessed using
     1. `require('dotenv').config();`
     2. `const variable = process.env.VARIABLE_NAME`
  5. db.js has database connection function
  6. passport-setup.js has the google OAuth setup and the remaining code can be viewed in `routes/google.js`
