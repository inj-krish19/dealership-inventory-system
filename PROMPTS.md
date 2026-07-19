# PROMPTS.md

**_Used for maintaining history, context and prompts._**

---

### PROMPT 1 - PLANNING & BRAINSTORMING

```
Lets cook something. You read instruction then we move to planning -> development -> testing -> deployment -> (any other steps remaining). Deadline of work if 48 hours, its not much big. It needs the real craft person as per their criteria. Main thing they told is about use ai(i choose you), give the best possible practice. We'll go all out here. Just below giving you document, instructions you read it carefully, save it on context so it will help us building it.

So lets start with Phase 1 Planning.

- Suggest me a name of repo if required or tell me what to put as repo name.
- Suggest me tech stack i am confused in "Node.js/TypeScript (with Express/NestJS)", are they requiring node.js with typescript or normal js + express will work. (I am planning tech stack as MERN, standout for me - latestly practiced on it, know from development to deployment).
- Explain me here TDD - Test Driven Development
- Also remember they need more commit + detailed commit on every tiny stage so whenever it required, you also give me that to write it.
- AI Usage Policy one remember also, it will need on each commit.
- What structure should we follow, i know its role based access so you will tell the best structure possible for both frontend, backend.
- Also write the frontend + backend installation command, folder structure.

After this all and solving all doubts if you are clear with every thing tiny details, context then give me README file to save on my local for AI context, so can use later. LETS GOOO
```

<br/>

### PROMPT 2 - DATABASE SCHEMA + DATABASE INTEGRATION

```
Just i wrapped creating folder structure for frontend and backend. Lets now move at backend side. As per the idea of application create a database schema and lets setup the Database MongoDB connection be sure you import the credential MONGO_URI from .env file. As its role based so handle as per it and we have to manage their both authentication through JWT authentication. So as per that. Give me these.
```

_Follow Up: CORS Configuration_

```
In this app.ts configure cors where fetch frontend url from env.frontend or like that
```

<br/>

### PROMPT 3 - RESOLVING ERRORS

```
Okay there are some of the errors, some of the code that is written with some bugs and poorly i am instructing it below.


- First of all we are using "type": module, so imports are according to that

- There in all imports .js postfix is needed, its throwing compilation errors. I have resolved it.

- Integration Testing of db.test.ts is throwing error Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha` and then add 'jest' or 'mocha' to the types field in your tsconfig.ts(2593)

- auth.ts has the error related verify token in string and undefined one issue. Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.ts(2345)

const token: string | undefined

- Vehicle model interface also has an issue that is Interface 'IVehicle' incorrectly extends interface 'Document<ObjectId, any, any, Record<string, any>, {}>'.
  Types of property 'model' are incompatible.
    Type 'string' is not assignable to type '{ <ModelType extends Model<unknown>>(name: string): ModelType; <ModelType extends Model<any, {}, {}, {}, any, any, any>>(): ModelType; }'.ts(2430).  

Resolve these issues.
```

<br />

### PROMPT 4 - TESTING FAILS & '/', '/health' Endpoints

```
We are in trouble testing is getting failed. Now tell me how to do testing, tell me versioning command as it might have clash. Give me test related files back, also apart from this for checking the routes are working define "/" route for main endpoint where it describes about application, also create one "/health" route for health monitoring of the server. Also solve these testing + jest one issues.
```

<br/>

### PROMPT 5 - DEFININING ENDPOINTS, CONTROLLER, SERVICES, REPOSITORIES

```
Lets start creating endpoints. Authorization, role based access and all of that. Also like above give me the commits also.

git commit -m "<feat/def/build/...>: <what we have made>

<Used an AI assistant to generate the initial boilerplate for the
controller and service, then manually added validation logic. >

Co-authored-by: Claude <claude@users.noreply.github.com>"


They respect modularity + clean code + SOLID moe so write according to that and give me commits to push one by one.
```

<br />

### PROMPT 6 - ENHANCE CODE & COMMIT MESSAGE ORDER

```
I got it you gave commits now from next time and this time also give me like how much code to push and what commit instead of code code code + commit commit commit way. Give me in code code + commit, code code + commit on way. or mention like ex. {A1-A3} commit 1, then {A4-A5} commit 2. Which one looks effective
```

<br/>

### PROMPT 7 - FRONTEND LIBRARY SETUP

```
Lets go ahead whatever the next plan is lets do it. I have made the frontend tailwindcss configurations already so we dont have to do it. Other dependancies i am willing to add are react-icons for react related icons. For global state management lets add zustand, routing we 'll user react-router. So give me commands for installation then also now we start building frontend also. Not much more time remain now.
```

<br />

### PROMPT 8 - COMMIT INSTRUCTIONS & FRONTEND TESTING

```
From next time keep it the commit thing in mind title and coauthor is correact, just dont forget to always give me for what ai is used for. Also you forgot that mentioning type during importing types. Can you regive me commits just else i have started these all it works. Beside this lets start the frontend testcases till what we have build.
```

<br />

### PROMPT 9 - ROUTING & ENTRY POINT

```
Give me the App.tsx having all the routes and zustand management + provider all of that if needed.
```

<br />

### PROMPT 10 - FIXING FOLDER STRUCTURE CLASH & TESTING STRUCTURURE

```
Currently you told me to add vitest.config.ts content also you told setup.ts in src/test folder where our old and local folder structure exist like below. Resolve the folder stucture clash issue and then approach solution to go.
frontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/               (Dashboard, Login, Register, AdminPanel)
│   ├── services/             (api.ts — axios instance + endpoint calls)
│   ├── types/                 (shared TS interfaces)
│   ├── utils/
│   └── App.tsx / main.tsx
├── tests/
├── package.json
└── vite.config.ts
```

<br />

### PROMPT 11 - TEST CASES FAILURE & RESOLVING FUNCTION AMBIUITY

```
These are the results of testcases we held, also i am facing some issue on compilation and runtime we have to fix them also.
 ❯ tests/pages/Login.test.tsx (2 tests | 2 failed) 7ms
     × logs in successfully and updates the store 4ms
     × shows an error message on failed login 1ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  tests/pages/Login.test.tsx > Login page > logs in successfully and updates the store

TypeError: vi.mocked(...).mockResolvedValueOnce is not a function

 ❯ tests/pages/Login.test.tsx:22:42
     20|             token: 'fake-token',
     21|         };
     22|         vi.mocked(authService.loginUser).mockResolvedValueOnce(mockResponse);
       |                                          ^
     23|
     24|         render(<MemoryRouter><Login /></MemoryRouter>);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  tests/pages/Login.test.tsx > Login page > shows an error message on failed login
TypeError: vi.mocked(...).mockRejectedValueOnce is not a function

 ❯ tests/pages/Login.test.tsx:36:42

     34|
     35|     it('shows an error message on failed login', async () => {
     36|         vi.mocked(authService.loginUser).mockRejectedValueOnce({
       |                                          ^
     37|             response: { data: { message: 'Invalid credentials' } },
     38|         });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯

 Test Files  1 failed | 3 passed (4)
      Tests  2 failed | 8 passed (10)
   Start at  23:44:29
   Duration  3.49s (transform 268ms, setup 1.05s, import 1.33s, tests 129ms, environment 8.50s)

Also apart from above one on compilation it gives this error for expect(screen.getByText('Admin Panel')).toBeInTheDocument();
Property 'toBeInTheDocument' does not exist on type 'Assertion<HTMLElement>'.

```

<br />

### PROMPT - 12 : DEFINING THME & REPHRASING

```
Okay good till now. Ahead we have to build below things just keep in mind we have to wrap this up very shortly without compromising any feature, functionality, UI, security, integration. We have made sample login, dashboard, register like pages. What's remain.


This is the checklist we have to proceed from now (in my mind, others i might have miss):
- Defining theme for the application, handling light + dark mode support.
- Redesigning pages for register, login, dashboard, admin panel (it should have premium look, landing pages can have extra ordinary animations, where other normal pages should have animations on user interactions and events like submit, redirecting, search, filter, etc...)
- After these all have to initegrate vehicles and user api with both of the modules (user, vehicle - user is integarted, vehicle is remained)
- Have to make postman collection for testing backend api (i'll do that parallelly - just telling)
- Have to create a SETUP.md for anyone who can clone repo, paste .env then the sample records so their app started running without much overhead.
- Have to create a fine README file and other MD files where README ha details about application, idea, how we made it, how to install locally, how to setup, how to run, "My AI Usage" section including for what AI is used.

At frontend side now be consice for styling, animations (use framer-motion). Designs of pages, components should be responsive, theme based, working, modular and have premium + classic vibe. Theme templates for light + dark mode should be transitive. Let's go first redesign the existing page then we move forward. 
```

<br />

### PROMPT - 13 : UPDATE TAILWIND CSS DEPENDANCY

```
Okay well tried, theme toggle does not works. In local storage the theme is getting changed, but its not reflected on the UI. Also some of the misconfigurations you have made. tailwind.config.js is old way, now in newer version its not needed to do. Follow version 4.3 of tailwind css. Give it a try if that works then okay, else we will move forward with double class mention where ex. className="text-slate-800 dark:text-slate-200" like a thing if aint works.  Give me new index.css with the changes.Okay well tried, theme toggle does not works. In local storage the theme is getting changed, but its not reflected on the UI. Also some of the misconfigurations you have made. tailwind.config.js is old way, now in newer version its not needed to do. Follow version 4.3 of tailwind css. Give it a try if that works then okay, else we will move forward with double class mention where ex. className="text-slate-800 dark:text-slate-200" like a thing if aint works.  Give me new index.css with the changes.
```

<br />

### PROMPT - 14 : REDESIGN PAGES

```
Okay this one works. I can see your login page, how insane it looks appreciate your efforts. Lets now create Register, Dashboard and AdminPanel. I have a doubt how you have planned to manage showing Admin login page. From home page or navbar how will anyone will redirect from landing page or navbar to admin panel, and all of that. Just clear are you making different page or how you manage just create it and notify me. Then on next we will create pages for vehicle related and integarte them.
```

<br />

### PROMPT - 14 : SAMPLE DATA & LANDING PAGE

```
Now currenly give me an .md file consisting sample data of the application and both of the collection. Give each of 2 records for user and admin. User [kglivee19@gmail.com, user@gmail.com]: Pass: Pass@123, Admin [krishshah19.in@gmail.com, admin@gmail.com]: Pass: ADM1N@5ECURE. Vehicles some 7-8 records, some of them with 0 quantity so can show out of stock and disable purchase button, different prices and others as per category, make, modelName. Apart from this now give me Home page of "/" route so always it dont redirect in dashboard or login page. This home page should be like that last one you can add some content reagding application, show some animation premium theme (like a home page and all descriing about application and all).
```

<br />

### PROMPT - 15 : RESOLVING DEPLOYMENT

```
During my vercel deployment this error came {
    "message": "Operation `users.findOne()` buffering timed out after 10000ms"
} 10 second it tooks to respond and still this, local works fine.
```

<br />

### PROMPT - 16 : VEHICLE TEST CASES

```
Okay good job, everything works well now give me updated Admin Panel and go for Vehicle Integartions, and lets wrap this up. We are now more close to the deadline.
```

<br />

### PROMPT - 17 : FIXING DASHBOARD PRESISTENCY

```
Before this i got up an issue now lets resolve it. My account is showned logged in as Krish (user). On navbar my name is being showned, i am looged in now i can't open dashboard as still logged in for accessing dashboard still needs to refill the form and then it reidrects dashboard on reload have to relogin. I guess its because of not saving jwt token locally and sending request through it on login or register process so have to fix it on highest priority.
```

<br />

### PROMPT - 18 : INTEGRATING ADMIN PANEL & VEHICLE TESTING

```
Give me updated AdminPanel.tsx we still have the old classic file without theme implementation and all, give me new redesign version of it. Apart from that lets start writing the testcases for the other vehicle, user, inventory, admin related testcases lets do that one by one give me admin panel and testcases implementation of vehicle, user.
```

<br />

### PROMPT - 19 : VEHICLE CARD TESTING COMPILATION ERROR

```
On VehicleCard.test.ts i have not pushed as it having error of this that are 'VehicleCard' refers to a value, but is being used as a type here. Did you mean 'typeof VehicleCard'?ts(2749)
type VehicleCard = /*unresolved*/ any. So file is currently empty and not pushed on github. Also on each occurence of toBeInDocument and toBeDisabled it throws compilation error of Property  does not exist on type 'Assertion<HTMLElement>'
```

<br />

### PROMPT - 20 : RESOLVING VEHICLE CARD TESTING

```
On VehicleCard.test.ts i have not pushed as it having error of this that are 'VehicleCard' refers to a value, but is being used as a type here. Did you mean 'typeof VehicleCard'?ts(2749)
type VehicleCard = /*unresolved*/ any. So file is currently empty and not pushed on github. Also on each occurence of toBeInDocument and toBeDisabled it throws compilation error of Property  does not exist on type 'Assertion<HTMLElement>'
```

<br />

### PROMPT - 21 : RESET FILTER FUNCTIONALITY

```
Okay drop the plan of adding and updating vehicle in this. Revoke the changes i have not made any change, I just re-read the instuctions it doesn't stated about user for this ability. Admin have it will work as also we will need to change database, and much things will be added so. Just give me reset button one thing.
```

<br />

### PROMPT - 22 : PREPARE TEST REPORT & SETUP

```
I have check all the Run full test suites frontend + backend both are green. npm test ran on both all testcases passed everything is green. Pasting here below. Postman Collection and Manual API testing is done everything works fine, routes are protected and role based access is also working Just will export and push it on github. Also parallely i have deployed frontend and backend resolved CORS and deployment related issues, also made PROMPTS.md with title and prompt so its also done. Now giv eme SETUP.md file i am pasting both .env.example

FRONTEND :
VITE_BACKEND_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api

BACKEND : PORT=5000
DOMAIN=http://localhost
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/autolot?retryWrites=true&w=majority
JWT_SECRET=replace_with_long_random_string
JWT_EXPIRES_IN=7d
NODE_ENV=development


GIVE ME SETUP.md and TEST REPORTS.md
```

<br />

### PROMPT - 23 : PREPARE README

```
I have check all the Run full test suites frontend + backend both are green. npm test ran on both all testcases passed everything is green. Pasting here below. Postman Collection and Manual API testing is done everything works fine, routes are protected and role based access is also working Just will export and push it on github. Also parallely i have deployed frontend and backend resolved CORS and deployment related issues, also made PROMPTS.md with title and prompt so its also done. Now giv eme SETUP.md file i am pasting both .env.example

FRONTEND :
VITE_BACKEND_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api

BACKEND : PORT=5000
DOMAIN=http://localhost
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/autolot?retryWrites=true&w=majority
JWT_SECRET=replace_with_long_random_string
JWT_EXPIRES_IN=7d
NODE_ENV=development


GIVE ME SETUP.md and TEST REPORTS.md
```

<br />

### PROMPT - 24 : WRAP UP & README

```Okay lets fill the heart of the project README.md, it should include these things and detailed redirection for this. First of all it should have the description of project, Tech stack for frontend and backend with mention of dependancies that are used with small statement of choosing both frameworks with typescript, My AI Usage section, where list two names ["Claude", "ChatGPT"] where Claude you know what i have used for you describe it. Mention the bug solving, resolving versioning & compatibility related and configuration of teconfig issues.
Also it should attach the reference of SETUP, TEST_REPORT, SAMPLE_DATA, PROMPTS like markdown whenever required attach their reference. Also with that attach a new reference of SCREENSHOTS.md where all the screenshots are shown.
One of the important things that should have honorable mention are Contact Information so list below details and live link demo urls.
LINKS  :
REPO: https://github.com/inj-krish19/dealership-inventory-system
APP : [https://dealership-inventory-system.vercel.app](https://dealership-inventory-system.vercel.app/)
API : [https://dealership-inventory-system-api.vercel.app](https://dealership-inventory-system.vercel.app/)

MY DEVELOPER PERSONAL INFORMATION  FOR CONTACT PURPOSE:
Email : kglivee19@gmail.com / krishshah19.in@gmail.com
Github : [https://github.com/inj-krish19](https://github.com/inj-krish19/dealership-inventory-system)
LinkedIn : https://www.linkedin.com/in/inj-krish19/

Also all the things i have told you arrange them in order it shouldbe just CONTACT in the end.
Apart from this give me a structure SCREENSHOTS.md with (for the all required screenshots). Path of ./screenshots/...
{TITLE}
{IMAGE LINK}

```

<br />

### PROMPT - 25 : BACKEND IN API DOCUMENTATION

```
Give me a commit for above on README one commit. After that create a backend routepn "/docs" just like swagger things list all the endpoints and their description, method like thing. Also give me a commit message for it also.
```

<br />
