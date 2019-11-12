# Project - To Do App
- Using VueJs in order to build To to list.

- Submitted by: Hoa Nguyen
- Time spent: 28 Hours

## Usage
### Step 1 : Install and Update script using wget
`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash`

### Step 2 : Install node
`nvm install node`


### Step 3 : Install serve
`npm install serve`

### Step 4 : Install Node-Sass
`npm install node-sass` 

### Step 5 : Set up information about project name, version, ... and create package.json
`npm init`

### Step 6 : Install Babel
`npm install -D babel-cli`

### Step 7 : Install env preset and create .babelrc file
- `npm install -D babel-preset-env`
- Create your `.babelrc` file:
    - `touch .babelrc`
- And write the following:
    - `{"presets": ["env"]}`

### Step 8 : Change package.json
- Open folder package.json add under line "test":
    - `"scss": "node-sass scss -o css",`
    - `"scss:watch": "npm run css && node-sass scss -wo css",`
    - `"build": "babel src -d build",`
    - `"start": "serve"`

### Step 9 : Run the Script: 
`npm run scss`

### Step 10 : Run the Babel command
`npm run build`

### Step 11 : Run Project
`npm start` 


# User Stories
- Click Add Project to add a project
- Choose a name and color for the project
- Click Button `+` at top right of Website to add a task
- Choose a name and project for the task, then Save
- Click a checkbox when task is completed

## Preview how it work

![GridStackWraper!](https://github.com/hoanguyen1203/prime-ex-fe-006/blob/master/todolist.gif)


# License
Copyright [2019] [HoaNguyen] Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

