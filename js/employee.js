class Employee {
    constructor(account, name, email, password, date, role, salary, hoursWorked) {
        this.account = account;       // Tài khoản
        this.name = name;             // Họ và tên
        this.email = email;           // Email
        this.password = password;     // Mật khẩu
        this.date = date;             // Ngày làm
        this.role = role;             // Chức vụ
        this.salary = salary;         // Lương cơ bản
        this.hoursWorked = hoursWorked;// Giờ làm
        this.totalSalary = 0;          // Tổng lương (có thể tính sau)
    }

    // Phương thức tính tổng lương
    calculateTotalSalary() {
        switch (this.role) {
            case "Sếp":
                this.totalSalary = this.salary * 3;
                break;
            case "Trưởng phòng":
                this.totalSalary = this.salary * 2;
                break;
            case "Nhân viên":
                this.totalSalary = this.salary;
                break;
            default:
                this.totalSalary = 0;
        }
    }

    // Phương thức tính loại nhân viên
    classify() {
        if (this.hoursWorked >= 192) {
            return "xuất sắc"; 
          } else if (this.hoursWorked >= 176) {
            return "giỏi"; 
          } else if (this.hoursWorked >= 160) {
            return "khá"; 
          } else {
            return "trung bình";
          }
    }
}

export default Employee;
