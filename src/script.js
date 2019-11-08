var data = {
    today: new Date(),
    days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    down: false,
    accountName: 'Justin Pot',
    projectTitle: 'Projects',
    projectAddTitle: 'Add Project',
    taskAddTitle: 'Add Task',
    labels: [
        {
            name: 'Inbox',
            icon: 'fa fa-inbox',
            number: null
        },
        {
            name: 'Today',
            icon: 'fa fa-calendar-o',
            number: 4
        },
        {
            name: 'Next 7 Days',
            icon: 'fa fa-calendar',
            number: 5
        }
    ],
    newProject: '',
    newProjectColor: '#000000',
    projects: JSON.parse(localStorage.getItem('projects') || '[]'),
    newTask: '',
    selected: {},
    checked: [],
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    id: 0
}

Vue.component('header-component', {
    data: function () {
        return data
    },
    template: `<header class="header">
                    <div class="header__left">
                        <button class="header__button"><i class="fa fa-bars" aria-hidden="true"></i></button>
                        <button class="header__button"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </div>
                    <div class="header__right">
                        <h1 class="header__title">Next 7 Days</h1>
                        <button class="header__add-task" data-toggle="modal" data-target="#modalAddTask">
                            <i class="material-icons">add</i>
                        </button>
                    </div>
                </header>`
})

Vue.component('sidebar-account', {
    data: function () {
        return data
    },
    template: `<div class="sidebar__account">
                    <div class="sidebar__avatar">
                        <img src="/images/avatar.jpeg" alt="Avatar">
                    </div>
                    <div class="sidebar__name-account">
                        {{ accountName }}
                    </div>
                </div>`
})

Vue.component('sidebar-labels', {
    data: function () {
        return data
    },
    template: `<div class="sidebar__labels">
                    <div class="label" v-for="label in labels">
                        <div class="label__title">
                            <div class="label__icon"><i v-bind:class="label.icon"></i></div>
                            <div class="label__name">{{ label.name }}</div>
                        </div>
                        <div class="label__number">{{ label.number }}</div>
                    </div>
                </div>`
})

Vue.component('project-component', {
    data: function () {
        return data
    },
    template: `<div class="project" v-for="project in projects">
                    <div class="project__title">
                        <div class="project__icon" v-bind:style="{ 'background-color': project.color }"></div>
                        <div class="project__name">{{ project.name }}</div>
                    </div>
                    <div class="project__number">{{ project.number }}</div>
                </div>`
})

Vue.component('sidebar-projects', {
    data: function () {
        return data
    },
    methods: {
        toggleRotate: function () {
            if (this.down === true) {
                this.down = false
            } else {
                this.down = true
            }
        }
    },
    template: `<div class="sidebar__projects">
                    <div class="project">
                        <h2>{{ projectTitle }}</h2>
                        <button :class="{ 'rotate-180': down }" href="#show-projects" data-toggle="collapse"
                            @click="toggleRotate"><i class="fa fa-angle-up"></i></button>
                    </div>
                    <div id="show-projects" class="projects collapse in">
                        <project-component></project-component>

                        <button class="project__add" data-toggle="modal" data-target="#modalAddProject">
                            <i class="material-icons">add</i>
                            {{ projectAddTitle }}
                        </button>
                    </div>
                </div>`
})

Vue.component('sidebar-component', {
    data: function () {
        return data
    },
    template: `<aside class="sidebar">
                    <sidebar-account></sidebar-account>
                    <sidebar-labels></sidebar-labels>
                    <sidebar-projects></sidebar-projects>
                </aside>`
})

Vue.component('modal-add-project-component', {
    data: function () {
        return data
    },
    methods: {
        addProject: function () {
            if (this.newProject !== null) {
                this.projects.push({
                    name: this.newProject,
                    color: this.newProjectColor,
                    number: 0
                })
            }
            this.newProject = ''
            this.newProjectColor = '#000000'
            this.saveProjects()
        },
        saveProjects: function () {
            localStorage.setItem('projects', JSON.stringify(this.projects))
        }
    },
    template: `<div id="modalAddProject" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">{{ projectAddTitle }}</h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="newProject" placeholder="New Project">
                                </div>
                                <div class="form-group">
                                    <input type="color" name="choise-color" class="form-control" v-model="newProjectColor">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click="addProject">Save</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>`
})

Vue.component('modal-add-task-component', {
    data: function () {
        return data
    },
    methods: {
        addTask: function () {
            if (this.newTask !== null) {
                this.selected.number++
                this.tasks.push({
                    id: this.id,
                    name: this.newTask,
                    selected: {
                        name: this.selected.name,
                        color: this.selected.color,
                        number: this.selected.number
                    },
                    completed: false
                })
                this.id++

                // Update Project Number under LocalStorage
                let projects = JSON.parse(localStorage.projects)
                for (let i = 0; i < projects.length; i++) {
                    if(this.selected.name === projects[i].name){
                        projects[i].number = this.selected.number
                    }
                }
                localStorage.setItem("projects", JSON.stringify(projects))
            }
            this.newTask = ''
            this.selected = {}
            this.saveTasks()
        },
        saveTasks: function () {
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        }
    },
    template: `<div id="modalAddTask" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">{{ taskAddTitle }}</h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="newTask" placeholder="New Task">
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="selected">
                                        <option v-for="project in projects" v-bind:value="project">{{ project.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click="addTask">Save</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>`
})

Vue.component('content-header', {
    data: function () {
        return data
    },
    template: `<div class="content__header">
                    <div class="content__time">{{ days[today.getDay()] }}</div>
                    <div class="content__day">{{ months[today.getMonth()] + " " + today.getDate() }}</div>
                </div>`
})

Vue.component('task-component', {
    data: function () {
        return data
    },
    methods: {
        toggleChecked: function (task) {
            task.completed = !task.completed

            let tasks = JSON.parse(localStorage.tasks)
            for (let i = 0; i < tasks.length; i++) {
                if(tasks[i].id === task.id) {
                    tasks[i].completed = task.completed
                }
            }

            localStorage.setItem("tasks", JSON.stringify(tasks))
        }
    },
    template: `<div class="content__body" v-for="task in tasks">
                    <div v-bind:class="{ content__task: true, task: true, completed: task.completed }">
                        <div class="task__header">
<!--                            <input type="checkbox" v-model="checked" v-bind:value="task.completed" @change="toggleChecked" class="task__checkbox">-->
                            <input type="checkbox" v-model="task.completed" v-bind:value="task.id" @click="toggleChecked(task)" class="task__checkbox">  
                            <span class="task__name">{{ task.name }}</span>
                        </div>
                        <div class="project">
                            <div class="project__name">{{ task.selected.name }}</div>
                            <div class="project__icon" v-bind:style="{ 'background-color': task.selected.color }"></div>
                        </div>
                    </div>
                </div>`
})

Vue.component('content-component', {
    data: function () {
        return data
    },
    template: `<div class="content">
                    <content-header></content-header>
                    <task-component></task-component>
                </div>`
})

new Vue({
    el: '#app'
})

// localStorage.clear()