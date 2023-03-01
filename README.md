# Documentation

## Developer Details
| Name | Portfolio | Contact |
|--------------|:-----:|:------:|
| Darshil Mehta | [Click Here](https://darshilmehta.me/) | [GitHub](https://github.com/darshilmehta), [LinkedIn](https://www.linkedin.com/in/darshil-mehta-05/) |
| Aditya Nagar | [Click Here](https://adityanagar.vercel.app/) | [GitHub](https://github.com/adityanagar10/), [LinkedIn](https://www.linkedin.com/in/adityanagar10/) |

## Frontend Documentation
Documentation of the frontend application is provided within the code itself. All the functions and files are documented with the functionality they provide.

## API Documentation
### [Postman Documentation](https://documenter.getpostman.com/view/16629391/2s93CRLBzC) 
### FAST API Documentation
URL: http://localhost:8000/predict/
Payload Parameters: 
- file `DataType = File`
- modelName `DataType = string` 

## Getting Started
### Follow the steps to get started with the frontend application:
- Clone this repository.
- Add `.env` file to the frontend application.
- Open Terminal and run the command `yarn install`.
- Run the command `yarn prisma migrate dev --name init`.
- Run the command `yarn run dev` to start the project at http://localhost:3000/.
- Open the browser to use the application,

### Follow the steps to get started with the Fast API application:
- Clone the `ml_fastapi` repository.
- Add `.env` file to the fast API application.
- Open terminal and run the command `python pip install -r requirements.txt`.
- Run the command `python -m uvicorn main:app --reload` to run the project at http://localhost:8000/.
- Refer Fast API application docs at http://localhost:8000/docs.

## File naming convention
- Files and Folders : `kebab-case`
- Components : `LetterCase`
- Variables and Functions : `camelCase`

## Commit Semantics
Please use a consistent commit message semantics
DO NOT use tenses. for example use add and not adding or added
### For example
`feat: add hat wobble`
#### Please use any of the below
- `feat` : (new feature for the user, not a new feature for build script)
- `fix` : (bug fix for the user, not a fix to a build script)
- `docs` : (changes to the documentation)
- `style` : (formatting, missing semi colons, etc; no production code change)
- `refactor` : (refactoring production code, eg. renaming a variable)
- `test` : (adding missing tests, refactoring tests; no production code change)
- `chore` : (updating grunt tasks etc; no production code change)

## References
https://www.conventionalcommits.org/

https://seesparkbox.com/foundry/semantic_commit_messages

http://karma-runner.github.io/1.0/dev/git-commit-msg.html
