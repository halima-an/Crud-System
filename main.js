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