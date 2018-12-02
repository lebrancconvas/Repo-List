Vue.component('repo-list', {
    props: [ 'repo' ],
    template: `<li><a :href="repo.html_url">{{repo.name}}</a></li>`
})

var app = new Vue({
    el: "#app",
    data: {
        loading: false,
        repos : [ ],
        username: "lebrancconvas"
    },
    methods: {
        usernameChange(event) {
            this.username = event.target.value
        }
    },
    async created() {
        this.username = ''
        this.loading = true
        try {
            const repos = await fetch(`https://api.github.com/users/lebrancconvas/repos`)
                .then(x => x.json())
            this.repos = repos
        } finally {
            this.loading = false
        }
    }
})

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loading: false,
        username: '',
        repos: [ ]
    },
    mutations: {
        startLoading(state,{ username }) {
            state.username = username
            state.loading = true
        },
        finishLoading(state,{ repos }) {
            state.repos = [ ]
        }
    },
    actions: {
        async load(context, { username }) {
            context.commit('startLoading', { username })
            const repos = await fetch(`https://api.github.com/users/dtinth/repos`)
                .then(r => r.json())
            context.commit('finishLoading', { repos })
        }
    }
})