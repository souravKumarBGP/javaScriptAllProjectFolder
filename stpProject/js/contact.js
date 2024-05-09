// logic to check user is login or not
if(sessionStorage.getItem("loginUser") == null){
    window.location.replace("./index.html");
}else{
    let loginUser = sessionStorage.getItem("loginUser");
    document.querySelector("#profileImg").src = localStorage.getItem(loginUser+"img")
    
    // ******************* logic to save contact info in localStorage
    let contactForm = document.querySelector("#contactForm");
    contactForm.addEventListener("submit", (event) =>{
        let contactName = event.target.contactName.value;
        let currentContactNumber = event.target.contactNumber.value;
        let addBtn = event.target.addBtn;
       
        if(addBtn.innerHTML == "Add"){
            let contactArr = JSON.parse(localStorage.getItem(loginUser+"contact")) ?? [];
            let checkStatus = 1;
            for(let value of contactArr){
                if(value.contactNumber == currentContactNumber){
                    checkStatus = 0;
                    break;
                }
            }

            if(checkStatus == 1){
                contactArr.push({
                    "contactName": contactName,
                    "contactNumber": currentContactNumber
                });
                
                localStorage.setItem(loginUser+"contact", JSON.stringify(contactArr));
            }else{
                alert("Phone is already exit")
            }
            
            event.target.reset();
        }
        
        showContactNumber();

        event.preventDefault();
    })

    // ************ logic of show contact info
    function showContactNumber(){
        let contactInfoArr = JSON.parse(localStorage.getItem(loginUser+"contact"));
        if(contactInfoArr != null){
            let itemList = "";
            contactInfoArr.forEach((items, index) => {
                itemList += `
                    <div class="items">
                        <div class="left">
                            <h4><img src="./images/userImage.svg" alt="" width="10px">&nbsp; &nbsp; <span class="contactName">${items.contactName}</span></h4>
                            <hr style="margin: 5px 0;">
                            <h4><img src="./images/userImage.svg" alt="" width="10px">&nbsp; &nbsp; <span class="contactNumber">${items.contactNumber}</span></h4>
                        </div>
                        <div class="right">
                            <button onclick = "editContactItems(${index})">Edit</button>
                            <button onclick = "deletContactItems(${index})">Del</button>
                        </div>
                    </div><!--***End of item-->
                `;
            });
        
            document.querySelector(".contactItemsBox").innerHTML = itemList;
        }
    }
    showContactNumber();

    // ************ logic of delete contact item when user click on del btn
    function deletContactItems(ind){
        let contactInfoArr = JSON.parse(localStorage.getItem(loginUser+"contact"));
        contactInfoArr.splice(ind,1);
        localStorage.setItem(loginUser+"contact", JSON.stringify(contactInfoArr));
        showContactNumber();
    }

    // ************ logic to edit contact item whe user click edit btn
    let editInd;
    function editContactItems(ind){
        editInd = ind;
        let contactInfoArr = JSON.parse(localStorage.getItem(loginUser+"contact"));

        let contactName = contactForm.querySelector("#contactName");
        let contactNumber = contactForm.querySelector("#contactNumber");
        let addBtn = contactForm.querySelector("#addBtn");
        addBtn.innerHTML = "Edit"
        
        contactName.value = contactInfoArr[ind].contactName;
        contactNumber.value = contactInfoArr[ind].contactNumber;

        contactForm.addEventListener("submit",(event) =>{
            if(addBtn.innerHTML == "Edit"){
                contactInfoArr[editInd].contactName = contactName.value;
                contactInfoArr[editInd].contactNumber = contactNumber.value;

                localStorage.setItem(loginUser+"contact", JSON.stringify(contactInfoArr));

                showContactNumber()

                addBtn.innerHTML = "Add"
                event.preventDefault();
                event.target.reset();
               
            }
        })
        
    }

    // *********** Start logic of search functionility
    let searchBox = document.querySelector("#searchBox");
    let contactNames = document.querySelectorAll(".contactItemsBox .contactName");
    searchBox.addEventListener("input", () =>{
        for(let items of contactNames){
            if(items.innerHTML.toLocaleLowerCase().includes(searchBox.value.toLocaleLowerCase())){
                items.parentElement.parentElement.parentElement.style.display = "flex";
            }else{
                items.parentElement.parentElement.parentElement.style.display = "none";

            }
        }
    })
    
}

