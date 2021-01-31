/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
import axios from "axios"

let innerHttp = axios.create({
	baseURL: '/api',
	// 请求头部
    // headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
   	// 超时时间
	timeout: 5000,
});




export default innerHttp