// 打开页面后会自动执行，仅拥有dom操作权限，无js操作权限，正常情况无需修改此文件，请至src/injectScript/index.js中修改
init()

function init() {
    let iframe;
    let iframeLoading = false;
    // 只在最顶层页面嵌入iframe
    if (window.self === window.top) {
        iframeLoading = true;
        //用于转发请求，因为iframe加载要时间
        chrome.runtime.onMessage.addListener((request, sender) => {
            if (request.to === 'iframe') {
                contentToIframe(request)
            }
        });
        document.onreadystatechange = () => {
            if (document.readyState === 'interactive') {
                initInjectScript()
            }
            if (document.readyState === 'complete') {
                initIframe()
            }
        }
    }

    //用于转发消息至iframe
    function contentToIframe(request, time = 1) {
        if (time > 10) {
            return
        }
        if (iframeLoading) {
            setTimeout(() => {
                contentToIframe(request, time + 1)
            }, 1000)
        } else {
            request.from = 'content'
            chrome.runtime.sendMessage(request);
        }
    }

    //初始化嵌入代码
    function initInjectScript() {
        let temp = document.createElement('script');
        temp.setAttribute('type', 'text/javascript');
        // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
        temp.src = chrome.extension.getURL('injectScript.js');
        document.head.appendChild(temp);
    }

    //初始化iframe
    function initIframe() {
        iframe = document.createElement('iframe');
        iframe.className = "chrome-extensions-iframe";
        iframe.style.setProperty('height', '100%', 'important');
        iframe.style.setProperty('width', '500px', 'important');
        iframe.style.setProperty('min-width', '1px', 'important');
        iframe.style.setProperty('position', 'fixed', 'important');
        iframe.style.setProperty('top', '0', 'important');
        iframe.style.setProperty('right', '0', 'important');
        iframe.style.setProperty('left', 'auto', 'important');
        iframe.style.setProperty('bottom', 'auto', 'important');
        iframe.style.setProperty('z-index', '9999999999999', 'important');
        iframe.style.setProperty('opacity', '0.9', 'important');
        iframe.style.setProperty('transform', 'translateX(520px)', 'important');
        iframe.style.setProperty('transition', 'all .4s', 'important');
        iframe.style.setProperty('box-shadow', '0 0 15px 2px rgba(0,0,0,0.12)', 'important');
        iframe.frameBorder = "none";
        iframe.src = chrome.runtime.getURL('iframe.html')
        document.body.appendChild(iframe);
        let show = false;
        iframeLoading = false;
        //开启关闭iframe
        chrome.runtime.onMessage.addListener((request, sender) => {
            if (request.type === 'toggle-iframe') {
                show = request.data ?? !show;
                iframe.style.setProperty('transform', show ? 'translateX(0)' : 'translateX(520px)', 'important');
            }
        });
    }
}

