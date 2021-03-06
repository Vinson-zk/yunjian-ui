/**
 *
 * @Author: 
 * @Date: 
 * @Last 
 * @Last 
 */


import React, { Component } from 'react';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';

import { zkTools } from 'zkFramework';
const { zkToolsUtils, zkToolsMsg } = zkTools;

import SearchItem from "./search.js";
import GridItem from "./grid.js";

import zkStyles from 'zkFramework/css/styles.less';

import locales from "../../../locales/index";

class CInitPayGetOrderIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`${zkStyles.display_flex_col} ${zkStyles.flex_1_auto}`} >
                <SearchItem {...this.props} locales={locales} />
                <GridItem {...this.props} />
            </div>
        );
    }

    // 6、创建时；安装组件（插入树中）后立即调用；此方法是设置任何订阅的好地方。如果您这样做，请不要忘记取消订阅componentWillUnmount()。
    componentDidMount() {
        let { location, dispatch, mPayGetOrder } = this.props;
		if (location.pathname != mPayGetOrder.pathname) {
			dispatch({ type: 'mPayGetOrder/setState', payload: { pathname: location.pathname } });
			dispatch({ type: "mPayGetOrder/findPayGetOrders", filter: mPayGetOrder.filter, pagination: mPayGetOrder.pagination, callback: e => { } })
		}
    }
}

export default injectIntl(connect(({ mApp, mPayGetOrder, loading }) => ({ mApp, mPayGetOrder, loading }))(CInitPayGetOrderIndex));