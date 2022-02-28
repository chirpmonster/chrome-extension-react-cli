function init() {
    //添加事件监听器
    addMessageListener()
}

function addMessageListener() {
    //监听请求
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === 'helloBackground') {
            console.log(request.data)
            sendResponse({data: '收到，我来自background'})
        }
    })
}

const helloWorld = {
    init
}

export default helloWorld
