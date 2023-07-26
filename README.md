
## Project Configuration
---
* To create the *package.json* file use the **npm init** command.

    * **name**: Project name.
    * **version**: Project version.
    * **description**: Brief project description.
    * entry point: The main file (main) of the application.
    * **test command**: If there are unit tests, specify the command to run them.
    * **git repository**: The repository path where the code is located.
    * **keywords**: Project keywords.
    * **author**: Project author and owner.
    * **license**: Specifies a license under which the project will be distributed.

 
* Install TypeScript **npm install typescript**
* Install dependencies such as:

    * express **npm install express**
    * ts-node **npm install ts-node --save-dev**
    * types/express **npm install @types/express**


* Create a default TypeScript configuration file using the **npx tsc --init** command, and then activate the **outDir** option within the file and define the folder containing the main file (index.ts or app.ts).

* To run the project from the main file, use the **npx ts-node src/app.ts** command.

* For migrations, the ORM dependency named **knex** must be installed, where you'll use the **npm install knex knex-cli pg --save-dev** command.

* To read environment variables, install the dotenv library with **npm install dotenv** 

* Data Base route schema: POSTGRES_URI=postgresql://<db_user>:<db_password>@<db_host>:<db_port>/<database>



## Unit Testing

To configure and create unit tests, we need to install Jest library as follows:

**npm install --save-dev jest ts-jest @types/jest**

To initialize Jest and set up the testing environment, use the command **npx jest --init**.

To execute the tests, use the command **npx jest**.