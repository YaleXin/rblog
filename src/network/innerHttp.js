/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
import axios from "axios"
import { Message } from "element-ui";
import { MessageBox } from "element-ui";
let innerHttp = axios.create({
	baseURL: '/api',
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
		if (msg.status === undefined) {
			Message({
				showClose: true,
				message: '后端未部署',
				type: "error"
			});
		} else {
			switch (msg.status) {
				case 400: Message({
					showClose: true,
					message: '发送数据错误',
					type: "error"
				});
					break;
				case 480:
					MessageBox.alert('登录信息超时，请重新登录!', '登录超时', {
						confirmButtonText: '跳至登录界面',
						callback: action => {
							let url = window.location.href;
							if (url.indexOf('/admin/login') === -1) {
								let prefix = process.env.NODE_ENV === "production" ? "/blog" : "";
								window.location.href = prefix + '/admin/login'
							}
						}
					})
					break;
				case 500: Message({
					showClose: true,
					message: '后端出错',
					type: "error"
				}); break;
			}
		}
		return error
	})


export default innerHttp