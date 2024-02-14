let form = document.getElementById("myform");
let imgInput = document.querySelector(".img")
let uploadImg = document.getElementById("uploadImg")
let nameInput = document.getElementById("nameInput")
let ageInput = document.getElementById("ageInput")
let cityInput = document.getElementById("cityInput")
let emailInput = document.getElementById("emailInput")
let contactInput = document.getElementById("contactInput")
let postInput = document.getElementById("postInput")
let joingInput = document.getElementById("joingInput")
let tableData = document.getElementById("tableData")
let submitBtn = document.querySelector(".submit")
let modal = document.getElementById("formData")
let modalTitle = document.querySelector("#formData .modal-title")
let newUserBtn=document.querySelector(".newUser")

let getData = localStorage.getItem("userProfile") ? JSON.parse(localStorage.getItem("userProfile")) : [];
console.log(getData)

let isEdit = false, editId
console.log(isEdit)

// newUserBtn.addEventListener('click',()=>{
//       submitBtn.innerHTML="Submit";
//       modalTitle.innerHTML="Fill The Details"
//       isEdit=false
//       imgInput.src="img/profile_Img.png"

// })

uploadImg.onchange = function () {
      if (uploadImg.files[0].size < 1000000) { // 100000=1Mb
            let fileReader = new FileReader();

            fileReader.onload = function (e) {
                  imgUrl = e.target.result;
                  imgInput.src = imgUrl
                  // console.log(imgUrl) //uploaded img data
            }
            fileReader.readAsDataURL(uploadImg.files[0])

      } else {
            alert("File Size is to large!")
      }
}


function showInfo() {
      document.querySelectorAll(".employeDetails").forEach(info => info.remove())
      getData.map((element, index) => {
            let createElement = `
            <tr class="employeDetails">
                  <td>${index + 1}</td>
                  <td><img src="${element.picture}" alt="info_Img_Error" width="60" height="60"></td>
                  <td>${element.employeName}</td>
                  <td>${element.employeAge}</td>
                  <td>${element.employeCity}</td>
                  <td>${element.employeEmail}</td>
                  <td>${element.employeContact}</td>
                  <td>${element.employePost}</td>
                  <td>${element.employeJoing}</td> 
                  <td>
                        <div class="btn-group">
                               
                              <button type="button" class="btn btn-success btn-sm" onclick="readInfo('${element.picture}','${element.employeName}','${element.employeAge}','${element.employeCity}','${element.employeEmail}','${element.employeContact}','${element.employePost}','${element.employeJoing}')" data-bs-toggle="modal" data-bs-target="#ReadData"><i class="bi-eye"></i> View</button>
                             
                              <button type="button" class="btn btn-warning btn-sm" onclick="editInfo('${index}','${element.picture}','${element.employeName}','${element.employeAge}','${element.employeCity}','${element.employeEmail}','${element.employeContact}','${element.employePost}','${element.employeJoing}')"data-bs-toggle="modal" data-bs-target="#formData"><i class="bi-pencil-square"></i> Edit</button>
                            
                              <button type="button" class="btn btn-danger btn-sm" onclick="deleteInfo('${index}')" ><i class="bi-trash"></i> Delete</button>
                        </div>
                  </td>
            </tr>
            `

            tableData.innerHTML += createElement;
      })

}
showInfo()

function deleteInfo(index) {

      if (confirm("Are you sure want to delete?")) {
            getData.splice(index, 1)
            localStorage.setItem("userProfile", JSON.stringify(getData))
            showInfo();
      }
}

function readInfo(pic, name, age, city, email, contact, post, jdata) {
      document.querySelector(".showImg").src = pic;
      document.querySelector("#showName").value = name;
      document.querySelector("#showAge").value = age;
      document.querySelector("#showCity").value = city;
      document.querySelector("#showEmail").value = email;
      document.querySelector("#showContact").value = contact;
      document.querySelector("#showPost").value = post;
      document.querySelector("#showJdata").value = jdata;
}
      
function editInfo(index,pic, name, age, city, email, contact, post, jdata) {
      isEdit=true;
      editId=index;
      imgInput.src = pic;
      nameInput.value = name;
      ageInput.value = age;
      cityInput.value = city;
      emailInput.value = email;
      contactInput.value = contact;
      postInput.value = post;
      joingInput.value = jdata;


      console.log(editId)
      console.log(isEdit)

      submitBtn.innerHTML="Update"
      modalTitle.innerHTML = "Update The Form"
}


form.addEventListener("submit", (e) => {
      e.preventDefault()

      let information = {
            picture: imgInput.src == undefined ? "img/profile_Img.png" : imgInput.src,
            employeName: nameInput.value,
            employeAge: ageInput.value,
            employeCity: cityInput.value,
            employeEmail: emailInput.value,
            employeContact: contactInput.value,
            employePost: postInput.value,
            employeJoing: joingInput.value,
      }

      if (!isEdit) {
            getData.push(information)
      }
      else {
            isEdit = false
            getData[editId] = information
      }

      localStorage.setItem("userProfile", JSON.stringify(getData))

      submitBtn.innerText = "Submit"
      modalTitle.innerHTML = "Fill The Form"

      showInfo();

      form.reset()

      imgInput.src = "img/profile_Img.png";
      // modal.style.display = "none"
      // document.querySelector(".modal-backdrop").remove() 
})
