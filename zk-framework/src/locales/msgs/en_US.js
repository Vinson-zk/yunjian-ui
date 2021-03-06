const messages = {

	// 全局未知错误信息
	"global.app.msg.success": "Success!",
	"global.app.msg.warning": "Unknown Warning!",
	"global.app.msg.error": "Unknown Error!",
	"global.app.msg.error.connect.failed": "Failed to connect to server!",
	"global.app.msg.error.500": "启禀主公！您要找的文臣武将睡着了！",
	"global.app.msg.error.404": "The request is not found！",
	"global.app.msg.error.403": "启禀主公！您还需要多读书才有权限求见贤能！",
	"global.app.msg.loading": "Loading ... ... ",
	"global.app.msg.info": "Unknown Message",
	"global.app.msg.fail": "Fail",
	"global.app.msg.beforeunload": "离开当前页后，所编辑的数据将不可恢复",
	"global.app.msg.leave":"确认离开此页面？",
	"global.app.msg.leave.save":"您确定要放弃编辑的内容，离开此页面？",

	// 全局标签
	"global.app.lable.platform": "Platform",

	// 全局名称定义
	"global.app.user.nickname": "Guest",
	"global.app.info.Unknown": "Unknown",
	"global.app.info.talbe.total": "Total",
	"global.app.info.talbe.total.rowNum": "RowNum",
	"global.app.info.demo": "demo",
	"global.app.info.declare": "declare",
	"global.app.info.code": "code",
	"global.app.info.yes": "Yes",
	"global.app.info.no": "No",
	"global.app.info.man": "Man",
	"global.app.info.woman": "Woman",
	"global.app.info.required": "required",
	"global.app.info.param": "param",
	"global.app.info.type": "type",
	"global.app.info.default": "default",
	"global.app.info.column.name": "columnName",
	"global.app.info.show": "Show",
	"global.app.info.hide": "Hide",
	"global.app.info.all": "All",
	"global.app.info.enable": "Enable",
	"global.app.info.disabled": "Disabled",

	// 单位全部名
	"global.unit.name.k": "k",
	"global.unit.name.w": "w",
	"global.unit.name.bn": "Bn",

	// 全局操作名称
	"global.opt.name._key_name": "Opt",
	"global.opt.name._key_settings": "Settings",
	"global.opt.name._key_add": "Add",
	"global.opt.name._key_add_child": "Add Child",
	"global.opt.name._key_edit": "Edit",
	"global.opt.name._key_del": "Del",
	"global.opt.name._key_login": "Login",
	"global.opt.name._key_logout": "Logout",
	"global.opt.name._key_search": "Search",
	"global.opt.name._key_reset": "Reset",
	"global.opt.name._key_select": "Select",
	"global.opt.name._key_back": "Back",
	"global.opt.name._key_ok": "确定",
	"global.opt.name._key_cancel": "Canel",
	"global.opt.name._key_save": "Save",
	"global.opt.name._key_submit": "Submit",
	"global.opt.name._key_next": "Next",
	"global.opt.name._key_view": "View",
	"global.opt.name._key_detail": "Detail",
	"global.opt.name._key_expanding": "Exp",
	"global.opt.name._key_compact": "Cpt",
	"global.opt.name._key_version_info": "VersionInfo",
	"global.opt.name._key_dependenceInfos_info": "Dependences Info",
	"global.opt.name._key_copy": "Copy",
	"global.opt.name._key_icon.select": "Select Icon",
	"global.opt.name._key_icon.select.opt": "Click Icon select",

	// 全局提示名称
	"global.alert.name._key_newMsg": "New({num})",

	// 全局提示消息
	"global.message.select.data": "Please select data!",
	"global.message.edit.exit": "您确定要放弃编辑，离开页面？",
	"global.message.edit.reset": "您确定要重置编辑内容？",
	"global.message.no.data": "No Data",
	"global.message.no.select.data": "Not select data",

	// 全局确认框内容
	"global.popconfirm.title.success": "Success",
	"global.popconfirm.title.info": "Info",
	"global.popconfirm.title.warning": "Warning",
	"global.popconfirm.title.error": "Error",
	"global.popconfirm.title.confirm": "Confirm",
	"global.popconfirm.name.okText": "OK",
	"global.popconfirm.name.cancelText": "Cancel",
	"global.popconfirm.content.delete": "Are you sure delete this task?",

	// 全局输入校验
	"global.data.validate.not.null":"不能为空",
	"global.data.validate.url":"请输入正确的 URL",
	"global.data.validate.string":"请输入字符类型",
	"global.data.validate.boolean":"请输入布尔类型",
	"global.data.validate.string.min":"输入字符串长度不能超过 {min}",
	"global.data.validate.string.max":"输入字符串长度不能超过 {max}",
	"global.data.validate.string.rang":"输入字符串长度须介于 {min} 到 {max} 之间",
	"global.data.validate.number":"请输入数字",
	"global.data.validate.number.min":"输入的数字不能小于 {min}",
	"global.data.validate.number.max":"输入的数字不能大于  {max}",
	"global.data.validate.number.rang":"输入的数字须介于 {min} 到 {max} 之间",
	"global.data.validate.integer":"请输入整数",
	"global.data.validate.integer.min":"请输入不小: {min} 的整数",
	"global.data.validate.integer.max":"请输入不大于: {max} 的整字",
	"global.data.validate.integer.rang":"请输入 {min} 到 {max} 之间的整数",
	"global.data.validate.object":"非法输入",
	"global.data.validate.enum":"请输入以下：{value} 选项之一",
	"global.data.validate.email":"请输入有效的邮箱地址",
	"global.data.validate.pattern":"非法输入",
	"global.data.validate.username":"e-请输入有效用户名[用户名只能是字母、下划线、数字；且必须以字母或下划开头]",
	"global.data.validate.phone":"请输入有效电话号码",
}

/** import 引入时；以下写法都可以 */
// module.exports = messages;
export default messages;
