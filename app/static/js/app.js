/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
           <li class="nav-item active">
            <router-link class="nav-link" to="/upload">Upload</router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});


Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const Upload = Vue.component('upload-form', {
    template: `
    <div>
        <form @submit.prevent="uploadPhoto" id="uploadForm"  method="POST" enctype="multipart/form-data" >
            <div v-if="flashMessage">
                <div v-if="error" class="alert alert-danger">
                    <li v-for="msg in message">{{ msg }}</li>
                </div>
            <div v-else class="alert alert-success" v-for="msg in message" v-text="msg"></div>
    </div>
            <h1>Upload Form</h1>
            <label>Description:</label><br>
            <div class="form-group">
                <textarea class="form-control" name = "description"></textarea><br>
            </div>
            <label>Photo Upload</label><br/>
            <input id="photo" type="file" name='photo'/><br> <br>
            <button @click="flashMessage = true" type="submit" name="submit" class="btn btn-primary">Submit</button> 
       </form>
       <br> 
    </div>
    `,
    methods: {
        uploadPhoto: function(){
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);
            let prop = "";
            let self = this;
            self.message = []
            
            fetch("/api/upload", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            }).then(function(response){
                return response.json();
            }).then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                for (res in jsonResponse) {
                    prop = res;
                }
                if (prop == "errors") {
                    self.error = true;
                    for (msg in jsonResponse.errors) {
                        self.message.push(jsonResponse.errors[msg]["message"]);
                    }
                } else {
                    self.error = false;
                    self.message.push(jsonResponse['message']);
                }
             })
             .catch(function (error) {
                console.log(error);
    });
        }
    },
    data: function () {
        return {
            flashMessage: false,
            message: [],
            error: false
        }
     }
});

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/upload", component: Upload}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});