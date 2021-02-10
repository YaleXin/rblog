/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
import axios from "axios"
import { Message } from "element-ui";
let innerHttp = axios.create({
	baseURL: '/api_serv',
	// 请求头部
	// headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
	// 超时时间
	timeout: 5000,
});

// 相应拦截
innerHttp.interceptors.response.use(
	response => {
		//拦截响应，做统一处理 
		switch (response.status) {

		}

		return response
	},
	//接口错误状态处理，也就是说无响应时的处理
	error => {
		let msg = error.response

		switch (msg.status) {
			case 400: Message({
				showClose: true,
				message: '发送数据错误',
				type: "error"
			});
			case 500: Message({
				showClose: true,
				message: '后端出错',
				type: "error"
			});
		}
		return error
	})


export default innerHttp