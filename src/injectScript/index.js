// 此文件自动执行，拥有dom和js（如window对象）操作权限

import {initOptimizeGitlab} from "./modules/baidu";

const url = window.location.href
// let settings = {}

// 获取配置项，根据配置项解析（可选）
// chrome.storage.local.get(['settings'], (result) => {
//     settings = result
// })

if (url.includes('www.baidu.com')) {
    initOptimizeGitlab()
}
