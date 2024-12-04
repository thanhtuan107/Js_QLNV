class EmployeeList {
    constructor() {
        this.arr = []; // Mảng chứa danh sách nhân viên
    }

    // Thêm nhân viên
    addEmployee(employee) {
        this.arr.push(employee);
    }

    // Xóa nhân viên dựa vào tài khoản
    deleteEmployee(account) {
        this.arr = this.arr.filter((empl) => empl.account !== account);
    }

    // Tìm nhân viên theo loại (xếp loại)
    findEmployeeByRating(rating) {
        return this.arr.filter((empl) => empl.classify() === rating);
    }

    // Cập nhật thông tin nhân viên
    updateEmployee(updatedEmployee) {
        const index = this.arr.findIndex((empl) => empl.account === updatedEmployee.account);
        if (index !== -1) {
            this.arr[index] = updatedEmployee;
        }
    }
}

export default EmployeeList;




