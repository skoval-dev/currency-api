const users = [{
    id: 1,
    name: "Serhii",
    college_id: "VTK"
}, {
    id: 2,
    name: "Evhen",
    college_id: "VTK"
}, {
    id: 3,
    name: "Julia",
    college_id: "VNTU"
}];

const grades = [{
    id: 1,
    college_id: "VTK",
    grade: 93
}, {
    id: 2,
    college_id: "VTK",
    grade: 85
}, {
    id: 3,
    college_id: "VNTU",
    grade: 95
}];

const get_user = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === id;
        });

        if(user){
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}`)
        }
    });
};

const get_grades = (college_id) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.college_id === college_id));
    });
};


module.exports = {get_user, get_grades};