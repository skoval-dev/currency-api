const {get_user, get_grades} = require("./utils/student_score");

//Promise example
const get_status = (user_id) => {
    let user;
    return get_user(user_id).then((temp_user) => {
        user = temp_user;
        return get_grades(user.college_id);
    }).then((grades) => {
        let average = 0;
        if(grades.length !== 0){
            average = grades.map((grade) => grade.grade).reduce((a,b) => a + b) / grades.length;
        }
        return `${user.name} has a ${average}% in the class`;
    });
};

get_user(3).then((user) => {
    console.log(user);
}).catch((e) => {
    console.log(e);
});

get_grades("VTK").then((grades) => {
    console.log(grades);
});

get_status(5).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});