import React, {useState} from "react";
import {Button} from "antd";


export default function HelloWorld() {
    const [msg, setMsg] = useState([])

    //更新至background
    const sendMessageToBackground = () => {
        chrome.runtime.sendMessage({
            type: "helloBackground",
            data: 'hello,我来自iframe'
        }, (res) => {
            setMsg([...msg, res.data])
        })
    }

    return (
        <div>
            <Button onClick={sendMessageToBackground}>发送信息给background</Button>
            <Button onClick={()=>{console.log('我操作了window对象')}}>我可以操作JS</Button>
            {
                msg.map((item,index) => {
                    return <div key={index}>{item}</div>
                })
            }
        </div>
    )
}
