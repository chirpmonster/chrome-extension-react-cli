'use strict';

import helloWorld from './background/helloWorld.js'

init()

function init() {
    console.log('chrome-extensions-react-cli is powered by xuzhenghao')
    addTabListener()
    helloWorld.init()
}

function addTabListener() {
    //监听点击插件事件，并发送至content
    chrome.browserAction.onClicked.addListener((tab) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {type: "toggle-iframe"})
        })
    })
}
