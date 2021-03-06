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

import locales from "../../../locales/index";
import { zkTools, ZKCustomComponents, ZKOriginalComponents, ZKBusinessComponents } from "zkFramework";        
const { ZKSpin, ZKModal, ZKInput, ZKSelect, ZKInputNumber, ZKTable, ZKForm, ZKRow, ZKCol } = ZKOriginalComponents;
const { ZKEditForm, ZKInputJson, ZKOptRow, ZKEditJsonArray } = ZKCustomComponents;
const { ZKApplicationSystemSelect } = ZKBusinessComponents;
const { zkToolsMsg, zkToolsValidates, zkToolsNavAndMenu } = zkTools;

import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const FInitEditTableCell = ({ intl, editing, dataIndex, title, record, index, children, ...restProps }) => {

    let wrapperCol = {
        xs: { span: 24 },
        sm: { span: 24 }
    }

    let labelCol = {
        xs: { span: 24 },
        sm: { span: 0 },
    }

    return (
        <td {...restProps}>
            { editing ? (<ZKInput style = {{width: '100%'}} />) : children }
        </td>
    );
};

class CInitSysResFuncApiEdit extends Component {

    formRef = React.createRef();

    // 1???????????????
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            applicationSystems: []
        }
    }

    f_searchApplicationSystems = value=>{
        let { dispatch } = this.props;
        dispatch({ type: 'mSysResFuncApi/findApplicationSystems', filter: { code: value }, callback: datas=>{
            this.setState({applicationSystems: datas});
        }});
    }
	
	/** ?????? */
    f_save = (values, form, callbackFunc) => {
        this.props.dispatch({
            type: 'mSysResFuncApi/editSysResFuncApi', 
            payload: values, 
            callback: (errors) => {
                if(!errors){
                    this.setState({loading: true});
                }
                callbackFunc(errors);
            }
        });
    }

    /** ?????? JSX ?????? */
    render() {

        let { location, mApp, dispatch, mSysResFuncApi, intl, loading } = this.props;
        let { optEntity } = mSysResFuncApi;
        
		let lang = mApp.lang?mApp.lang:zkToolsMsg.getLocale();


        // ZKJson ???????????????????????????
        let f_makeObjRuls = required=>{
            let objRule = {};
            for(let index in locales){
                objRule[index] = zkToolsValidates.string(intl, 1, 64, required);
            }
            return objRule;
        }

        let columns = [
            {title: zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.param.name'), dataIndex:'pName', key:'pName'},
            {title: zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.param.type'), dataIndex:'pType', key:'pName'},
            {title: zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.param.isRequired'), dataIndex:'isRequired', key:'pName'},
            {title: zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.param.defaultValue'), dataIndex:'defaultValue', key:'pName'},
            {title: zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.param.remark'), dataIndex:'remark', key:'pName'},
        ]
        
        // <ZKTable dataSource={dataSource} columns={columns} ></ZKTable>
        let applicationSystemCodeSelLoading = loading.effects['mSysResFuncApi/findApplicationSystems'];
        let spinning = this.state.loading || loading.effects['mSysResFuncApi/editSysResFuncApi'] || loading.effects['mSysResFuncApi/getSysResFuncApi'];
        return (optEntity != null && mSysResFuncApi.pathname == location.pathname) && (
            <ZKSpin spinning={spinning === true} >
                <ZKEditForm ref = {this.formRef} history={history} data={optEntity}
                    saveFunc={this.f_save}
                    resetFunc={form => { return true; }}
                >
                    <ZKEditForm.Item name = "systemCode" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.systemCode')} 
                        rules = {[
                            zkToolsValidates.string(intl, 1, 64, true), 
                        ]} 
                    >
                        <ZKApplicationSystemSelect disabled = {optEntity.pkId?true:false} valueKey="code" />
                    </ZKEditForm.Item>
                    <ZKRow><ZKCol span = {24} >
                        <ZKEditForm.Item labelCol = {{span: 5}} wrapperCol = {{span:15}} name = "name" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.name')} 
                    		rules = {[
    							zkToolsValidates.object(intl, locales, undefined, f_makeObjRuls(true), true), 
                            ]} 
    					>
                            <ZKInputJson styleType="compact" primaryAttr={lang} attrs={locales} />
                    	</ZKEditForm.Item>
                    </ZKCol></ZKRow>
                    <ZKRow><ZKCol span = {24} >
                        <ZKEditForm.Item labelCol = {{span: 5}} wrapperCol = {{span:15}} name = "reqDesc" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.reqDesc')} 
                            rules = {[
                                zkToolsValidates.object(intl, locales, undefined, f_makeObjRuls(false)), 
                            ]} 
                        >
                            <ZKInputJson styleType="compact" primaryAttr={lang} attrs={locales} />
                        </ZKEditForm.Item>
                    </ZKCol></ZKRow> 
                    <ZKRow><ZKCol span = {24} >
                        <ZKEditForm.Item labelCol = {{span: 5}} wrapperCol = {{span:15}} name = "useContext" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.useContext')} 
                            rules = {[
                                zkToolsValidates.object(intl, locales, undefined, f_makeObjRuls(false)), 
                            ]} 
                        >
                            <ZKInputJson styleType="compact" primaryAttr={lang} attrs={locales} />
                        </ZKEditForm.Item>
                    </ZKCol></ZKRow>
                	<ZKRow><ZKCol span = {24} >
                        <ZKEditForm.Item labelCol = {{span: 5}} wrapperCol = {{span:15}} name = "code" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.code')} 
                    		rules = {[
    							zkToolsValidates.string(intl, 1, 64, true), 
                            ]} 
    					>
                            <ZKInput disabled = {optEntity.pkId?true:false} style={{ width: '100%' }} />
                    	</ZKEditForm.Item>
                    </ZKCol></ZKRow> 
                    <ZKEditForm.Item name = "reqMethods" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.reqMethods')} 
                        rules = {[{required: true}]} 
                    >
                        <ZKSelect style={{width:480}} className={"-"} mode="multiple" >
                            <ZKSelect.Option value={1}>GET</ZKSelect.Option>
                            <ZKSelect.Option value={2}>POST</ZKSelect.Option>
                            <ZKSelect.Option value={4}>DELETE</ZKSelect.Option>
                            <ZKSelect.Option value={8}>PUT</ZKSelect.Option>
                            <ZKSelect.Option value={16}>CONNECT</ZKSelect.Option>
                            <ZKSelect.Option value={32}>HEAD</ZKSelect.Option>
                            <ZKSelect.Option value={64}>OPTIONS</ZKSelect.Option>
                            <ZKSelect.Option value={128}>TRACE</ZKSelect.Option>
                        </ZKSelect>
                    </ZKEditForm.Item>
                    <ZKRow><ZKCol span = {24} >
                        <ZKEditForm.Item labelCol = {{span: 5}} wrapperCol = {{span:15}} name = "originalUri" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.originalUri')} 
                            rules = {[
                                zkToolsValidates.string(intl, 1, 512, true), 
                            ]} 
                        >
                            <ZKInput placeholder={zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.originalUri.placeholder')} style={{ width: '100%' }} />
                        </ZKEditForm.Item>
                    </ZKCol></ZKRow>
                    <ZKRow><ZKCol span = {24} >
                        <ZKEditForm.Item labelCol = {{span: 5}} wrapperCol = {{span:15}} name = "agentUri" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.agentUri')} 
                            rules = {[
                                zkToolsValidates.string(intl, 1, 512, true), 
                            ]} 
                        >
                            <ZKInput placeholder={zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.originalUri.placeholder')} style={{  width: '100%' }} />
                        </ZKEditForm.Item>
                    </ZKCol></ZKRow>
                    <ZKEditForm.Item name = "reqContentType" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.reqContentType')} 
                        rules = {[
                            zkToolsValidates.string(intl, 1, 128, true), 
                        ]} 
                    >
                        <ZKSelect className={"-"} style={{ width: 300 }} >
                            <ZKSelect.Option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</ZKSelect.Option>
                            <ZKSelect.Option value="application/json">application/json</ZKSelect.Option>
                            <ZKSelect.Option value="application/octet-stream">application/octet-stream</ZKSelect.Option>
                            <ZKSelect.Option value="text/html">text/html</ZKSelect.Option>
                            <ZKSelect.Option value="multipart/form-data">multipart/form-data</ZKSelect.Option>
                            <ZKSelect.Option value="text/plain">text/plain</ZKSelect.Option>
                        </ZKSelect>
                    </ZKEditForm.Item>
                    <ZKRow><ZKCol span = {24} >
                        <ZKEditForm.Item labelCol = {{span: 5}} wrapperCol = {{span:15}} name = "reqParamsDesc" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.reqParamsDesc')} 
                            rules = {[{required: true}]} 
                        >
                            <ZKEditJsonArray style={{'width':'900px'}} scroll={{'x':900, 'y':200}} columns = {columns} />
                        </ZKEditForm.Item>
                    </ZKCol></ZKRow>
                    <ZKEditForm.Item name = "resContentType" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.resContentType')} 
                        rules = {[
                            zkToolsValidates.string(intl, 1, 128, true), 
                        ]} 
                    >
                        <ZKSelect className={"-"} style={{ width: 300 }} >
                            <ZKSelect.Option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</ZKSelect.Option>
                            <ZKSelect.Option value="application/json">application/json</ZKSelect.Option>
                            <ZKSelect.Option value="application/octet-stream">application/octet-stream</ZKSelect.Option>
                            <ZKSelect.Option value="text/html">text/html</ZKSelect.Option>
                            <ZKSelect.Option value="multipart/form-data">multipart/form-data</ZKSelect.Option>
                            <ZKSelect.Option value="text/plain">text/plain</ZKSelect.Option>
                        </ZKSelect>
                    </ZKEditForm.Item>
                    <ZKRow><ZKCol span = {24} >
                    	<ZKEditForm.Item labelCol = {{span: 5}} wrapperCol = {{span:15}} name = "resDataDesc" label = {zkToolsMsg.msgFormatByIntl(intl, 'zk.sys.res.SysResFuncApi.resDataDesc')} 
                    		rules = {[{required: false}]} 
    					>
                            <ZKEditJsonArray style={{'width':'900px'}} scroll={{'x':900, 'y':200}} columns = {columns} />
                    	</ZKEditForm.Item>
                    </ZKCol></ZKRow>
            	</ZKEditForm>
            </ZKSpin>
        )
    }

    // 6????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????componentWillUnmount()???
    componentDidMount() {
        let { location, match, dispatch, mSysResFuncApi } = this.props;
        let { params } = match;
        if (mSysResFuncApi.pathname != location.pathname) {
        	// ????????????????????????????????????
            dispatch({ type: 'mSysResFuncApi/setState', payload: { pathname: location.pathname, optEntity: undefined } });
            if("_new" == params.pkId){
            	dispatch({ type: 'mSysResFuncApi/setState', payload: { optEntity: {} }});
            }else{
            	dispatch({ type: 'mSysResFuncApi/getSysResFuncApi', payload: { pkId: params.pkId } });
            }
        }
    }

    // 6?????????????????????????????????????????????????????????????????????????????????
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    // ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    componentWillUnmount() {
		// let { mSysResFuncApi, dvaApp } = this.props;
		// zkToolsNavAndMenu.unRegisterModel(dvaApp, [mSysResFuncApi]);
    }

}

// {onValuesChange:(props, changedValues, allValues) =>{
// 	console.log("--- ", props, changedValues, allValues)
// }}

export default injectIntl(connect(({ mApp, mSysResFuncApi, loading }) => ({ mApp, mSysResFuncApi, loading }))(CInitSysResFuncApiEdit));