var addbtn = document.querySelector("#add-new");
var model = document.querySelector(".model");
var closebtn = document.querySelector(".close-icon");

addbtn.onclick = function () {
    model.classList.add("active");
    registerform.reset('');
    imgUrl=undefined;
    profilepic.src="Images/profile.png";
    register.disabled=false;
    update.disabled=true;
    // alert();
}
closebtn.onclick = function () {
    model.classList.remove("active");
    registerform.reset('');
    imgUrl=undefined;
    profilepic.src="Images/profile.png";
}

// gloabl varibale will store here
var iddt = document.querySelector("#id");
var fnamedt = document.querySelector("#fname");
var lnamedt = document.querySelector("#lname");
var emaildt = document.querySelector("#email");
var mobiledt = document.querySelector("#mobile");
var jobtitledt = document.querySelector("#jobtitle");
var officecodedt = document.querySelector("#officecode");
var profilepic = document.querySelector("#image");
var userdata = [];
var register = document.querySelector("#reg-btn");
var update = document.querySelector("#update-btn");
var registerform = document.querySelector("#register-form");
var tabeldt = document.querySelector("#tabledata");
var imgUrl;

// global variable ends her
/* register button and update button */

register.onclick = function (e) {
    e.preventDefault();
    registerationdata();
    registerform.reset('');
    model.classList.remove("active");
    getDataFromLocal();
    swal("Good job!", "You clicked the button!", "success");
};


if (localStorage.getItem("userdata") != null) {
    userdata = JSON.parse(localStorage.getItem("userdata"));
    // console.log(userdata);
}
// document.addEventListener("DOMContentLoaded", function () {
//     getDataFromLocal();
// });


function registerationdata() {
    userdata.push({
        id: iddt.value,
        fname: fnamedt.value,
        lname: lnamedt.value,
        email: emaildt.value,
        mobile: mobiledt.value,
        jobtitle: jobtitledt.value,
        officecode: officecodedt.value,
        Image: imgUrl == undefined ? "Images/profile.png" : imgUrl
    });
    var userstring = JSON.stringify(userdata);
    localStorage.setItem("userdata", userstring);
}


const getDataFromLocal = () => {
    tabeldt.innerHTML = "";
    userdata.forEach((data, index) => {
        tabeldt.innerHTML += `
         <tr index='${index}'>
                <td>${index + 1}</td>
                <td>${data.id}</td>
                <td>${data.fname}</td>
                <td>${data.lname}</td>
                <td>${data.email}</td>
                <td>${data.mobile}</td>
                <td><img src="${data.Image}" width="40"></td>
                <td>${data.jobtitle}</td>
                <td>
                    <button id="edit" data-index=${index}><i class="fa fa-edit"></i></button>
                    <button id="trash" data-index=${index}><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    // document.querySelectorAll("#edit").forEach(button => {
    //     button.addEventListener("click", function () {
    //         var index = this.getAttribute("data-index");
    //         // alert();
    //         getDataInList(index);
    //     });
    // });

    /* deleten button  */
    var i;
    var deletebtn = document.querySelectorAll("#trash");
    for (i = 0; i < deletebtn.length; i++) {
        deletebtn[i].onclick = function () {
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        userdata.splice(id, 1);
                        localStorage.setItem("userdata", JSON.stringify(userdata));
                        tr.remove();
                        swal("Deleted", "Record Delete SuccessFully", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    };

    //edit btn
    var editbtn = document.querySelectorAll("#edit");
    for(i=0 ; i < editbtn.length ; i++)
    {
        editbtn[i].addEventListener("click", function () {
            var index = this.getAttribute("data-index");
            // alert();
            register.disabled=true;
            update.disabled=false;

            getDataInList(index);
        });
    }
    update.onclick = function () {
        // alert();
        if(selectedIndex !== undefined){
            userdata[selectedIndex]={
                id: iddt.value,
                fname: fnamedt.value,
                lname: lnamedt.value,
                email: emaildt.value,
                mobile: mobiledt.value,
                jobtitle: jobtitledt.value,
                officecode: officecodedt.value,
                Image: imgUrl || userdata[selectedIndex].Image
            };
            localStorage.setItem("userdata", JSON.stringify(userdata)); // Save updated data
            getDataFromLocal(); // Refresh table
            registerform.reset('');
            model.classList.remove("active");
            swal("Updated!", "Record updated successfully!", "success");
        }    
    };
}
getDataFromLocal();
let selectedIndex;
const getDataInList = (index) => {
    selectedIndex = index;
    var data = userdata[index];
    iddt.value = data.id;
    fnamedt.value = data.fname;
    lnamedt.value = data.lname;
    emaildt.value = data.email;
    mobiledt.value = data.mobile;
    jobtitledt.value = data.jobtitle;
    officecodedt.value = data.officecode;
    imgUrl = data.Image;
    profilepic.src = data.Image;

    model.classList.add("active");

}

//image process
var profile_pic = document.querySelector("#image");
var upload_pic = document.querySelector("#myfile");
upload_pic.onchange = function () {
    if (upload_pic.files[0].size <= 1000000) {
        var freader = new FileReader();
        freader.onload = function (e) {
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
            console.log(imgUrl);
        }
        freader.readAsDataURL(upload_pic.files[0])
    }
    else {
        alert("the file is not proper siezed");
    }
}

//search 

var searchdt = document.querySelector("#searchbox");
var searcbtn = document.querySelector("#search-btn");
searchdt.oninput= function() {
    search_function();
}
// searcbtn.onclick = function(){
//     search_function();
// }

function search_function(){
    var tr = tabeldt.querySelectorAll("TR");
    // console.log(tr);
    var filter = searchdt.value.toLowerCase();
    var i;
    // searcbtn.onclick = function(){
        for(i = 0; i<tr.length; i++){
            var td = tr[i].getElementsByTagName("TD")[0];
            var td = tr[i].getElementsByTagName("TD")[1];
            var td = tr[i].getElementsByTagName("TD")[2];
            var td = tr[i].getElementsByTagName("TD")[3];
            var td = tr[i].getElementsByTagName("TD")[4];
            var td = tr[i].getElementsByTagName("TD")[5];
            var td = tr[i].getElementsByTagName("TD")[7];
    
            // alert(td.innerHTML);
            if(td){
                var id=td.innerHTML;
            if(filter === "" || id.toLowerCase().indexOf(filter) > -1)
            {
                tr[i].style.display = "" ;
    
            }else{
                tr[i].style.display = "none";
            }
            }
            
    
        }
        
    // }
    
}
//erasing all data
var erasebtn =document.querySelector("#erase");

erasebtn.onclick =function(){
    // alert();
    
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                   localStorage.removeItem("userdata");
                   userdata=[];
                   tabeldt.innerHTML="";

                    swal("Deleted", "Record Delete SuccessFully", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    
}