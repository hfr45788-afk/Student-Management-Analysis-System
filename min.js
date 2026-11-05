class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    // Calculate the average of three subjects
    calculateAverage() {
        const total = this.grades.reduce((sum, grade) => sum + grade, 0);
        return total / this.grades.length;
    }

    // Convert numerical average into a letter grade
    getGrade(average) {
        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }
    }

    // Check academic performance and attendance
    getFinalResult(average) {
        if (average >= 50 && this.attendance >= 75) {
            return "Passed";
        } else {
            return "Needs Review";
        }
    }
}

// Creating four different student records
const studentsList = [
    new Student(7312, "Mariam Adel", [42, 39, 45], 88),
    new Student(8456, "Youssef Hany", [47, 49, 51], 92),
    new Student(9261, "Salma Tarek", [91, 86, 94], 96),
    new Student(6148, "Omar Khaled", [68, 73, 65], 69)
];

// ==========================================
// PART 1: GENERAL STUDENT REPORT
// ==========================================

console.log("======================================");
console.log("       STUDENT MANAGEMENT SYSTEM");
console.log("======================================");

const studentReports = studentsList.map(student => {
    const average = student.calculateAverage();

    return {
        ID: student.id,
        Name: student.name,
        "Subject Grades": student.grades.join(" | "),
        "Attendance (%)": student.attendance,
        "Original Average": Number(average.toFixed(2)),
        "Letter Grade": student.getGrade(average),
        "Final Result": student.getFinalResult(average)
    };
});

console.log("\nALL STUDENTS REPORT");
console.table(studentReports);

// ==========================================
// PART 2: GRACE MARKS COMMITTEE
// ==========================================

// Select students whose original averages are between 40 and 49
const strugglingStudents = studentsList.filter(student => {
    const average = student.calculateAverage();
    return average >= 40 && average <= 49;
});

// Add five grace marks to the average without changing original data
const graceMarksReport = strugglingStudents.map(student => {
    const originalAverage = student.calculateAverage();

    const newAverage = Math.min(originalAverage + 5, 100);

    return {
        ID: student.id,
        Name: student.name,
        "Original Average": Number(originalAverage.toFixed(2)),
        "New Average": Number(newAverage.toFixed(2)),
        "Updated Grade": student.getGrade(newAverage),
        "Updated Result": student.getFinalResult(newAverage)
    };
});

// ==========================================
// PART 3: COMMITTEE RESULTS
// ==========================================

console.log("\n======================================");
console.log("          GRACE MARKS COMMITTEE");
console.log("======================================");

if (graceMarksReport.length > 0) {

    console.log("\nSTUDENTS ELIGIBLE FOR GRACE MARKS");
    console.table(graceMarksReport);

    // Calculate the sum of all new averages using reduce()
    const totalNewAverages = graceMarksReport.reduce(
        (total, student) => total + student["New Average"],
        0
    );

    // Calculate the average after applying grace marks
    const committeeAverage = totalNewAverages / graceMarksReport.length;

    console.log("--------------------------------------");
    console.log("Total Students:", graceMarksReport.length);
    console.log("Sum of New Averages:", totalNewAverages.toFixed(2));
    console.log("Average After Grace Marks:", committeeAverage.toFixed(2));
    console.log("--------------------------------------");

} else {

    // Prevent division by zero when no students qualify
    console.log("No students are eligible for grace marks.");
    console.log("Sum of New Averages: 0");
    console.log("Average After Grace Marks: 0");
}

// ==========================================
// PART 4: VERIFY ORIGINAL STUDENT DATA
// ==========================================

console.log("\n======================================");
console.log("       ORIGINAL DATA VERIFICATION");
console.log("======================================");

const verificationReport = studentsList.map(student => ({
    ID: student.id,
    Name: student.name,
    GradesUnchanged: student.grades.length === 3,
    "Original Average": student.calculateAverage().toFixed(2)
}));

console.table(verificationReport);

console.log("Original student objects and subject grades were not modified.");
console.log("             END OF REPORT");
