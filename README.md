# pah-fm

[Fleet Manager](https://en.wikipedia.org/wiki/Fleet_management) 
for [Polish Humanitarian Action](https://www.pah.org.pl).

[![Join Slack](https://img.shields.io/badge/slack-join%20chat-4a154b)](https://join.slack.com/t/codeforpoznan/shared_invite/enQtNjQ5MTU1MDI0NDA0LWNhYTA3NGQ0MmQ5ODgxODE3ODJlZjc3NWE0NTMzZjhmNDBkN2QwMzNhYWY5OWQ5MGE2OGM3NjAyODBlY2VjNjU)


<br>

### General Overview of the Project

This project is used by logisticians assigned to particular humanitarian 
missions associated with PAH, by local drivers willing to support the 
mission and by passengers helping around the world.

Its purpose is to provide a simple, robust and mobile-first web 
application that supports submitting drives taken by drivers and 
cryptographically verifying their authenticity with passengers without 
the need for internet connection.
Submitted and verified drives are automatically sent back to database 
when network connection is reestablished (eg. near WiFi Hot-Spot).  

Drives can also be inspected in detail and corrected by 
administrators in the admin panel. The admin panel also allows admins to
export records in many popular file formats supported by any spreadsheet software.


<br>

### Sounds Great! How Can I Help?

If you're familiar with GitHub Flow and Django & React.js then 
you're most likely ready to pick something from the backlog.
Use the following filters to find some interesting work:


<br>

##### [Simple, Good For Beginners, Ready-To-Go Issues](https://github.com/CodeForPoznan/pah-fm/issues?q=is:open+label:ready+-linked:pr+no:assignee+label:good-first-issue+)

##### [Bit More Difficult, Ready-To-Go Issues](https://github.com/CodeForPoznan/pah-fm/issues?q=is:open+label:ready+-linked:pr+no:assignee)

##### [Frontend Only, Ready-To-Go Issues](https://github.com/CodeForPoznan/pah-fm/issues?q=is:open+label:ready+-linked:pr+no:assignee+label:frontend)

##### [Backend Only, Ready-To-Go Issues](https://github.com/CodeForPoznan/pah-fm/issues?q=is:open+label:ready+-linked:pr+no:assignee+label:backend)

##### [Bugs Only, Ready-To-Go Issues](https://github.com/CodeForPoznan/pah-fm/issues?q=is:open+label:ready+-linked:pr+no:assignee+label:bug)

##### [Not Yet Reviewed Pull Requests](https://github.com/CodeForPoznan/pah-fm/pulls?q=is:pr+is:open+review:required)


<br>

### More Technical Overview

The project is built using modern technologies and common 
web application patterns. We're trying to avoid any custom logic
or homegrown solutions to already solved problems by using well
tested and popular libraries/tools - Django & React.js.

Application is split between two main directories - backend and frontend.

- backend  
  - `main purpose:` REST API for frontend code
  - `runtime:` Python 3.11
  - `framework:` Django
  
- frontend
  - `main purpose:` Interactive interface for application
  - `runtime:` Node 16
  - `framework:` React.js


<br>

### How to Work on the Project Locally?

You'll need [docker](https://docs.docker.com/desktop/) and 
[docker-compose](https://docs.docker.com/compose/install/) 
installed on your computer in order to set up the project.  
You will also need `git`, `make` and a decent code editor.

1. Get the source code. If you intend to send a Pull Request then
please follow [Github Flow](https://githubflow.github.io/).

```shell script
# A) get the code:
git clone git@github.com:CodeForPoznan/pah-fm.git

# B) if you intend to send a patch then clone your fork:
git clone git@github.com:<your github username>/pah-fm.git

# (example for above)
git clone git@github.com:arturtamborski/pah-fm.git
```


2. Go to project directory:

```shell script
cd pah-fm
```


3. Start the project  

```shell script
# This command will download Docker images and set up the application.
make start
```


4. Generate some random data for testing

```shell script
make populate-database
```


5. Open up [http://localhost:8000/](http://localhost:8000/) and use 
the app!

There's also admin page at [http://localhost:8000/admin/](http://localhost:8000/admin/),
and a few other interesting links. 


At this point you should be able to:
- log in as driver or passenger on [http://localhost:8090](http://localhost:8090),
- submit a drive,
- optionally verify it,
- view your previous drives,
- change language, 
- manage drives from admin panel 
- export database to common data formats such as CSV.


<br>

### How to Debug the Project or Start Working on Pull Request?

First, get familiar with project's handy toolset - `make`!
We wrapped many common actions in a `Makefile`.
You can view them all by running `make help` or just `make`.  
Here's an example of the output:

```shell
pah-fm$ make

Usage:
  make <target>

Targets:
               help   Display this help
              start   Start all containers in background
               stop   Stop all containers
              build   Build backend & frontend containers
              clean   Clean all caches
               logs   Attach to logs
               lint   Run linters
               test   Run tests
             manage   Use manage.py, i.e make manage populate_database
     build-frontend   Build frontend container
      build-backend   Build backend container
      lint-frontend   Run linters on frontend container
       lint-backend   Run linters on backend container
      test-frontend   Run tests on frontend container
       test-backend   Run tests on backend container
      bash-frontend   Enter frontend container
       bash-backend   Enter backend container
      debug-backend   Debug backend container (Django)
  populate-database   Populate database with test data

   not sure which one to pick? check out README.md
🟢 project is running, head out to http://localhost:8000/
```

As you can see, there are quite a lot of useful commands here.
I advise you to read and get familiar with at least some 
of them from the top so you can work on the project more easily.

Here's a handy list with some problems and solutions based on above 
commands that you might want to use when developing locally:

`Q:` How to start or stop the project?  
`A:` `make start` or `make stop`

`Q:` How to view logs from all containers?  
`A:` `make logs`

`Q:` My Pull Request build failed due to lint errors, how can I fix it?  
`A:` `make lint` and `git add . && git commit && git push`

`Q:` How to generate some random data for testing?  
`A:` `make populate-database`.

`Q:` How to debug backend with PDB?  
`A:` Place `import pdb; pdb.set_trace()` in code, save the file, 
run `make debug-backend` and interact with page to hit your breakpoint.
After debugging detach from shell by pressing `CTRL + P` and `CTRL + Q`.

`Q:` How to debug frontend with Chrome?  
`A:` Place `debugger;` in code, save the file, wait a second or two 
until frontend rebuilds itself (you can check it with `make logs`), 
refresh page in browser, open developer tools (`CTRL + F12`) and interact 
with the page to hit a breakpoint.


If you have any more questions not described here then please ask us
 on [Slack](https://codeforpoznan.slack.com) (channel name is`#projekt_pah`).


<br>

#### Initial admin credentials
We have a default user who is always present - `hello@codeforpoznan.pl`,
but you can generate a few more by running `make populate-database`.
This command will create `driver@codeforpoznan.pl` and `passenger@codeforpoznan.pl` 
and also few other random users and basic entities (Cars, Projects).
Every user that's randomly created has the same password -`pass123`.

Please note that only `hello@codeforpoznan.pl` can access the Django admin panel.

Here's a table with basic users + the default users created when DB is populated:

username                         | password  | App access | Django Admin access |
-------------------------------- | --------- | -----------| ------------------- |
`hello@codeforpoznan.pl`         | `pass123` | no         | yes                 |
...after `populate-database`...  | ...       | ...        | ...                 |
`driver@codeforpoznan.pl`        | `pass123` | yes        | no                  |
`passenger@codeforpoznan.pl`     | `pass123` | yes        | no                  |
`<some random text>@example.com` | `pass123` | yes        | no                  |


<br>

#### API Documentation

REST API is built with Django Rest Framework. That package has also
autogenerated interactive documentation for its endpoints.
You can take a look by going to
[localhost:8000/api/docs/](http://localhost:8000/api/docs/) or
[dev.pahfm.codeforpoznan.pl/api/docs/](https://dev.pahfm.codeforpoznan.pl/api/docs/).

> **Note**
> documentation is available only to logged-in users because of
> a DjangoRestFramework quirk, so be sure to log in to Admin panel beforehand.


<br>

#### Support for Auto-Completion via Python Environments

In general, everything should work out of the box after the first `make start`.
The command sets up a local `.venv` and `node_modules` dirs in correct places,
so the editors should be able to pick it up automatically and use it for autocompletion.

However, the way it's supposed to be configured varies wildly between editors and 
toolchains so it may broken for you.

If your editor does not support hooking up to Docker containers for 
python environments then you'll probably have to create python 
virtual environment yourself in order to have auto completion features.

> **Note**
> Try finding documentation on configuring python environment
> for your particular editor, or use the links below:  
> [instructions for VS Code](https://code.visualstudio.com/docs/python/environments).  
> [instructions for PyCharm](https://www.jetbrains.com/help/pycharm/creating-virtual-environment.html)  
> [instructions for Sublime Text](http://technologist.pro/development/using-python-virtual-environments-with-sublime-text)  


<details>
<summary>In case you need to set it up manually, here's how to do it:</summary>

```shell script
python3 -m pip install pipenv    # one time only
export PIPENV_VENV_IN_PROJECT=1  # save it to ~/.bashrc

cd pah-fm/backend
pipenv install
```

This will create brand new environment safely separated from your 
system libraries where all project dependencies are installed
(more precisely here: `backend/.venv/lib/python3.X/site-packages`).
You can use them to check what is available in sources, 
and add it to your IDE for module resolution / auto completion.

</details>


<br>

#### Development Version of PAH-FM

Application is deployed via CI/CD scripts and AWS Lambda Function to
[dev.pahfm.codeforpoznan.pl](https://dev.pahfm.codeforpoznan.pl/).

It's built and deployed after every successful merge 
to master branch. New Django migrations are also applied 
automatically after a successful deployment.
You can log in there and test the application but you'll 
need to ask for a new account first on 
[Slack](https://codeforpoznan.slack.com) (channel name is`#pah`).


<br>

#### Detailed Description of the Backend

Backend code is a classic Django project with one app 
called `fleet_management` - that's the core of backend code.


##### Endpoints

Backend exposes two URLs:

- `/admin/` - Django Admin Panel
- `/api/docs/` - Interactive API docs

and a few RESTful endpoints: [https://dev.pahfm.codeforpoznan.pl/api/docs](https://dev.pahfm.codeforpoznan.pl/api/docs).

These endpoints are created and managed with the help of Django Rest Framework and are tested by unit tests.


##### Models

These endpoins basically wrap corresponding models defined in 
[models.py](backend/fleet_management/models.py).

- `User`  
This model represents admins, drivers and passengers.  
We use groups to differentiate between these user roles.
User can belong to Driver group, Passenger group or 
(in rare cases) both.
User model has username and email but they are
considered the same for our use.  
We also store country, date of last request for user
activity tracking and three fields used for drive
signing and verification. User with empty country 
field becomes a global user and is visible for 
selection in every country.

- `Drive`  
A record representing Driver's completed 
journey with Passenger from one place to another.  
The Drive records are created by filling data in
`DriveFormView.vue` and then sending it to `/api/drives/`.
Web form enforces some constraints on the Driver.
One needs to select an existing entity from other
models (`Car`, `Passenger`, `Project`) and type in 
some details about the drive itself, such as 
start & end location and reading from odometer.  
Data from this model is also made available for export
in admin panel for later inspection or settlements.

- `Project`  
Representation of a Project under which the Drive 
takes place. We store title, description and country, 
all of which are required fields.

- `Car`  
Representation of a Driver's Car used during a Drive.
We're storing it's car plates, some short description,
fuel consumption in liters and country (current location).
Only car plates and country are required.


##### Drive Verification

Every User has three fields used for classic 
RSA message verification - `e`, `d` and `modulus n`.
Our message is a string containing serialized
comma-separated values from the DriveForm.

Drive signing takes place on frontend and later on
is done again on backend to compare outputs and verify it.

Here's a list of steps that happen during a drive verification:

1. Drive Form is filled with valid data by the Driver
2. Driver submits the form
3. DriveVerifyView takes these values and joins them together
creating a checksum (message).
4. Checksum is displayed on form
5. Driver communicates the Checksum to the Passenger  
6. Passenger inputs the Checksum into his own form on his phone
7. Passenger clicks the button to sign the Message with his RSA keys
8. Passenger's RSA private key is used for signing the Message
9. Signed message is shown back on Passenger's phone
10. Passenger communicates back the Signature (signed message) to the Driver  
11. Driver types in the Signature into his form
12. Driver submits the form  
13. Endpoint receives the data, checks for Signature
14. Backend uses selected Passenger's RSA keypair and signs
the form again
15. Backend compares the local signature with the sent one
16. Backend decides whether or not the signature is equal thus valid 
and sets appropriate flag
17. Backend completes saving the new Drive.


Everything before 13th point happens with no use of internet connection.
The process can continue from 13th point when connection is established
in some undefined time from when the form was submitted.

This process can also be started again after executing 13th point
with no affect on any previous drive. This allows the user to be offline
virtually for how long he pleases to be, or until he finally decides to 
synchronize his Drives back with backend.


<br>

#### Detailed Description of the Fronted

Again, it's a classic example of React.js's directory layout.
We're trying to optimize the app for size due to 
the business requirements and reality of use cases.

The app can be installed on any mobile phone in the form
of a PWA (Progressive Web App) which behaves like a real
app but in reality is just a dedicated browser window.

Not until recently the frontend code became complex enough
that we started to write unit tests for some components,
though there's still a lot to improve.

Everything that can be seen is presented on several views:

- `HomeView`  
Home page.
Visible to everyone, even if not logged in.

- `LoginView`  
Login form.
Visible only to not logged in users.

- `SuccessFullLogoutView`
Shows simple information upon logout.
Visible only to logged in users.

- `PassengerSubmitView`  
Checksum form.
Visible only to the Passenger.

- `DriveFormView`  
Shows the main form for submitting Drives.  
Visible only to the Driver.

- `DrivesView`  
Shows the list of submitted Drives (including synchronized and not).
Visible only to the Driver.

- `DriveVerifyView`  
Form used for next stage of Drive submission, lets us type in 
the Passenger's checksum.  
Visible only to the Driver.

- `DriveVerifyView`  
Form used for next stage of Drive submission, lets us type in 
the Passenger's checksum.  
Visible only to the Driver.


<br>

#### Detailed Description of the Devops/Infra things

Live instance of this application is running on dedicated server,
[here](https://pahfm.codeforpoznan.pl/)
Staging environment is running on AWS Lambda service 
[here](https://dev.pahfm.codeforpoznan.pl).

Local environment is set up using docker and docker-compose.


> **Note**
> If you have any more questions / comments or if some parts of this 
> applications are still difficult to understand then please ask us
> on [Slack](https://codeforpoznan.slack.com) (channel name is`#projekt_pah`).
