require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndRemove('6162ac4e3f60e8d7f81a9cf4').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndRemove(id)
    const countDocs = await Task.countDocuments({completed: false})
    return countDocs
    
}

deleteTaskAndCount('6162ac553f60e8d7f81a9cf6').then((count) => {
    console.log(count)
}).catch(e => {
    console.log(e)
})