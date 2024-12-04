import Employee from "./employee.js";
import EmployeeList from "./employeeList.js";
import {
  validateAccount,
  validateName,
  validateEmail,
  validatePassword,
  validateDate,
  validateSalary,
  validateRole,
  validateHoursWorked
} from "./employeeValidation.js";

// Tạo đối tượng EmployeeList
const employeeList = new EmployeeList();

// Hàm DOM id
const getEleId = (id) => document.getElementById(id);

//show validation message
const showValidationMessage = (id, message) => {
  const element = getEleId(id);
  element.innerText = message;
  element.style.display = message ? "block" : "none";
};

// Lấy thông tin nhân viên từ form
const getInfoEmployee = () => {
  const account = getEleId("tknv").value;
  const name = getEleId("name").value;
  const email = getEleId("email").value;
  const password = getEleId("password").value;
  const date = getEleId("datepicker").value;
  const salary = parseFloat(getEleId("luongCB").value);
  const role = getEleId("chucvu").value;
  const hoursWorked = parseFloat(getEleId("gioLam").value);

  let isValid = true;

  // Validate inputs and show validation messages
  if (!validateAccount(account)) {
    showValidationMessage("tbTKNV", "Tài khoản phải có 4-6 ký số.");
    isValid = false;
  } else {
    showValidationMessage("tbTKNV", "");
  }

  if (!validateName(name)) {
    showValidationMessage("tbTen", "Tên nhân viên phải là chữ.");
    isValid = false;
  } else {
    showValidationMessage("tbTen", "");
  }

  if (!validateEmail(email)) {
    showValidationMessage("tbEmail", "Email không đúng định dạng.");
    isValid = false;
  } else {
    showValidationMessage("tbEmail", "");
  }

  if (!validatePassword(password)) {
    showValidationMessage("tbMatKhau", "Mật khẩu phải có 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt.");
    isValid = false;
  } else {
    showValidationMessage("tbMatKhau", "");
  }

  if (!validateDate(date)) {
    showValidationMessage("tbNgay", "Ngày làm không đúng định dạng mm/dd/yyyy.");
    isValid = false;
  } else {
    showValidationMessage("tbNgay", "");
  }

  if (!validateSalary(salary)) {
    showValidationMessage("tbLuongCB", "Lương cơ bản phải từ 1,000,000 đến 20,000,000.");
    isValid = false;
  } else {
    showValidationMessage("tbLuongCB", "");
  }

  if (!validateRole(role)) {
    showValidationMessage("tbChucVu", "Chức vụ không hợp lệ.");
    isValid = false;
  } else {
    showValidationMessage("tbChucVu", "");
  }

  if (!validateHoursWorked(hoursWorked)) {
    showValidationMessage("tbGiolam", "Số giờ làm phải từ 80 đến 200 giờ.");
    isValid = false;
  } else {
    showValidationMessage("tbGiolam", "");
  }

  if (!isValid) {
    return null;
  }

  // create new empployee object from class Employee
  const employee = new Employee(
    account,
    name,
    email,
    password,
    date,
    role,
    salary,
    hoursWorked
  );

  return employee;
};

// Hàm render danh sách nhân viên ra bảng
const renderEmployeeList = (data) => {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    const classification = employee.classify(); // Xếp loại nhân viên
    employee.calculateTotalSalary(); // Tính tổng lương
    content += `
        <tr>
            <td>${employee.account}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.date}</td>
            <td>${employee.role}</td>
            <td>${employee.totalSalary}</td> 
            <td>${classification}</td>
            <td>
                <button data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="editEmployee('${
                  employee.account
                }')">Sửa</button>
                <button onclick="deleteEmployee('${
                  employee.account
                }')" class="btn btn-danger">Xóa</button>
            </td>
        </tr>
        `;
  }
  getEleId("tableDanhSach").innerHTML = content;
};

// Lưu danh sách nhân viên vào localStorage
const setLocalStorage = () => {
  const dataString = JSON.stringify(employeeList.arr);
  localStorage.setItem("EMPLOYEE_LIST", dataString);
};
// Lấy danh sách nhân viên từ localStorage
const getLocalStorage = () => {
  const dataString = localStorage.getItem("EMPLOYEE_LIST");
  if (dataString) {
    const data = JSON.parse(dataString);
    employeeList.arr = data.map(emp => new Employee(
      emp.account,
      emp.name,
      emp.email,
      emp.password,
      emp.date,
      emp.role,
      emp.salary,
      emp.hoursWorked
    ));
    renderEmployeeList(employeeList.arr);
  }
};

// Thêm nhân viên mới
getEleId("btnThemNV").onclick = () => {
  const employee = getInfoEmployee();
  if (!employee) return;
  //add employee to employList
  employeeList.addEmployee(employee);
  //set storage
  setLocalStorage();
  //render
  renderEmployeeList(employeeList.arr);
};

// Xóa nhân viên
const deleteEmployee = (id) => {
  // them phương thức filter để giữ lại các nhân viên có account khác với id
  employeeList.arr = employeeList.arr.filter(
    (employee) => employee.account !== id
  );

  setLocalStorage();

  renderEmployeeList(employeeList.arr);
};
window.deleteEmployee = deleteEmployee;


// Chỉnh sửa nhân viên
const editEmployee = (account) => {
  // Tìm nhân viên theo tài khoản
  const employee = employeeList.arr.find((empl) => empl.account === account);

  if (employee) {
    // Hiển thị thông tin nhân viên lên form
    getEleId("tknv").value = employee.account;
    getEleId("name").value = employee.name;
    getEleId("email").value = employee.email;
    getEleId("password").value = employee.password;
    getEleId("datepicker").value = employee.date;
    getEleId("luongCB").value = employee.salary;
    getEleId("chucvu").value = employee.role;
    getEleId("gioLam").value = employee.hoursWorked || 0;

    // Đặt input tài khoản thành chỉ đọc
    getEleId("tknv").setAttribute("disabled", true);

    // Cập nhật giao di��n nút
    getEleId("btnThemNV").style.display = "none"; // Ẩn nút Thêm
    getEleId("btnCapNhat").style.display = "block"; // Hiển thị nút Cập nhật
  }
};
window.editEmployee = editEmployee;

// Cập nhật nhân viên sau khi chỉnh sửa
getEleId("btnCapNhat").onclick = () => {
  // Lấy thông tin từ form
  const updatedEmployee = getInfoEmployee();
  if (!updatedEmployee) return; // Dừng lại nếu thông tin không hợp lệ

  // Tìm vị trí nhân viên trong danh sách
  const index = employeeList.arr.findIndex(
    (empl) => empl.account === updatedEmployee.account
  );

  if (index !== -1) {
    // Cập nhật thông tin nhân viên tại vị trí tìm được
    employeeList.arr[index] = updatedEmployee;

    // Cập nhật LocalStorage và hiển thị danh sách
    setLocalStorage();
    renderEmployeeList(employeeList.arr);
  }

  // Reset form và điều chỉnh giao diện
  getEleId("btnCapNhat").style.display = "none";
  getEleId("btnThemNV").style.display = "block";
  getEleId("tknv").removeAttribute("disabled");

  // Đóng modal sau khi cập nhật bootrap4
  $("#myModal").modal("hide");
};

//btn dong
getEleId("btnDong").onclick = () => {
  //reset value
  getEleId("employeeForm").reset();
};
//EDIT UI ADD/UPDATE
getEleId("btnThem").onclick = function () {
  //edit tittle modal
  getEleId("header-title").innerHTML = "Thêm Nhân Viên";
  // Cập nhật giao diện nút
  getEleId("btnThemNV").style.display = "block"; // Ẩn nút Thêm
  getEleId("btnCapNhat").style.display = "none"; // Hiển thị nút Cập nhật
  //reset value
  getEleId("employeeForm").reset();
  //enabel input foodID
  getEleId("tknv").removeAttribute("disabled");
};


// Tìm kiếm loại nhân viên khi bấm vào nút tìm kiếm
getEleId("btnTimNV").onclick = () => {
    const keyword = getEleId("searchName").value.trim().toLowerCase();
    searchEmployeeByType(keyword);
};
// Hàm tìm kiếm nhân viên theo loại
const searchEmployeeByType = (type) => {
    let filteredEmployees = [];
    if (type === "xuất sắc") {
        filteredEmployees = employeeList.findEmployeeByRating("xuất sắc");
    } else if (type === "giỏi") {
        filteredEmployees = employeeList.findEmployeeByRating("giỏi");
    } else if (type === "khá") {
        filteredEmployees = employeeList.findEmployeeByRating("khá");
    } else if (type === "trung bình") {
        filteredEmployees = employeeList.findEmployeeByRating("trung bình");
    } else if (type === "") {
        filteredEmployees = employeeList.arr; 
    }
    renderEmployeeList(filteredEmployees);
};

// Lấy dữ liệu ban đầu từ localStorage
getLocalStorage();
