# Documentation 
[Vist Website](https://unicornmedics.com/) 

## Developer Details
 | Name | Portfolio | Contact | 
 | ------------- | ---------------------------------------- | -------------------------------------------------------------- | 
 | Darshil Mehta | [Click Here](https://darshilmehta.me/) | [GitHub](https://github.com/darshilmehta) | 
 | Aditya Nagar | [Click Here](https://adityanagar.vercel.app/) | [GitHub](https://github.com/adityanagar10) |

## Frontend Documentation

> prerequisite
> 1. make sure of have git installed, here is a detailed guide [how to guide on git installation](https://github.com/git-guides/install-git)
> 2. make sure you have node and npm installed, here is a detailed guide [how to guide on node and npm installation ](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
> 3. make sure you have yarn install, here is the command that you can run in your terminal (assuming you fulfil step 2 )  `npm install --global yarn`

#### How to clone the repository
Once you have install git, run the following command in your terminal

    git clone https://github.com/Unicornforortho/unicorn_medics_website.git && cd unicorn_medics_website

#### Running the application locally
-   Add  `.env`  file to the frontend application.
-   Open Terminal and run the command  `yarn install`.
-   Run the command  `yarn prisma migrate dev --name init`.
-   Run the command  `yarn run dev`  to start the project at  [http://localhost:3000/](http://localhost:3000/).
-   Open the browser to use the application

#### Breakdown of the frontend application
The frontend of the entire project finally boils down to 4 main components, namely: pages, components, data, store. 
1.  **Pages (Next.js):** In Next.js, pages are the building blocks of your application. Each page represents a route and is responsible for rendering the corresponding content. Pages in Next.js are typically written in JavaScript or TypeScript and are stored in the `pages` directory.

	With Next.js, you can create dynamic and static pages. Dynamic pages allow you to handle parameters in the URL and fetch data based on those parameters, while static pages are pre-rendered at build time.

	Next.js provides a file-based routing system, where each file in the `pages` directory becomes a route automatically. For example, if you have a file named `about.js` in the `pages` directory, it will create a route `/about` in your application.

	Next.js also supports server-side rendering (SSR) and static site generation (SSG) out of the box, allowing you to optimize the performance and SEO of your application.

2.  **Components (Mantine):** Mantine is a React component library that provides a set of pre-built components and utilities to help you build user interfaces quickly. Mantine components are designed with accessibility, customization, and developer experience in mind.

	Components in Mantine are reusable UI elements that encapsulate functionality and styling. You can import Mantine components into your project and use them to build your frontend. Examples of Mantine components include buttons, modals, forms, and navigation elements.

	Mantine components are highly customizable and often come with props that allow you to modify their appearance and behavior. They also adhere to best practices for accessibility and provide consistent styling, which helps maintain a cohesive design in your application.

3.  **Data (JSON object store locally):** For storing data locally in a JSON object, we are storing them in the codebase itself in the `/data` path. The idea behind this is an change or additions required in the data can be done easily.

4.  **Store (Zustand):** Zustand is a state management library for React that provides a simple and lightweight way to manage state in your application. Zustand is inspired by the Redux pattern but aims to reduce boilerplate and complexity.

	With Zustand, you can define stores that hold your application state. A store is a plain JavaScript object that contains the state and any associated actions or selectors.

	To create a store with Zustand, you typically use the `create` function from the library. This function returns a hook that you can use to access the state and actions defined in the store. Zustand uses a reactive model, so any changes to the state will trigger re-renders in components that are subscribed to that state.

	Zustand also supports middleware, allowing you to extend its functionality with additional features like logging or persistence.

By combining Next.js for pages, Mantine for components, a local JSON object for data storage, and Zustand for state management, you can build a frontend application that provides dynamic routing, reusable and accessible UI components, local data storage, and efficient state management.

#### How to make the minor changes?
To make any change you will have to look at the thing that you need to change, see if it is a component, a page or data change. You can then easily locate the file and make the required changes.

#### How to make major changes?
Major changes can include adding new pages, adding or replacing components, or adding new data. 

- To add new pages you can create a new folder inside `/pages` with the name of the route that you want to give. Inside that folder you can `index.tsx` and you're new route should be up. For more information or an elaborate explanation you can visit [Next Js documentation on pages.](https://nextjs.org/docs/pages/building-your-application/routing)
- To add new components, we use a component library called [Mantine](https://mantine.dev/). You can create new files inside `/components` folder and give it an appropriate name. You can then import this component anywhere you want to use it.
- To add new data in the frontend (to know what kind of data i am talking about please check `/data`. You an create similar files in the folder and export and use or reuse the data.

#### API Documentation for the frontend of the application can be found at :  [Our postman documentation](https://documenter.getpostman.com/view/16629391/2s93CRLBzC) and [NextJS documentation on APIs](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

#### [](https://github.com/Unicornforortho/unicorn_medics_website#note-this-documentation-includes-all-the-apis-required-for-authentication-and-user-activity-with-supabase-database)Note: This documentation includes all the APIs required for Authentication and User Activity with Supabase Database.

##### [](https://github.com/Unicornforortho/unicorn_medics_website#note--this-is-a-documentation-generated-using-postman-documenter)Note : This is a documentation generated using Postman Documenter.


## Backend Documentation

### How to Clone Repository ?
1. Open a terminal or command prompt on your local machine. 
2. Navigate to the directory where you want to clone the repository. 
3. Run the following command to clone the repository: 
`https://github.com/Unicornforortho/unicorn_medics_fastapi_aws.git`

### How to setup the project ?
1. Install python 3.7 or higher on your machine.
2. Run the following command to create the venv
`python3 -m venv venv`
3. Run the following to activate the venv
`source venv/bin/activate`
4. Run the following command to install the dependencies
`pip install -r requirements.txt`
5. Create a folder named models
`mkdir ./models`
6. Add all existing models to this file

### Steps to install WinSCP ?
Advantages of using WinSCP include its user-friendly interface for easy file transfer and management, and support for secure protocols like SFTP and SCP to ensure data encryption and protection during transmission.
1. Go to the WinSCP website at [https://winscp.net/](https://winscp.net/) and navigate to the "Download" section.
2. Depending on your system architecture (32-bit or 64-bit), select the appropriate installation package to download. You will typically find both a setup executable file (.exe) and a portable executable file (.zip).
3. Click on the download link for the installation package you prefer, and save the file to a location on your computer.
4. If you downloaded the setup executable file (.exe), locate the file on your computer and double-click it to run the installation wizard.
5. Read and accept the WinSCP license agreement to proceed with the installation.
6. The installation wizard will present you with various options. You can typically leave the default settings as they are unless you have specific requirements. Click "Next" to continue.
7. Choose the components you want to install. WinSCP usually includes the main program along with optional additional tools like PuTTY. Again, the default selection should be sufficient for most users. Click "Next" to proceed.
8. Choose the folder where you want WinSCP to be installed. You can either accept the default location or specify a different folder. Click "Next" to continue.
9.  Select whether you want to create shortcuts on your desktop and in the Start menu. Make your choice and click "Next.
10. The installer will extract the files and install WinSCP on your computer. Wait for the process to finish.
11. After the installation completes, you can choose to launch WinSCP immediately or close the installer and manually launch it later.
12. When WinSCP starts, you may need to configure it to connect to your desired server. Enter the server address, username, password, and any other required details to establish a connection.

### How to use WinSCP to connect to our AWS EC2 instance ?
1. Connect to the instance via the following elastic IP
`54.160.109.153`
2. Authorize the IP using advanced > authentication > private file key.
3. Select the .ppk or .pem file to authorize and access the instance

### How to make changes to the API ?
URL: http://localhost:8000/predict/
Payload Parameters:
- file `DataType = File`
- modelName `DataType = string`

### How to create certificates ?
1. Generate new SSL certificates from any trustworthy website link Namecheap, GoDaddy, FreeSSL, etc.
2. Generate the certificates and download the zip file
3. Unzip and receive 3 files
4. Of these three files, the `.key` and `.crt` files are important.
5. Use WinSCP to upload these files to the following directory on AWS EC2 instance. (`/etc/nginx/ssl`)

### How to push changes to AWS EC2 ?
1. Login to AWS console using the credentials.
2. Open the terminal using SSH or using EC2 instance connect (recommended).
3. Use the command `ps -aux` to get the list of processes.
4. Note the PID for the ongoing nohup process that runs the `uvicorn main:app` command.
5. Use `kill PID` command to kill the process.
6. Now, pull the updated files from github with new models
7. Run the following command to rerun the API service over cloud:
`nohup python3 -m uvicorn main:app --host 0.0.0.0 --port 8000`

Note: Incase, the SSL certificates expire, use `openssl` to create new self-signed certificates (incase paid certificates / official cited CA certificates are not available) and add them to the `nginx.conf` file located at `/etc/nginx/` from the root directory.

Following command is to be replaced with server block in `nginx.conf`:
```
server {
	listen 80;
    listen 443 ssl;
    ssl_certificate /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;
    server_name 54.160.109.153;
    location / {
        proxy_pass http://127.0.0.1:8000;
    }
}
```  
Following code can be used to create self-signed SSL certificates:
```
sudo openssl req -batch -x509 -nodes -days 365 \
-newkey rsa:2048 \
-keyout /etc/nginx/ssl/server.key \
-out /etc/nginx/ssl/server.crt
```

## File Naming Convention  
- Files and Folders: `kebab-case`  
- Components: `LetterCase`  
- Variables and Functions: `camelCase`  

## Commit Semantics 
Please use consistent commit message semantics. Avoid using tenses. For example, use "add" instead of "adding" or "added". 

### Example
`feat: add hat wobble`

``Please use any of the following:

- `feat`: New feature for the user, not a new feature for a build script.
- `fix`: Bug fix for the user, not a fix to a build script.
- `docs`: Changes to the documentation.
- `style`: Formatting, missing semicolons, etc., with no production code change.
- `refactor`: Refactoring production code, e.g., renaming a variable.
- `test`: Adding missing tests, refactoring tests, with no production code change.
- `chore`: Updating grunt tasks, etc., with no production code change.

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages)
- [Git Commit Message Guidelines](http://karma-runner.github.io/1.0/dev/git-commit-msg.html)
