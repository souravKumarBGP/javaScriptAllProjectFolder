/*********************************************************************************************************
Select the element in global scope
*********************************************************************************************************/
const palyAndPause = document.querySelector(".palyAndPause"),
skipLeft = document.querySelector(".skipLeft"),
skipRight = document.querySelector(".skipRight"),
progress = document.querySelector(".progress"),
picInPic = document.querySelector(".picInPic"),
fullScreen = document.querySelector(".fullScreen"),
progressBox = document.querySelector(".progressBox"),
c_Time = document.querySelector(".currentTime big"),
volumeImg = document.querySelector("#volumeImg"),
videoDueration = document.querySelector(".videoDueration big"),
volumeRange = document.querySelector("#volumeRange"),
mainVideo = document.querySelector("video");

videoDueration.innerHTML = (mainVideo.duration / 60).toFixed(2);// set video duration

/*********************************************************************************************************
Logic of change video volue when user change volume of video
*********************************************************************************************************/
volumeRange.addEventListener("input", () =>{
   mainVideo.volume = volumeRange.value;

   (volumeRange.value == 0) ? volumeImg.src = "./img/volume0.svg" : volumeImg.src = "./img/volume.svg";
});

volumeImg.addEventListener("click", () =>{
    if(volumeImg.src.includes("volume.svg")){
        volumeImg.src = "./img/volume0.svg";
        mainVideo.volume = 0;
        volumeRange.value = 0;
        
    }else{
        volumeImg.src = "./img/volume.svg";
        mainVideo.volume = 0.5;
        volumeRange.value = 0.5;
    }

});
// mainVideo.addEventListener("click", () =>{
//     console.log(document.fullscreenElement == mainVideo)
// })


/*********************************************************************************************************
Logic of create video in picture in picture mode when user click picInPic img
*********************************************************************************************************/
picInPic.addEventListener("click",() =>{
    mainVideo.requestPictureInPicture();
});

/*********************************************************************************************************
Logic of create video in fullScreen when user click on fullScreen img
*********************************************************************************************************/
fullScreen.addEventListener("click",() =>{
    mainVideo.requestFullscreen();
});



/*********************************************************************************************************
Logic of change currentTime when user click on progressBox
*********************************************************************************************************/
progressBox.addEventListener("click", (event) =>{
    const offsetXValue = event.offsetX;
    const timeInWIdth = event.target.offsetWidth;
    mainVideo.currentTime = (offsetXValue / timeInWIdth) * mainVideo.duration;
})




/*********************************************************************************************************
Logic of play and pause video when user click planyAndPause button
*********************************************************************************************************/
palyAndPause.addEventListener("click", () =>{
    // if video is paused, play the video else pause the video.
    (mainVideo.paused) ? mainVideo.play() : mainVideo.pause() ;
});

mainVideo.addEventListener("play", () =>{   // if video is play, change the icon in pause
    palyAndPause.src = "./img/pouseBtn.svg";
});

mainVideo.addEventListener("pause", () =>{   // if video is pause, change the icon in play
    palyAndPause.src = "./img/playBtn.svg";
});

/*********************************************************************************************************
Logic of what to do when video is playing
*********************************************************************************************************/
mainVideo.addEventListener("timeupdate", (event) =>{
    const {currentTime, duration} = event.target;

    let percent = (currentTime * 100 / duration);
    progress.style.width = `${percent}%`;

    volumeImg.innerHTML = (currentTime / 60).toFixed(2); // set current video time in  .c_Time  element

});









