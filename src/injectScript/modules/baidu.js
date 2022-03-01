export function initOptimizeGitlab() {
    let times = 0
    let timer = setInterval(() => {
        let contentDOM = document.getElementsByClassName('title-content-title')
        if (times > 10) {
            clearInterval(timer)
        }
        if (contentDOM.length > 0) {
            for (let i = 0; i < contentDOM.length; i++) {
                contentDOM[i].innerText = '插件运行成功'
                console.log('baidu的dom节点已修改')
                clearInterval(timer)
            }
        }
        times++
    }, 1000)
}
