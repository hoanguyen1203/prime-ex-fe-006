var app = new Vue({
    el: '#app',
    data: {
        down: true,
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
        projects: [
            {
                name: 'To do list article',
                color: '#90EE90',
                number: 0
            },
            {
                name: 'House Keeping',
                color: '#FFB6C1',
                number: 0
            }
        ],
        newTask: '',
        selected: {},
        completed: false,
        tasks: []
    },
    methods: {
        toggleRotate: function() {
            if(this.down === true) {
                this.down = false
            } else {
                this.down = true
            }
        },
        addProject: function() {
            if(this.newProject !== null) {
                this.projects.push({
                    name: this.newProject,
                    color: this.newProjectColor,
                    number: 0
                })
            }
            this.newProject = '',
            this.newProjectColor = '#000000'
        },
        addTask: function() {
            if(this.newTask !== null) {
                this.tasks.push({
                    name: this.newTask,
                    selected: {
                        name: this.selected.name,
                        color: this.selected.color,
                        number: this.selected.number
                    },
                    completed: false
                })
                this.selected.number++
            }
            this.newTask = ''
            this.selected = {}
        }
    }
})
