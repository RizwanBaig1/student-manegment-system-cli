import inquirer from "inquirer";
//define the student class 
class Student {
    static counter = 10000;
    id;
    name;
    cources;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.cources = []; //initialize an empty arry for cources
        this.balance = 100;
    }
    //method to enroll astudent in a course
    enroll_course(course) {
        this.cources.push(course);
    }
    // method to view astudent balance
    view_balance() {
        console.log(`Balance for ${this.name} :$${this.balance}`);
    }
    //metod to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fess paid successfully for ${this.name}`);
        console.log(`Remaining Balnce:$${this.balance}`);
    }
    //method to display student status
    show_status() {
        console.log(`id:${this.id}`);
        console.log(`name:${this.name}`);
        console.log(`cources:${this.cources}`);
        console.log(`balance:${this.balance}`);
    }
}
//defining a student maneger class to manges student
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //method to add a new Studensts
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student :${name} added successfuully.Sstudent ID: ${student.id}`);
    }
    //method to enroll astudent in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enroled in ${course} succesfully`);
        }
    }
    //method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found .Please enter a correct student ID");
        }
    }
    //method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found .Please enter a correct student ID");
        }
    }
    // method to display student status 
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //method to find a student by student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//Main Function to run the program
async function main() {
    console.log("welcome to student manegment system.");
    console.log("-".repeat(50));
    let student_manager = new Student_manager();
    //while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "slect an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "show Status",
                    "Exit",
                ]
            }
        ]);
        //Using Switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name"
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    },
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter astudent ID"
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting ...");
                process.exit();
        }
    }
}
//calling a main function 
main();
