package com.chinamworld.bocmbci.biz.bocinvt.queryagreement;

import java.util.HashMap;
import java.util.Map;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

import com.chinamworld.bocmbci.R;
import com.chinamworld.bocmbci.base.application.BaseDroidApp;
import com.chinamworld.bocmbci.bii.constant.BocInvt;
import com.chinamworld.bocmbci.biz.bocinvt.BociBaseActivity;
import com.chinamworld.bocmbci.biz.bocinvt.BociDataCenter;
import com.chinamworld.bocmbci.constant.ConstantGloble;
import com.chinamworld.bocmbci.constant.LocalData;
import com.chinamworld.bocmbci.http.engine.BiiHttpEngine;
import com.chinamworld.bocmbci.utils.PopupWindowUtils;
import com.chinamworld.bocmbci.utils.StringUtil;

/**
 * 自动投资协议修改确认页面
 * 
 * @author wangmengmeng
 * 
 */
public class ZextendAgreeEditConfirmActivity extends BociBaseActivity {
	/** 协议申请页 */
	private View view;
	/** 协议序号 */
	private TextView tv_contractSeq;
	/** 理财交易账户 */
	private TextView tv_prodNum;
	/** 产品代码 */
	private TextView tv_prodCode;
	/** 产品名称 */
	private TextView tv_prodName;
	/** 认购起点金额 */
	private TextView tv_buyStartingAmount;
	/** 追加认申购起点金额——后 */
	private TextView tv_appendStartingAmount;
	/** 追加认申购起点金额——前 */
	private TextView tv_appending;
	/** 币种 */
	private TextView tv_curCode;
	/** 投资方式 */
	private TextView tv_investType;
	/** 总期数 */
	private TextView tv_totalPeriod;

	/** 定投开始日 */
	private TextView tv_investTime;
	/** 产品详情 */
	private Map<String, Object> detailMap;
	/** 下一步 */
	private Button btn_next;
	/** 投资协议申请填写信息 */
	private Map<String, String> agreeInputMap = new HashMap<String, String>();
	/** 产品风险级别 */
	private TextView tv_pro_risk;
	/** 客户风险级别 */
	private TextView tv_cust_risk;
	/** 等级是否匹配 */
	private Map<String, Object> riskMatchMap;
	/** 底部提示语 */
	private TextView tv_confirm;
	/** 最低限额 */
	private String minAmount;
	/** 最高限额 */
	private String maxAmount;
	/** 最低限额 */
	private TextView tv_minAmount;
	/** 最高限额 */
	private TextView tv_maxAmount;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// 为界面标题赋值
		setTitle(this.getString(R.string.bocinvt_agree_zidong));
		// 添加布局
		view = addView(R.layout.boc_agree_zidong_edit_confirm);
		// 界面初始化
		init();

	}

	/**
	 * 初始化界面
	 */
	private void init() {
		agreeInputMap = BociDataCenter.getInstance().getAgreeInputMap();
		detailMap = BociDataCenter.getInstance().getPeriodDetailMap();
		riskMatchMap = BociDataCenter.getInstance().getRiskMatchMap();
		/** 协议序号 */
		tv_contractSeq = (TextView) view.findViewById(R.id.tv_contractSeq);
		/** 理财交易账户 */
		tv_prodNum = (TextView) view.findViewById(R.id.tv_number);
		/** 产品代码 */
		tv_prodCode = (TextView) view.findViewById(R.id.tv_prodCode);
		/** 产品名称 */
		tv_prodName = (TextView) view.findViewById(R.id.tv_prodName);
		/** 认购起点金额 */
		tv_buyStartingAmount = (TextView) view
				.findViewById(R.id.tv_buyStartingAmount);
		/** 追加认申购起点金额——后 */
		tv_appendStartingAmount = (TextView) view
				.findViewById(R.id.tv_appendStartingAmount);
		/** 追加认申购起点金额——前 */
		tv_appending = (TextView) view.findViewById(R.id.appendStrating);
		/** 币种 */
		tv_curCode = (TextView) view.findViewById(R.id.tv_curCode);
		/** 投资方式 */
		tv_investType = (TextView) view.findViewById(R.id.tv_investType);
		/** 总期数 */
		tv_totalPeriod = (TextView) view.findViewById(R.id.tv_totalPeriod);
		/** 最低限额 */
		tv_minAmount = (TextView) view.findViewById(R.id.tv_minAmount);
		/** 最高限额 */
		tv_maxAmount = (TextView) view.findViewById(R.id.tv_maxAmount);
		/** 定投开始日 */
		tv_investTime = (TextView) view.findViewById(R.id.tv_investTime);
		tv_confirm = (TextView) view.findViewById(R.id.tv_confirm);
		// 赋值
		tv_contractSeq.setText((String) agreeInputMap
				.get(BocInvt.BOC_AUTO_CONTRACTSEQ_REQ));
		PopupWindowUtils.getInstance().setOnShowAllTextListener(this,
				tv_contractSeq);
		tv_prodNum.setText(StringUtil.getForSixForString((String) detailMap
				.get(BocInvt.BANCACCOUNT)));
		PopupWindowUtils.getInstance().setOnShowAllTextListener(this,
				tv_prodNum);
		tv_prodCode.setText((String) agreeInputMap
				.get(BocInvt.BOC_AUTO_SERIALCODE_REQ));
		PopupWindowUtils.getInstance().setOnShowAllTextListener(this,
				tv_prodCode);
		tv_prodName.setText((String) agreeInputMap
				.get(BocInvt.BOC_AUTO_SERIALNAME_REQ));
		PopupWindowUtils.getInstance().setOnShowAllTextListener(this,
				tv_prodName);
		tv_buyStartingAmount.setText(StringUtil.parseStringCodePattern(
				(String) agreeInputMap.get(BocInvt.BOC_AUTO_CURCODE_REQ),
				(String) detailMap.get(BocInvt.BOC_EXTEND_SUBPAMT_RES), 2));
		tv_appendStartingAmount.setText(StringUtil.parseStringCodePattern(
				(String) agreeInputMap.get(BocInvt.BOC_AUTO_CURCODE_REQ),
				(String) detailMap.get(BocInvt.BOC_EXTEND_ADDAMT_RES), 2));
		PopupWindowUtils.getInstance().setOnShowAllTextListener(this,
				tv_appending);
		// 判断币种
		if (LocalData.Currency.get(
				(String) agreeInputMap.get(BocInvt.BOC_AUTO_CURCODE_REQ))
				.equals(ConstantGloble.ACC_RMB)) {
			tv_curCode.setText(LocalData.Currency.get((String) agreeInputMap
					.get(BocInvt.BOC_AUTO_CURCODE_REQ)));
		} else {
			tv_curCode.setText(LocalData.Currency.get((String) agreeInputMap
					.get(BocInvt.BOC_AUTO_CURCODE_REQ))
					+ agreeCashRemitMap.get(agreeInputMap
							.get(BocInvt.BOC_AUTO_CASHREMIT_REQ)));
		}
		tv_investType.setText(investTypeMap.get("1"));
		/** 产品风险级别 */
		tv_pro_risk = (TextView) view.findViewById(R.id.tv_pro_risk);
		/** 客户风险级别 */
		tv_cust_risk = (TextView) view.findViewById(R.id.tv_cust_risk);
		tv_pro_risk.setText(LocalData.boci_prodRisklvlMap.get(String
				.valueOf(riskMatchMap.get(BocInvt.BOCINVT_MATCH_PRORISK_RES))));
		tv_cust_risk
				.setText(LocalData.riskLevelMap.get(String.valueOf(riskMatchMap
						.get(BocInvt.BOCINVT_MATCH_CUSTRISK_RES))));
		tv_investTime.setText(agreeInputMap.get(BocInvt.BOC_AUTO_LASTDATE_REQ));
		String period = agreeInputMap.get(BocInvt.BOC_AUTO_TOTALPERIOD_REQ);
		if (period.equals(NOPERIODSTR)) {
			// 不限期
			tv_totalPeriod.setText(this.getString(R.string.bocinvt_noperiod));
		} else {
			tv_totalPeriod.setText(period);
		}
		// （极低风险级别显示1）（低风险级别显示2）（中等风险或更高级别显示3）
		String type = (String) riskMatchMap
				.get(BocInvt.BOCINVT_MATCH_RISKMSG_RES);
		if(!StringUtil.isNullOrEmpty(type)){
		if (type.equals(investTypeSubList.get(0))) {
			tv_confirm.setText(this
					.getString(R.string.bocinvt_confirm_bottom_1));
		} else if (type.equals(investTypeSubList.get(1))) {
			tv_confirm.setText(this
					.getString(R.string.bocinvt_confirm_bottom_2));
		} else {
			tv_confirm.setText(this
					.getString(R.string.bocinvt_confirm_bottom_3));
		}
		}
		TextView tv_finish_period = (TextView) view
				.findViewById(R.id.tv_finish_period);
		tv_finish_period.setText((String) detailMap
				.get(BocInvt.BOC_EXTEND_PERIOD_RES));
		minAmount = agreeInputMap.get(BocInvt.BOC_AUTO_MINAMOUNT_REQ);
		tv_minAmount.setText(StringUtil.parseStringCodePattern(
				(String) agreeInputMap.get(BocInvt.BOC_AUTO_CURCODE_REQ),
				minAmount, 2));
		maxAmount = agreeInputMap.get(BocInvt.BOC_AUTO_MAXAMOUNT_REQ);
		tv_maxAmount.setText(StringUtil.parseStringCodePattern(
				(String) agreeInputMap.get(BocInvt.BOC_AUTO_CURCODE_REQ),
				maxAmount, 2));
		initListener();
	}

	/**
	 * 初始化监听事件
	 */
	private void initListener() {
		btn_next = (Button) view.findViewById(R.id.btn_next);
		btn_next.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				requestCommConversationId();
				BiiHttpEngine.showProgressDialog();
			}
		});
	}

	@Override
	public void requestCommConversationIdCallBack(Object resultObj) {
		super.requestCommConversationIdCallBack(resultObj);
		requestPSNGetTokenId((String) BaseDroidApp.getInstanse()
				.getBizDataMap().get(ConstantGloble.CONVERSATION_ID));

	}

	@Override
	public void requestPSNGetTokenIdCallBack(Object resultObj) {
		super.requestPSNGetTokenIdCallBack(resultObj);
		requestPsnXpadAutomaticAgreementMaintainResult("1");
	}

	@Override
	public void requestPsnXpadAutomaticAgreementMaintainResultCallBack(
			Object resultObj) {
		super.requestPsnXpadAutomaticAgreementMaintainResultCallBack(resultObj);
		// 进入成功页面
		Intent intent = new Intent(this, ZextendAgreeEditSuccessActivity.class);
		startActivity(intent);
	}
}
