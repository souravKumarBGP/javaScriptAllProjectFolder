/************************************************************************************************************
 Start logic ot show and hide signup form and login form
************************************************************************************************************/
let signupBtn = document.querySelector("#signupBtn");
signupBtn.addEventListener("click", () =>{
    document.querySelector(".loginForm").style.display = "none";
    document.querySelector(".signupForm").style.display = "block";
    document.querySelector(".signupForm").className += " animate__animated animate__flipInY";

});

let loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", () =>{
    document.querySelector(".loginForm").style.display = "block";
    document.querySelector(".signupForm").style.display = "none";
    document.querySelector(".loginForm").className += " animate__animated animate__flipInY";

});

/************************************************************************************************************
 Start logic of signUp form validation and stored in localStorage
************************************************************************************************************/
let signupForm = document.querySelector(".signupForm form");
signupForm.addEventListener("submit", (event) =>{
    let inputs = signupForm.querySelectorAll("input");
    let userPhoneNumber = document.querySelector("#userPhoneNumber");
    let userEmail = event.target.userEmail.value;

    let counter = 0;
    for(let items of inputs){
        
        if(items.value == ""){
            items.nextElementSibling.style.display = "block";
        }else if(userPhoneNumber.value.length != 10){
            userPhoneNumber.nextElementSibling.style.display = "block";
            userPhoneNumber.nextElementSibling.innerHTML = "Enter 10 digit number !";
            counter = 0;
        }else{
            items.nextElementSibling.style.display = "none";
            counter++;
        }
        
        items.addEventListener("focus", () =>{
            items.nextElementSibling.style.display = "none";
        })
        items.addEventListener("blur", () =>{
            if(items.value == ""){
                items.nextElementSibling.style.display = "block";
            }else{
                items.nextElementSibling.style.display = "none";
            }
        })
    }

    // logic to save data in localstorage
    if(counter == inputs.length){
        
        if(Object.keys(localStorage).includes(userEmail)){
            swal("This Email is already exit!", "Please enter another email id", "error");

        }else{
            let userName = event.target.userName.value;
            let userEmail = event.target.userEmail.value;
            let userPhoneNumber = event.target.userPhoneNumber.value;
            let userPassword = event.target.userPassword.value;
    
            let userData = {
                "userName": userName,
                "userEmail": userEmail,
                "userPhone": userPhoneNumber,
                "userPassword": userPassword
            };
            localStorage.setItem(userEmail, JSON.stringify(userData));
            
            swal("Sign up successfull", "Now you are ready for login", "success");
            document.querySelector(".loginForm").style.display = "block";
            document.querySelector(".signupForm").style.display = "none";
            document.querySelector(".loginForm").className += " animate__animated animate__flipInY";
    
            event.target.reset();
            counter = 0;
        };
        
        
    }

    event.preventDefault();
})

/************************************************************************************************************
 Start logic of login form validation 
************************************************************************************************************/
let loginForm = document.querySelector(".loginForm form");
loginForm.addEventListener("submit", (event) =>{
    let inputs = loginForm.querySelectorAll("input");
    let loginEmailError = document.querySelector("#loginEmailError");

    let currentEmail = event.target.loginEmail;
    let currentPassword = event.target.loginPassword;
    
    let counter = 0;
    for(let items of inputs){
        
        if(items.value == ""){
            items.nextElementSibling.style.display = "block";
            items.nextElementSibling.innerHTML = "Fill the box!";
        }else{
            items.nextElementSibling.style.display = "none";
            counter++;
        }

        items.addEventListener("focus", (event) =>{
            items.nextElementSibling.style.display = "none";
        })
        items.addEventListener("blur", (event) =>{
            if(items.value == ""){
                items.nextElementSibling.style.display = "block";
            }else{
                items.nextElementSibling.style.display = "none";
            }
        })
    }
    if(counter == inputs.length){
        let userDataObj = JSON.parse(localStorage.getItem(currentEmail.value));
        if(userDataObj == null){
            loginEmailError.style.display = "block";
            loginEmailError.innerHTML = "This email is not registered!"
        }else{
            if(userDataObj.userPassword == currentPassword.value && userDataObj.userEmail == currentEmail.value){
                sessionStorage.setItem("loginUser", currentEmail.value);
                
                window.location.replace("./profile.html")
                
                swal("Login Successfull", "Now you are ready for access dashbord", "success");
                event.target.reset();
            }else{
                document.querySelector("#loginPasswordError").style.display = "block";
                document.querySelector("#loginPasswordError").innerHTML = "Enter valid password!";
            }
        }
    }
    
    event.preventDefault();
});

