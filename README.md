# J.A.M.E.S Chrome Extension with IRIS search for Interactive and Responsive Video

* includes chrome esxtension skeleton's awesome messaging module
* webpack-based build system
* full ES6 support with Babel 6
* linting using eslint with airbnb configuration
* use node.js libraries
* unit-tests in mocha
* CircleCI friendly

### Installation:

    # in case you don't have webpack yet:
    sudo npm install -g webpack

    * [Webpack](https://www.npmjs.com/package/webpack).

    # in case you don't have yarn yet:
    sudo npm install -g yarn

### Build instructions:

To install dependencies:

    cd chrome-extension-skeleton
    npm install

Then to start a developing session (with watch), run:

    npm start

To start a unit testing session (with watch):

    npm test

To check code for linting errors:

    npm run lint


To build production code + crx:

    npm run build

To run unit tests in CI scripts:

    npm run test:ci

### Directory structure:

    /build             # this is where your extension (.crx) will end up,
                       # along with unpacked directories of production and
                       # develop build (for debugging)

    /src
        /css           # CSS files
        /html          # HTML files
        /images        # image resources

        /js            # entry-points for browserify, requiring node.js `modules`

            /libs      # 3rd party run-time libraries, excluded from JS-linting
            /modules   # node.js modules (and corresponding mocha
                       #   unit tests spec files)

        manifest.json  # skeleton manifest file, `name`, `description`
                       #   and `version` fields copied from `package.json`       

    /webpack           # webpack configuration files

    .babelrc           # Babel configuration
    .eslintrc          # options for JS-linting
    circle.yml         # integration with CircleCI
    mykey.pem          # certificate file, YOU NEED TO GENERATE THIS FILE, see below
    package.json       # project description file (name, version, dependencies, ...)


### After you clone:

1. In `package.json`, rename the project, description, version, add dependencies
and any other fields necessary.

2. Generate your .pem key and store it in the root as `mykey.pem` file. On
unix / mac, the command to generate the file is
`openssl genrsa 2048 | openssl pkcs8 -topk8 -nocrypt > mykey.pem`.
Note: the generated file is in `.gitignore` file, it won't be (and should NOT
be) commited to the repository unless you know what you are doing.

3. Add content (HTML, CSS, images, JS modules), update `code/manifest.json`,
leave only JS entry-points you use (remove the ones you don't need).

4. When developing, write unit-tests, use `npm test` to check that
your code passes unit-tests and `npm run lint` to check for linting errors.

5. When ready to try out the extension in the browser, use `npm start` to
build it. In `build` directory you'll find develop version of the extension in
`dev` subdirectory (with source maps), and production (uglified)
version in `prod` directory. The `.crx` packed version is created from
`prod` sources.

6. When done developing, publish the extension and enjoy it (profit!).

Use any 3rd party libraries you need (both for run-time and for development /
testing), use regular npm node.js modules (that will be installed into
`node_modules` directory). These libraries will be encapsulated in the resulting
code and will NOT conflict even with libraries on pages where you inject the
resulting JS scripts to (for content scripts).

For more information, please check also README.md files in subdirectories.

### Under the hood:

If you want to understand better the structure of the code and how it really
works, please check the following sources (note: these resources are out of date, with respect to the build system and ES6):

* [blog post on messaging system](https://blog.javascripting.com/2014/08/11/the-chrome-extension-skeleton-messaging-system/),
* or this [overall prezi](http://prezi.com/yxj7zs7ixlmw/chrome-extension-skeleton/).

## Inspiration
You are watching a Crash-course or Khan Academy video with a lot of complex interdependent concepts. Quickly you become confused and you would like to ask a teacher or tutor about the concept.
## What it does
IR-Video uses Google's speech API and api.ai NLP machine learning libraries to analyze captions in YouTube videos for their actual content.
  Speakeasy
  IBM Watson

When the user submits a video for processing, IR-Video gets the captions.

Finally, the web app allows you to ask a context-based question. it uses the google speech to take the question and then the video is also parsed and timestamped, so the words can also be indexed. then the web app answers your question by taking you to the exact moment in the video with the answer.

## Dev Notes:


Simple chrome extension that allows you to ask questions about video content in context and answers you with video progress manipulation creating an ilusion of interaction. 

Architecture High Level

Functions:
1. Process the captions to get the timestamp of the answer

2. Manipulation the dynamic link based on results 

3. Speech recognition question asking.

video link: 
https://www.youtube.com/watch?v=sQK3Yr4Sc_k

https://www.youtube.com/watch?v=-rsYk4eCKnA

API structure

use spacy for question processing. Spacy finds the subject of the question then returns the subject noun. which is used in my James.js to find the answer to the question.


###Operator:

all the methods of operation should be defined in the JAMES class, The operator
is resposible for creating and instance of JAMES class object and using those 
methods to find the answers using the JAMES class methods.

##J.A.M.E.S JS Library-Overview
Create A JAMES Library that contains all the methods needed to run james on any third party application or framework like google drive. the library will then allow me to develop future guis with the same functionalities needed.

##Future feature to impliment in the library
Give JAMES google keep extentsion ability to show medium articles with explanations to hard concepts. 

## Developers Notes 
Notes of my though process and steps toward creating J.A.M.E.S
1. Finish J.A.M.E.S Library