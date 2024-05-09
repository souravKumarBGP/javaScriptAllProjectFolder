// ******************** logic of check user is login or notlogin if user is not login then user redirect on login page
if(sessionStorage.getItem("loginUser") == null){
    window.location.replace("./index.html");
}else{
    let loginUser = sessionStorage.getItem("loginUser");
    let userImage = document.querySelector("#userImage");
    
    // ********************************** logic to show profile picture
    if(localStorage.getItem(loginUser+"img") == null){
        let mainProfile = document.querySelector(".mainProfile");
        mainProfile.style.display = "none";
        
        // *********************************** logic to show login userName
        let loginUserName = document.querySelector("#loginUserName");
        loginUserName.style.display = "block"
        let userDataObj = JSON.parse(localStorage.getItem(loginUser))
        
        loginUserName.innerHTML = userDataObj.userName
        
        // ********************* Start logic of uplode image in localStorage 

        let inputBox = document.querySelector("#inputBox");

        inputBox.addEventListener("change", (event) =>{
            let fileReader = new FileReader();
            fileReader.readAsDataURL(inputBox.files[0]);
            
            fileReader.onload = function(){
                let url = fileReader.result;
                userImage.src = url;

                let nextBtn = document.querySelector(".nextBtn");
                nextBtn.style.display = "block";

                // ************* Logic to save ligin image in localStorage when user click on nextBtn
                nextBtn.addEventListener("click",(event) =>{
                    localStorage.setItem(loginUser+"img", url);
                    let profileBox = document.querySelector(".profileBox");
                    profileBox.style.display = "none";

                    mainProfile.style.display = "block";

                    let mainProfileUserName = document.querySelector("#mainProfileUserName");
                    mainProfileUserName.style.display = "block"
                    let userDataObj = JSON.parse(localStorage.getItem(loginUser))
                    mainProfileUserName.innerHTML = userDataObj.userName

                    let mainProfilePic = document.querySelector("#mainProfilePic");
                    mainProfilePic.src = localStorage.getItem(loginUser+"img");

                    
                })

                
            }
        })
    }else{
        let profileBox = document.querySelector(".profileBox");
        profileBox.style.display = "none";

        let mainProfilePic = document.querySelector("#mainProfilePic");
        mainProfilePic.src = localStorage.getItem(loginUser+"img");

        let mainProfileUserName = document.querySelector("#mainProfileUserName");
        mainProfileUserName.style.display = "block"
        let userDataObj = JSON.parse(localStorage.getItem(loginUser))
        mainProfileUserName.innerHTML = userDataObj.userName

        // ************** Start logic of logout 
        let logoutBtn = document.querySelector("#logoutBtn");
        logoutBtn.addEventListener("click", () =>{
            sessionStorage.removeItem("loginUser")
            window.location = "./index.html";
        });

        // *************** Start logic of contact page open
        let contactBtn = document.querySelector("#contactBtn");
        contactBtn.addEventListener("click", () =>{
            window.location = "./contact.html";
        })
    }
    


    
}




