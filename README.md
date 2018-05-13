# Clockwise Clockwork
This is demo project as part of intern program in Clockwise.software

Goal: Create app where users can order masters for repear grandfather clock.
App should have user and admin parts. In admin part admin can control cities, masters, clients, orders collections. Need to have validation in forms, clean and simple design, clear and pretty UI, email notification.

live demo: `http://ec2-34-244-145-145.eu-west-1.compute.amazonaws.com`

# Frontend part

# Prerequirements:
To run this code you already neen to have: git, node.js, nodemon, mongo, Angular CLI.

# How to install
1. Clone this frontend part using terminal: `git clone https://github.com/sysstas/ccfront.git` 
2. Locate newly created folder: `cd ccfront`
3. Ensure that server location is `addr = "http://localhost:5000"` in file `ccfront\src\app\api.service.ts` (line 23)
4. Start Angular CLI server: `ng s`

5. Clone backend part `https://github.com/sysstas/ccback.git`
6. Locate newly created folder: `cd ccback`
7. Create and run local mongo server or use mlab.com
8. Ensure that mongo server location is your server location on line 31 in `ccback\index.js`
9. your mongo database should have `admins` collection with at least 1 record with fields `login` and `password`
10. Start nodemon server: `nodemon index.js`

11. Open in browser `http://localhost:4200/`

Enjoy!!!!

