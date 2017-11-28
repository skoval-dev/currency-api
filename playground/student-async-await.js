const {get_user, get_grades} = require("./utils/student_score");

get_user(3).then((user) => {
    console.log(user);
}).catch((e) => {
    console.log(e);
});

get_grades("VTK").then((grades) => {
    console.log(grades);
});

//async await example
const get_status_alt = async (user_id) => {
    const user = await get_user(user_id);
    const grades = await get_grades(user.college_id);

    let average = 0;
    if(grades.length !== 0){
        average = grades.map((grade) => grade.grade).reduce((a,b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% in the class`;
};

get_status_alt(3).then((val) => {
    console.log(val);
}).catch((e) => console.log(e));