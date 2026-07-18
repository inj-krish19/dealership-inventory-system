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
