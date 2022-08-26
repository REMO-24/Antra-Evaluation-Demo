
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
            <span>Course Type:${course.required}</span>
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

const Model = ((api) => {

    const { getCourses } = Api

    return {
        getCourses
    }
})(Api)



//----------------------Controller----------------------//

const Controller = ((model, view) => {

    const init = () => {
        const courseList = document.querySelector(view.domstr.courseList)
        model.getCourses().then(course => {
            const tmp = view.createTmp(course)
            view.render(courseList, tmp)
        })


    }

    const Button = () => {
        const selectButton = document.querySelector(view.domstr.selectButton)
        selectButton.addEventListener('click', event => {
            alert('"You have chosen " + total credits + " credits for this semester. You cannot change once you submit. Do you want to confirm?"')
        })

    }

    const addCredits = () => {
        let count = 0
        const s = document.querySelector(view.domstr.s)
        console.log
    }




    const runAll = () => {
        init()
        Button()
        addCredits()

    }


    return {
        runAll
    }
})(Model, View)

Controller.runAll()




