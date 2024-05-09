if(sessionStorage.getItem("loginUser") == null){
    window.location.replace("./index.html");
}else{
    let loginUser = sessionStorage.getItem("loginUser");

    let video = document.querySelector(".videoBox video");
    let playAndPouseBtn = document.querySelector(".videoBox #playAndPouseBtn");
    let c_time = document.querySelector("#c_time");
    let dueration = document.querySelector("#dueration");
    let progressBar = document.querySelector(".progressBar");

    playAndPouseBtn.addEventListener("click", () =>{
        let due = (video.duration/60).toFixed(2);
        dueration.innerHTML = due;
        
        if(playAndPouseBtn.src.includes("play.svg")){
            video.play();
            playAndPouseBtn.src = "./images/paus.svg"   
            playAndPouseBtn.style.width = "20px"
        }else{
            video.pause();;
            playAndPouseBtn.src = "./images/play.svg" 
            playAndPouseBtn.style.width = "30px"
        }
    });

    let due = (video.duration/60).toFixed(2);
    dueration.innerHTML = due;
    video.addEventListener("timeupdate", () =>{
        let currentTime = video.currentTime;
        let sec = currentTime-parseInt(currentTime/60)*60;

        c_time.innerHTML = `${parseInt(currentTime/60)} : ${parseInt(sec)}`

        let wid = (currentTime*100)/video.duration;

        progressBar.style.width = wid+"%"


        
        if(video.ended){
            video.loop = true;
            video.play()
            let due = (video.duration/60).toFixed(2);
            dueration.innerHTML = due;
        }

        if(video.paused){
            playAndPouseBtn.src = "./images/play.svg" 
            playAndPouseBtn.style.width = "30px"
        }else{
            playAndPouseBtn.src = "./images/paus.svg"   
            playAndPouseBtn.style.width = "20px"   
        }
        
    })

    // ********* save video in localStorage 
    let addVideoBtn = document.querySelector("#addVideoBtn");
    addVideoBtn.addEventListener("click", () =>{
        let videoName = document.querySelector("#videoName");
        let videoUrl = document.querySelector("#videoUrl");

        let videoArr = JSON.parse(localStorage.getItem(loginUser+"video")) ?? [];
        videoArr.push({
            "videoName": videoName.value,
            "videoUrl": videoUrl.value
        })

        localStorage.setItem(loginUser+"video", JSON.stringify(videoArr));

        showVideo();
        
        videoName.value = "";
        videoUrl.value = "";
    })

    function showVideo(){
        let videoArr = JSON.parse(localStorage.getItem(loginUser+"video"));

        let videoItems = document.querySelector(".videoItems");
        let itemList = "";

        videoArr.forEach((items, index) =>{
            
            itemList += `
                <div class="item">
                    <h3 id="itemVideoName">${items.videoName}</h3>
                    <button class="play" url="${items.videoUrl}" >Play</button>
                    <button class="del" onclick="deletVideoFun(${index})">del</button>
                </div>
            `
        })
        
        videoItems.innerHTML = itemList;
    }
    showVideo();

    // ********** delete video form local storage
    function deletVideoFun(index){
        let videoArr = JSON.parse(localStorage.getItem(loginUser+"video"));
        
        videoArr.splice(index,1);

        localStorage.setItem(loginUser+"video", JSON.stringify(videoArr));

        showVideo();
    }

    // start play button codding 
    
    let playBtn = document.querySelectorAll(".item .play");
    let source = document.querySelector(".videoBox video source");
    
    for(let items of playBtn){
        items.addEventListener("click", (event) =>{
            removeCurrentPlayClass();

            let url = event.target.getAttribute("url")
            event.target.classList.add("currentVideoPlay")

            source.src = url;

            video.load()
            video.play()
        });
    }
    
    function removeCurrentPlayClass(){
        for(let items of playBtn){
            items.classList.remove("currentVideoPlay")
        }
    }

    let nextVideo = document.querySelector("#nextVideo");
    nextVideo.addEventListener("click", () =>{
        let counter;
        playBtn.forEach((items, ind) =>{
            if(items.classList.contains("currentVideoPlay")){
                counter = ind;
            }
        })

        removeCurrentPlayClass();
        
        if(counter == playBtn.length-1){
            counter = 0;
            let item = playBtn[counter]

            item.classList.add("currentVideoPlay")
            source.src = item.getAttribute("url");
            
            video.load()
            video.play()
        }else{
            counter = counter+1;

            let item = playBtn[counter]
            item.classList.add("currentVideoPlay")
            
            source.src = item.getAttribute("url");
            
            video.load()
            video.play()
        }
    });
    
    let prevVieeo = document.querySelector("#prevVieeo");
    prevVieeo.addEventListener("click", () =>{
        let counter;
        playBtn.forEach((items, ind) =>{
            if(items.classList.contains("currentVideoPlay")){
                counter = ind;
            }
        })

        removeCurrentPlayClass();
        
        if(counter == 0){
            counter = playBtn.length-1;
            let item = playBtn[counter]

            item.classList.add("currentVideoPlay")
            source.src = item.getAttribute("url");
            
            video.load()
            video.play()
        }else{
            counter = counter-1;

            let item = playBtn[counter]
            item.classList.add("currentVideoPlay")
            
            source.src = item.getAttribute("url");
            
            video.load()
            video.play()
        }
    });
}



