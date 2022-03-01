/**
 *
 * @Author: 
 * @Date: 
 * @Last Modified by:   Vinson
 * @Last Modified time: 2021-11-14 19:00:14
 */

import { editSysResDict, delSysResDict, getSysResDict, findSysResDicts } from './service';
import { findSysResDictTypes } from '../sysResDictType/service';

import { zkTools } from 'zkFramework';
const { zkToolsUtils, zkToolsMsg } = zkTools;

const model = {
    namespace: 'mSysResDict',
    state: {
        gridData: undefined,    // 列表数据
        gridSelKeys: [],        // 列表选中的 KEY
        initFilter: {           // 初始过滤条件
            name: '',
        }, 
        filter: {},             // 过滤条件     
        pathname: null,         // 当前访问的地址路径
        optEntity: undefined,   // 当前操作实体
        page:{
            current:1,    // 当前行
            pageSize: zkToolsUtils.getPageSize(),  // 当前行数量
            total:0,      // 总行数
			showQuickJumper:true, // 是否可以快速跳转至某页
        },                // 分页器对象
    },
    subscriptions: { // 启动
        setup({ dispatch, history }) {  // eslint-disable-line
            // dispatch({type:'findList', payload:initFilter, callback:()=>{}});
        },
    },
    effects: { // action
        // 编辑 
        *editSysResDict({ payload, callback }, { call }) {

            if(zkJsUtils.isEmpty(payload.parentId)){
                delete payload.parentId;
            }

            let res = yield call(editSysResDict, payload);
            let f = errors=>{
                if (callback instanceof Function) {
                    callback.call(this, errors);
                }
            }
            switch(res.code){
                case "zk.0": 
                    zkToolsMsg.alertMsg(null, null, {type:"success", msg:res.msg});
                    f();
                    break;
                case "zk.000002": 
                    f(zkToolsMsg.makeFormFieldsErrorsByMapaData(res.data));
                    break;
            }
        },
        // 删除
        *delSysResDict({ payload, callback }, { call }) {
            let res = yield call(delSysResDict, payload);
            if(res.code == "zk.0"){
                zkToolsMsg.alertMsg(null, null, {type:"success", msg:res.msg});
            }
            if (callback instanceof Function) {
                callback.call(this, res);
            }
        },
        // 查询 详情
        *getSysResDict({ payload, isParent=false }, { call, put }) {
            let res = yield call(getSysResDict, payload);
            if (res.code == 'zk.0') {
                if(isParent){
                    let optEntity = {};
                    optEntity.parentId = res.data.pkId;
                    optEntity.parent = res.data;
                    optEntity.typeCode = res.data.typeCode;
                    optEntity.dictType = res.data.dictType;
                    yield put({ type: 'setState', payload: { optEntity: optEntity } });
                }else{
                    yield put({ type: 'setState', payload: { optEntity: res.data } });
                }
            }
        },
        /*** 查询 分页列表
         * @param {object} filter 过滤条件; {}
         * @param {object} page 分页; {pageNo: 0, pageSize:10}
         * @param {object} sorter 数组; {field:'xxx', order: ['ascend', 'descend']}
         * @param {callback} 回调整函数; ()=>{}
         */
        *findSysResDicts({ filter, page, sorter, callback }, { call, put, select }) {
            let params = zkToolsUtils.convertSortParam(filter, sorter); 
            if(page){
                page.pageNo = page.pageNo - 1;
                params = { ...params, ...zkToolsUtils.convertPageParam(page) };
            }
            let res = yield call(findSysResDicts, params);
            let restState = {}
            if (res.code == 'zk.0') {
                restState = {
                    "filter": params,
                    "gridData": res.data.result,
                    "page": {
                        "current": res.data.pageNo + 1,
                        "pageSize": res.data.pageSize,
                        // "pageSize": zkToolsUtils.getPageSize(),
                        "total": res.data.totalCount,
                        "showQuickJumper": true
                    }
                }
                yield put({ type: 'setState', payload: restState });
                if (callback instanceof Function) {
                    callback.call(this);
                }
            }
        },
        *findSysResDictTypes({ filter, page={}, sorter, callback }, { call, put, select }) {
            let params = zkToolsUtils.convertSortParam(filter, sorter); 
            page.pageNo = 0;
            page.pageSize = 333;
            params = { ...params, ...zkToolsUtils.convertPageParam(page) };

            let res = yield call(findSysResDictTypes, params);
            if (res.code == 'zk.0') {
                if (callback instanceof Function) {
                    callback.call(this, res.data.result||[]);
                }
            }
        },

    },
    reducers: { // 结果
        setState(state, action) {
            return { ...state, ...action.payload }
        }
    }
};

export default model;