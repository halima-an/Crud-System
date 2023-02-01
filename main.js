let courseName = document.getElementById('courseName')
let courseCategory = document.getElementById('courseCategory')
let coursePrice = document.getElementById('coursePrice')
let courseDescription = document.getElementById('courseDescription')
let tableBody = document.getElementById('tableBody') 
let deleteBtn = document.getElementById('deleteBtn')
let addBtn = document.getElementById('addBtn')
let search = document.getElementById('search')

let courses 

if(JSON.parse(localStorage.getItem('courses'))==null){
  courses=[]
}else{
  courses=JSON.parse(localStorage.getItem('courses'));
}
display();

let currentIndex=''

//add course
addBtn.onclick = function(event) {
  event.preventDefault()
  if(addBtn.innerHTML == 'Add Course'){
   addCourse()
  }
  else if( addBtn.innerHTML == 'Update Course')
  updateCourse()   

};
function addCourse(){
  let course = {
    name : courseName.value,
    category : courseCategory.value,
    price : coursePrice.value,
    description : courseDescription.value,
  }
  courses.push(course)
  localStorage.setItem('courses', JSON.stringify(courses))
  console.log(courses);
  
  display()
 
  courseName.classList.remove('is-valid')
  courseCategory.classList.remove('is-valid')
  coursePrice.classList.remove('is-valid')
  courseDescription.classList.remove('is-valid')
  clearinputs()
}
//clear inputs
function clearinputs() {
  courseName.value = ''
  courseCategory.value = ''
  coursePrice.value = ''
  courseDescription.value = ''
};

//dispaly courses
function display() {
  let data = ''
  for(let i = 0; i < courses.length ; i++) {
    data +=`  
  <tr>
    <td>${i+1}</td>
    <td>${courses[i].name}</td>
    <td>${courses[i].category}</td>
    <td>${courses[i].price}</td>
    <td>${courses[i].description}</td>
    <td>
        <a href="#" class="btn btn-outline-primary" onclick="editCourse(${i})">edit</a>

    </td>
    <td>
        <a href="#" class="btn btn-outline-danger" onclick="deleteCourse(${i})">delete</a>
    </td>
  </tr>
`
  }
  tableBody.innerHTML= data
};

//delete course
function deleteCourse(index){
  courses.splice(index,1)
  localStorage.setItem('courses', JSON.stringify(courses))
  display()
    
}

//delete all
deleteBtn.onclick = function(){
  courses=[]
  tableBody.innerHTML=''
  localStorage.setItem('courses', JSON.stringify(courses))
 
};

//search
function serachCourses(){
  console.log(search.value);
  let searchKey= search.value
  let data = ''
  for(let i = 0; i < courses.length ; i++) {
    if(courses[i].name.toLocaleLowerCase().includes(searchKey)){
    data +=`  
  <tr>
    <td>${i+1}</td>
    <td>${courses[i].name}</td>
    <td>${courses[i].category}</td>
    <td>${courses[i].price}</td>
    <td>${courses[i].description}</td>
    <td>
        <a href="#" class="btn btn-outline-primary">edit</a>

    </td>
    <td>
        <a href="#" class="btn btn-outline-danger" onclick="deleteCourse(${i})">delete</a>
    </td>
  </tr>
`
  }
  }
  tableBody.innerHTML= data
}
//edit course
function editCourse(index){
  
  courseName.value = courses[index].name
  courseCategory.value = courses[index].category
  coursePrice.value = courses[index].price
  courseDescription.value = courses[index].description

  addBtn.innerHTML='Update Course'
  currentIndex =index
}

function updateCourse(){
  let course = {
    name : courseName.value,
    category : courseCategory.value,
    price : coursePrice.value,
    description : courseDescription.value,
  }
  let oldName= courses[currentIndex].name
courses[currentIndex]= course
localStorage.setItem('courses', JSON.stringify(courses))
display()
clearinputs()
 
addBtn.innerHTML='Add Course'



}
// validation
// regex

/**
 * course name
 * first letter capital
 * name 3-10
 * no numbers
 */
courseName.onkeyup = function(){
  pattern= /^[A-Z][a-z]{2,10}$/
  //if true
  if(pattern.test(courseName.value)){
    courseName.classList.remove('is-invalid')
    courseName.classList.add('is-valid')
    addBtn.removeAttribute('disabled')

    //if false
  }else{
    courseName.classList.remove('is-valid')
    courseName.classList.add('is-invalid')
    addBtn.setAttribute('disabled','disabled')
  }
    
}

/**
 * category
 * first letter capital
 * name 3-10
 * no numbers
 * accept spaces
 */
courseCategory.onkeyup = function(){
  pattern= /^[A-Z][a-z\s]{2,10}$/
  //if true
  if(pattern.test(courseCategory.value)){
    courseCategory.classList.remove('is-invalid')
    courseCategory.classList.add('is-valid')
    addBtn.removeAttribute('disabled')

    //if false
  }else{
    courseCategory.classList.remove('is-valid')
    courseCategory.classList.add('is-invalid')
    addBtn.setAttribute('disabled','disabled')
  }
    
}

/**
 * price
 * numeric
 * 4 digits
 
 */
coursePrice.onkeyup = function(){
  pattern= /^[0-9]{1,4}$/
  //if true
  if(pattern.test(coursePrice.value)){
    coursePrice.classList.remove('is-invalid')
    coursePrice.classList.add('is-valid')
    addBtn.removeAttribute('disabled')

    //if false
  }else{
    coursePrice.classList.remove('is-valid')
    coursePrice.classList.add('is-invalid')
    addBtn.setAttribute('disabled','disabled')
  }
    
}

/**
 * course descripition
 * first letter capital
 * name 3-10
 * no numbers
 */
courseDescription.onkeyup = function(){
  pattern= /^[A-Za-z0-9\s]{1,60}$/
  //if true
  if(pattern.test(courseDescription.value)){
    courseDescription.classList.remove('is-invalid')
    courseDescription.classList.add('is-valid')
    addBtn.removeAttribute('disabled')

    //if false
  }else{
    courseDescription.classList.remove('is-valid')
    courseDescription.classList.add('is-invalid')
    addBtn.setAttribute('disabled','disabled')
  }
    
}