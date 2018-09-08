# Requirements

## Non Functional Requirements
 - Terrace: People can see things that I would like to show them
 - Like a portal. (Github link, blog link, email link, etc..)
 - Business card
 - Resume
 - Blog
 - Mail server
 - Language selection (Korean, english)

## Functional Requirements

 - DevOps environment
   - Auto deployment system.
     - Jenkins? git hooks?
   - Auto start the web server when the server computer reboots
   - Auto restart after a crash of web server
 - Backend
   - Develop my own server with golang. Do not use any web package except the package golang supports. 
   - Support SSL
 - Frontend
   - Single Page App
   - VueJS
   - PureCSS
   - Learn tools for frontend developement
     - *We went from plain HTML and JS to using a package manager to automatically download 3rd party packages, a module bundler to create a single script file, a transpiler to use future JavaScript features, and a task runner to automate different parts of the build process. - [Modern JavaScript Explained For Dinosaurs](https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70)*
     - Webpack(module bundler), babel(transpiler), npm scripts (task runner)
