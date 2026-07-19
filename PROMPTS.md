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
