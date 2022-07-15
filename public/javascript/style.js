const dropzone = document.querySelector(".upload-box"); //every const is creating a variable which we can use further
const fileinput = document.querySelector("#fileinput");
const browseButton = document.querySelector(".browsebtn");
const host = "https://fshare97.herokuapp.com/";
const uploadUrl = `${host}api/files`;
const maxAllowedSize = 1024*1024*1024;
const bgprogress = document.querySelector(".bg-progress");
const progressPercent = document.querySelector("#percent");
const progressName = document.querySelector('#name');
const progressBar = document.querySelector('.progressbar');
const uploadBar = document.querySelector('.uploadbar');
const fileUrl = document.querySelector('#fileurl');
const linkBox = document.querySelector('.linkbox');
const copyButton = document.querySelector('.cpybtn');

const aboutButton = document.querySelector('.about_nav');
const servicesButton = document.querySelector('.sevices_nav');
const usageButton = document.querySelector('.usage_nav');
const aboutModalBox = document.querySelector('.about-Modal');
const usageModalBox = document.querySelector('.usage-Modal');
const servicesModalBox = document.querySelector('.services-Modal');
const contactmodal = document.querySelector('.contact-modal');

const menubtn = document.querySelector(".menu-Button");
const menulist = document.querySelector(".navbar_list_unordered");




dropzone.addEventListener("dragover" , (e) => { //we are delegating a event in the page that we created 
    console.log("dragging");
    e.preventDefault();
    if(!dropzone.classList.contains("dragged")){
        dropzone.classList.add("dragged");
    }
});

dropzone.addEventListener("dragleave", (e) => {
    dropzone.classList.remove("dragged");
});

fileinput.addEventListener("change", ()=>{
    uploadFile();
});


dropzone.addEventListener("drop", (e) =>{
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length === 1) {
        if (files[0].size < maxAllowedSize) {
          fileinput.files = files;
          uploadFile();
        } 
        else {
          showToast("Max file size is 100MB");
        }
      } 
      else if(files.length > 1) 
      {
        showToast("You can't upload multiple files");
      }
    dropzone.classList.remove("dragged");

});


browseButton.addEventListener("click" , ()=>{  //creating the option for browse button 
    fileinput.click();
    console.log('clicked');
});

copyButton.addEventListener("click" , ()=>{

  fileUrl.select();
  document.execCommand("copy");
});


aboutButton.addEventListener("click" , (e) =>{
  aboutModalBox.style.visibility = "visible";
});

usageButton.addEventListener("click" , (e) =>{
  usageModalBox.style.visibility = "visible";
});

servicesButton.addEventListener("click" , (e) =>{
  servicesModalBox.style.visibility = "visible";
});

document.querySelector('.contactbtn').addEventListener("click" , (e) =>{
  contactmodal.style.visibility = "visible";
});

document.querySelector('.about_modal_close').addEventListener("click" , () => {
  aboutModalBox.style.visibility = "hidden";
});
document.querySelector('.usage_modal_close').addEventListener("click" , () => {
  usageModalBox.style.visibility = "hidden";
});
document.querySelector('.service_modal_close').addEventListener("click" , () => {
  servicesModalBox.style.visibility = "hidden";
});
document.querySelector('.contact_modal_close').addEventListener("click" , () => {
  contactmodal.style.visibility = "hidden";
});
menubtn.addEventListener('click', ()=> {
menulist.style.right = 0;
});

document.querySelector('.close-button').addEventListener('click',()=>{
  menulist.style.right = "-100%";
});

const uploadFile = () => {
  console.log("file added uploading");
  uploadBar.style.display = "block";
  files = fileinput.files;
  const formData = new FormData();
  formData.append("myfile", files[0]);
  const name = files[0].name;
  const xhr = new XMLHttpRequest();
  xhr.upload.onprogress = function (event) {
    progressName.innerText = name;
    let percent = Math.round((100 * event.loaded) / event.total);
    progressPercent.innerText = percent;
    const scaleX = `scaleX(${percent / 100})`;
    bgprogress.style.transform = scaleX;
    progressBar.style.transform = scaleX;
  };
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      onUploadSuccess(JSON.parse(xhr.responseText)); 
      console.log(xhr.responseText);
    }
  };

  xhr.open("POST", uploadUrl);
  xhr.send(formData);
};


const onUploadSuccess = function({file : url}) {
  uploadBar.style.display = "none";
  linkBox.style.display = "block";
  console.log(url);
  fileUrl.value = url;

};

