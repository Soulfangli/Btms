

// tableContent
const tableContent = () => import('./tableContent/index')
// dialogForm
const dialogForm = () => import('./dialogForm/index')
// echartsModule
const echartsModule = () => import('./echartsModule/index')
// treeModule
const treeModule = () => import('./treeModule/index')

module.exports = {
    tableContent,
    dialogForm,
    echartsModule,
    treeModule
}