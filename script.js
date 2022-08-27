
//----------------------API----------------------//
const Api = (() => {

    getCourses = () =>
        fetch('http://localhost:4232/courseList')
            .then(response => response.json())


    return {
        getCourses
    }

})()


//----------------------View----------------------//

const View = (() => {

    const domstr = {
        courseList: '#courseList',
        selectButton: '.selectButton',
        s: '.s'
    }

    const render = (ele, tmp) => {
        ele.innerHTML = tmp
    }




    const createTmp = arr => {
        let tmp = ''
        arr.forEach(course => {
            tmp +=
                `
            <li>
            <span>${course.courseName}</span>
            <span>Course Type:${course.required ? "Compulsory" : "Elective"}</span>
            <span class='s'>Course Credit:${course.credit}</span>
        </li>
            `

        });
        return tmp
    }



    return {
        domstr,
        render,
        createTmp,

    }
})()




//----------------------Model----------------------//

const Model = ((api, view) => {

    class Course {
        constructor(courseId, courseName, required, credit) {
            this.courseId = courseId
            this.courseName = courseName
            this.required = required
            this.credit = credit
        }
    }

    class State {
        #courseList = []


        get courseList() {
            return this.#courseList
        }
        set courseList(newlist) {
            this.#courseList = [...newlist]

            const ulContainer = document.querySelector(view.domstr.courseList)
            const tmp = view.createTmp(this.#courseList)
            view.render(ulContainer, tmp)

        }



    }


    const { getCourses } = Api

    return {
        getCourses,
        State
    }
})(Api, View)



//----------------------Controller----------------------//

const Controller = ((model, view) => {

    const state = new model.State()


    const init = () => {
        model.getCourses().then((courses) => {
            state.courseList = courses
        })


    }

    const Button = () => {
        const selectButton = document.querySelector(view.domstr.selectButton)
        selectButton.addEventListener('click', event => {
            alert('"You have chosen " + total credits + " credits for this semester. You cannot change once you submit. Do you want to confirm?"')
        })

    }




    const runAll = () => {
        init()
        Button()


    }

    return {
        runAll
    }
})(Model, View)

Controller.runAll()




