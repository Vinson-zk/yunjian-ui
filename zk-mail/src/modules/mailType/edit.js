/**
 *
 * @Author: 
 * @Date: 
 * @Last 
 * @Last 
 */

import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'dva';
import { Icon } from "antd";

import locales from "../../locales/mail/index.js";
import { zkTools, ZKCustomComponents, ZKOriginalComponents } from "zkFramework";    

// ZKOriginalComponents
const {ZKSpin, ZKModal, ZKInput, ZKSelect, ZKRow, ZKCol } = ZKOriginalComponents;
// ZKCustomComponents
const {ZKEditForm, ZKInputJson, } = ZKCustomComponents;
// zkTools
const {zkToolsMsg, zkToolsValidates, zkToolsNavAndMenu } = zkTools;

class CInitMailTypeEdit extends Component {

    formRef = React.createRef();

    // 1、构造函数
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    };
	
	/** 保存 */
    f_save = (values, form, callbackFunc) => {
        this.props.dispatch({
            type: 'mMailType/editMailType', 
            payload: values, 
            callback: (errors) => {
                if(!errors){
                    this.setState({loading: true});
                }
                callbackFunc(errors);
            }
        });
    };

    /** 返回 JSX 元素 */
    render() {

        let { location, mApp, dispatch, mMailType, intl, loading } = this.props;
        let { optEntity } = mMailType;
        
		let lang = mApp.lang?mApp.lang:zkToolsMsg.getLocale();


        // ZKJson 自定义校验规则对象
        let f_makeObjRuls = required=>{
            let objRule = {};
            for(let index in locales){
                objRule[index] = zkToolsValidates.string(intl, 1, 64, required);
            }
            return objRule;
        }
        
        let spinning = this.state.loading || loading.effects['mMailType/editMailType'] || loading.effects['mMailType/getMailType'];
        return (optEntity != null && mMailType.pathname == location.pathname) && (
            <ZKSpin spinning={spinning === true} >
                <ZKEditForm ref = {this.formRef} history={history} data={optEntity}
                    saveFunc={this.f_save}
                    resetFunc={form => { return true; }}
                >
                	<ZKEditForm.Item name = "typeCode" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.mail.MailType.typeCode')} 
                		rules = {[
							zkToolsValidates.string(intl, 1, 64, true), 
                        ]} 
					>
                        <ZKInput placeholder={zkToolsMsg.msgFormatByIntl(intl, 'zk.mail.MailType.typeCode.placeholder')}
                        	disabled = {optEntity.pkId?true:false} />
                	</ZKEditForm.Item>
                	<ZKEditForm.Item name = "status" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.mail.MailType.status')} 
                		rules = {[
							zkToolsValidates.integer(intl, 0, 999999999, true), 
                        ]} 
					>
                        <ZKSelect placeholder={zkToolsMsg.msgFormatByIntl(intl, 'zk.mail.MailType.status.placeholder')} >
                            <ZKSelect.Option value={0}>{zkToolsMsg.msgFormatByIntl(intl, 'zk.mail.MailType.status.0')}</ZKSelect.Option>
                            <ZKSelect.Option value={1}>{zkToolsMsg.msgFormatByIntl(intl, 'zk.mail.MailType.status.1')}</ZKSelect.Option>
                        </ZKSelect>
                	</ZKEditForm.Item>
                    <ZKRow><ZKCol span = {24} >
                        <ZKEditForm.Item labelCol = {{span: 5}} wrapperCol = {{span:15}} name = "typeName" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.mail.MailType.typeName')} 
                            rules = {[
                                zkToolsValidates.object(intl, locales, undefined, f_makeObjRuls(true), true), 
                            ]} 
                        >
                            <ZKInputJson placeholder={zkToolsMsg.msgFormatByIntl(intl, 'zk.mail.MailType.typeName.placeholder')}
                                styleType="compact" primaryAttr={lang} attrs={locales} />
                        </ZKEditForm.Item>
                    </ZKCol></ZKRow>
                    <ZKRow><ZKCol span = {24} >
                        <ZKEditForm.Item labelCol = {{span: 5}} wrapperCol = {{span:15}} name = "typeDesc" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.mail.MailType.typeDesc')} 
                    		rules = {[
    							zkToolsValidates.object(intl, locales, undefined, f_makeObjRuls(false)), 
                            ]} 
    					>
                            <ZKInputJson placeholder={zkToolsMsg.msgFormatByIntl(intl, 'zk.mail.MailType.typeDesc.placeholder')}
                            	styleType="compact" primaryAttr={lang} attrs={locales} />
                    	</ZKEditForm.Item>
                    </ZKCol></ZKRow>
            	</ZKEditForm>
            </ZKSpin>
        )
    }

    // 6、创建时；安装组件（插入树中）后立即调用；此方法是设置任何订阅的好地方。如果您这样做，请不要忘记取消订阅componentWillUnmount()。
    componentDidMount() {
        let { location, match, dispatch, mMailType } = this.props;
        let { params } = match;
        if (mMailType.pathname != location.pathname) {
        	// 第一次进来或地址栏改变了
            dispatch({ type: 'mMailType/setState', payload: { pathname: location.pathname, optEntity: undefined } });
            if("_new" == params.pkId){
            	dispatch({ type: 'mMailType/setState', payload: { optEntity: {} } });
            }else{
            	dispatch({ type: 'mMailType/getMailType', payload: { pkId: params.pkId } });
            }
        }
    }

    // 6、修改时；更新发生后立即调用。初始渲染不会调用此方法。
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    // 卸载时；在卸载和销毁组件之前立即调用。在此方法中执行任何必要的清理，例如使计时器无效，取消网络请求或清除在其中创建的任何订阅
    componentWillUnmount() {
		// let { mMailType, dvaApp } = this.props;
		// zkToolsNavAndMenu.unRegisterModel(dvaApp, [mMailType]);
    }

}

// {onValuesChange:(props, changedValues, allValues) =>{
// 	console.log("--- ", props, changedValues, allValues)
// }}

export default injectIntl(connect(({ mApp, mMailType, loading }) => ({ mApp, mMailType, loading }))(CInitMailTypeEdit));