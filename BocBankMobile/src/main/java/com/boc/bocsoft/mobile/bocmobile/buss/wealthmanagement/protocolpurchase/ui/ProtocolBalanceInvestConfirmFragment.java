package com.boc.bocsoft.mobile.bocmobile.buss.wealthmanagement.protocolpurchase.ui;

import android.graphics.Typeface;
import android.os.Bundle;
import android.text.style.StyleSpan;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.boc.bocsoft.mobile.bii.common.BiiException.BiiResultErrorException;
import com.boc.bocsoft.mobile.bocmobile.R;
import com.boc.bocsoft.mobile.bocmobile.base.activity.MvpBussFragment;
import com.boc.bocsoft.mobile.bocmobile.base.utils.MoneyUtils;
import com.boc.bocsoft.mobile.bocmobile.base.utils.PublicCodeUtils;
import com.boc.bocsoft.mobile.bocmobile.base.widget.ClickableSpan.SpannableString;
import com.boc.bocsoft.mobile.bocmobile.buss.wealthmanagement.protocolpurchase.model.ProtocolModel;
import com.boc.bocsoft.mobile.bocmobile.buss.wealthmanagement.protocolpurchase.model.XpadApplyAgreementResultViewModel;
import com.boc.bocsoft.mobile.bocmobile.buss.wealthmanagement.protocolpurchase.model.XpadQueryRiskMatchViewModel;
import com.boc.bocsoft.mobile.bocmobile.buss.wealthmanagement.protocolpurchase.presenter.ProtocolBalanceInvestConfirmPresenter;
import com.boc.bocsoft.mobile.bocmobile.buss.wealthmanagement.protocolpurchase.utils.ProtocolConvertUtils;
import com.boc.bocsoft.mobile.bocmobile.buss.wealthmanagement.purchase.model.PurchaseModel;
import com.boc.bocsoft.mobile.bocmobile.buss.wealthmanagement.wealthproduct.model.WealthListBean;

import java.util.ArrayList;
import java.util.List;

/**
 * 余额理财投资确认页面
 * Created by zhx on 2016/11/10
 */
public class ProtocolBalanceInvestConfirmFragment extends MvpBussFragment<ProtocolBalanceInvestConfirmContact.Presenter> implements ProtocolBalanceInvestConfirmContact.View {
    private View rootView;
    private TextView tv_currency_and_proname;
    private TextView tv_sub_amount;
    private TextView tv_add_amount;
    private TextView tv_xpad_cash_remit;
    private LinearLayout ll_xpad_cash_remit;
    private TextView tv_total_period;
    private TextView tv_invest_time;
    private TextView tv_min_money;
    private TextView tv_max_money;
    private TextView tv_account_num;
    private TextView tv_prorisk;
    private TextView tv_custrisk;
    protected SpannableString txtRiskMessage;// 温馨提示
    private TextView tv_ok;
    private ProtocolModel mViewModel;
    private XpadApplyAgreementResultViewModel mResultViewModel;
    private ProtocolBalanceInvestConfirmPresenter confirmPresenter;
    private XpadQueryRiskMatchViewModel riskMatchViewModel;

    @Override
    protected View onCreateView(LayoutInflater mInflater) {
        rootView = mInflater.inflate(R.layout.fragment_protocol_balance_invest_confirm, null);
        return rootView;
    }

    @Override
    public void initView() {
        tv_currency_and_proname = (TextView) rootView.findViewById(R.id.tv_currency_and_proname); // 币种和产品名称
        tv_sub_amount = (TextView) rootView.findViewById(R.id.tv_sub_amount); // 申购起点金额
        tv_add_amount = (TextView) rootView.findViewById(R.id.tv_add_amount); // 追加申购起点金额
        tv_xpad_cash_remit = (TextView) rootView.findViewById(R.id.tv_xpad_cash_remit); // 钞汇标识
        ll_xpad_cash_remit = (LinearLayout) rootView.findViewById(R.id.ll_xpad_cash_remit);
        tv_total_period = (TextView) rootView.findViewById(R.id.tv_total_period); // 总期数
        tv_invest_time = (TextView) rootView.findViewById(R.id.tv_invest_time); // 首次投资日
        tv_min_money = (TextView) rootView.findViewById(R.id.tv_min_money); // 赎回触发金额
        tv_max_money = (TextView) rootView.findViewById(R.id.tv_max_money); // 购买触发金额
        tv_account_num = (TextView) rootView.findViewById(R.id.tv_account_num); // 理财交易账户
        tv_prorisk = (TextView) rootView.findViewById(R.id.tv_prorisk); // 产品风险级别
        tv_custrisk = (TextView) rootView.findViewById(R.id.tv_custrisk); // 客户风险级别
        txtRiskMessage = (SpannableString) rootView.findViewById(R.id.txt_risk_message); // 温馨提示
        tv_ok = (TextView) rootView.findViewById(R.id.tv_ok);
    }

    @Override
    public void initData() {
        mViewModel = getArguments().getParcelable(ProtocolSelectFragment.PROTOCOL_PURCHASE);
        mResultViewModel = getArguments().getParcelable("resultViewModel");
        riskMatchViewModel = getArguments().getParcelable("riskMatchViewModel");

        // 产品名称
        // 设置币种和产品名称
        String currency = PublicCodeUtils.getCurrency(mActivity, mViewModel.getCurCode());
        String prodName = mViewModel.getProdName();
        String proId = mViewModel.getProId();
        tv_currency_and_proname.setText("[" + currency + "]" + prodName + " (" + proId + ")");
        // 设置申购起点金额
        String subAmountFormat = MoneyUtils.transMoneyFormat(mViewModel.getSubAmount(), mViewModel.getCurCode());
        tv_sub_amount.setText(subAmountFormat);
        // 设置追加申购起点金额
        String addAmountFormat = MoneyUtils.transMoneyFormat(mViewModel.getAddAmount(), mViewModel.getCurCode());
        tv_add_amount.setText(addAmountFormat);
        // 钞/汇
        String cashRemit = mResultViewModel.getXpadCashRemit();
        if ("1".equals(cashRemit)) {
            tv_xpad_cash_remit.setText("现钞");
        } else if ("2".equals(cashRemit)) {
            tv_xpad_cash_remit.setText("现汇");
        } else {
            ll_xpad_cash_remit.setVisibility(View.GONE);
        }
        // 总期数
        String totalPeriod = mResultViewModel.getTotalPeriod();
        if ("-1".equals(totalPeriod)) {
            tv_total_period.setText("不限期");
        } else {
            tv_total_period.setText(totalPeriod);
        }
        // 首次投资日
        tv_invest_time.setText(mResultViewModel.getInvestTime());
        // 赎回触发金额
        tv_min_money.setText(MoneyUtils.transMoneyFormat(mResultViewModel.getMinAmount(), mViewModel.getCurCode()));
        // 购买触发金额
        tv_max_money.setText(MoneyUtils.transMoneyFormat(mResultViewModel.getMaxAmount(), mViewModel.getCurCode()));
        // 理财交易账户
        if (mViewModel.getAccountList() != null && mViewModel.getAccountList().size() > 0) {
            String accountNo = mViewModel.getAccountList().get(0).getAccountNo();
            String start = accountNo.substring(0, 4);
            String end = accountNo.substring(accountNo.length() - 4, accountNo.length());
            tv_account_num.setText(start + " ****** " + end);
        }
        // 产品风险级别
        String proRisk = riskMatchViewModel.getProRisk();
        String proRiskStr = "";
        switch (Integer.parseInt(proRisk)) {
            case 0:
                proRiskStr = "低风险产品";
                break;
            case 1:
                proRiskStr = "中低风险产品";
                break;
            case 2:
                proRiskStr = "中等风险产品";
                break;
            case 3:
                proRiskStr = "中高风险产品";
                break;
            case 4:
                proRiskStr = "高风险产品";
                break;
        }
        tv_prorisk.setText(proRiskStr);
        // 客户风险级别
        String custRisk = riskMatchViewModel.getCustRisk();
        String custRiskStr = "";
        switch (Integer.parseInt(custRisk)) {
            case 1:
                custRiskStr = "保守型投资者";
                break;
            case 2:
                custRiskStr = "稳健型投资者";
                break;
            case 3:
                custRiskStr = "平衡型投资者";
                break;
            case 4:
                custRiskStr = "成长型投资者";
                break;
            case 5:
                custRiskStr = "进取型投资者";
                break;
        }
        tv_custrisk.setText(custRiskStr);

        // 温馨提示
        setRiskMessage();
    }

    @Override
    public void setListener() {
        tv_ok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                XpadApplyAgreementResultViewModel viewModel = generateConfrimViewModel();
                showLoadingDialog("请稍候...");
                getPresenter().applyAgreementResult(viewModel);
            }
        });
    }

    /**
     * 设置温馨提示
     */
    private void setRiskMessage() {
        String riskMsg = ProtocolConvertUtils.convertRiskMsg(mContext, riskMatchViewModel.getRiskMsg());
        String riskMessage = riskMsg + getString(R.string.boc_protocol_smart_tips_added);
        txtRiskMessage.setTypeface(Typeface.defaultFromStyle(Typeface.BOLD));
        txtRiskMessage.setContent(getString(R.string.boc_confirm_hint), riskMessage, R.color.boc_text_color_red,
                R.color.boc_text_color_red, new StyleSpan(Typeface.DEFAULT.getStyle()));
    }

    // 生成确认信息的ViewModel
    private XpadApplyAgreementResultViewModel generateConfrimViewModel() {
        XpadApplyAgreementResultViewModel resultViewModel = new XpadApplyAgreementResultViewModel();

        resultViewModel.setProductCode(mViewModel.getProId()); // 产品代码
        resultViewModel.setInvestType(mResultViewModel.getInvestType()); // 投资方式
        resultViewModel.setXpadCashRemit(mResultViewModel.getXpadCashRemit()); // 钞汇标识
        resultViewModel.setTotalPeriod(mResultViewModel.getTotalPeriod()); // 总期数
        resultViewModel.setInvestTime(mResultViewModel.getInvestTime()); // 投资时间
        resultViewModel.setCurCode(mViewModel.getCurCode()); // 产品币种
        resultViewModel.setProdName(mViewModel.getProdName()); // 产品代码
        resultViewModel.setTimeInvestType(""); // 定投类型
        //        resultViewModel.setRedeemAmount("500.00"); // 定投金额（这个从哪里？？？N）
        //        resultViewModel.setTimeInvestRate("2"); // 定投频率（这个从哪里？？？N）
        //        resultViewModel.setTimeInvestRateFlag("m"); // 定投频率类型（这个从哪里？？？N）
        resultViewModel.setMinAmount(mResultViewModel.getMinAmount()); // 最低限额
        resultViewModel.setMaxAmount(mResultViewModel.getMaxAmount()); // 最高限额
        resultViewModel.setAccountId(mViewModel.getAccountList().get(0).getAccountId()); // 账户标识

        return resultViewModel;
    }

    @Override
    protected String getTitleValue() {
        return "确认信息";
    }

    @Override
    protected boolean isDisplayRightIcon() {
        return false;
    }

    @Override
    protected boolean getTitleBarRed() {
        return false;
    }

    @Override
    public void applyAgreementResultSuccess(XpadApplyAgreementResultViewModel viewModel) {
        mResultViewModel = viewModel;

        PurchaseModel purchaseModel = new PurchaseModel();
        purchaseModel.setProductKind(mViewModel.getProductKind());
        purchaseModel.setCurCode(mViewModel.getCurCode());
        purchaseModel.setPayAccountId(mViewModel.getAccountList().get(0).getAccountId());
        confirmPresenter.queryProductList(riskMatchViewModel.getProductCode(), riskMatchViewModel.getProRisk(), purchaseModel);
    }

    @Override
    public void applyAgreementResultFailed(BiiResultErrorException biiResultErrorException) {
        closeProgressDialog();
    }

    @Override
    public void queryProductListSuccess(List<WealthListBean> wealthListBeans) {
        closeProgressDialog();

        goToResultFragment(wealthListBeans);
    }

    @Override
    public void queryProductListFailed(BiiResultErrorException biiResultErrorException) {
        closeProgressDialog();

        goToResultFragment(null);
    }

    // 跳转到结果页面
    private void goToResultFragment(List<WealthListBean> wealthListBeans) {
        ArrayList<WealthListBean> likeList = new ArrayList<WealthListBean>();
        if (wealthListBeans != null) {
            likeList.addAll(wealthListBeans);

            // 去除重复的
            WealthListBean toDel = null;
            for(WealthListBean wealthListBean : likeList) {
                if(wealthListBean.getProdCode().equals(mViewModel.getProductId())) {
                    toDel = wealthListBean;
                    break;
                }
            }

            if (toDel != null) {
                likeList.remove(toDel);
            }
        }

        ProtocolBalanceInvestOperateResultFragment toFragment = new ProtocolBalanceInvestOperateResultFragment();
        Bundle bundle = new Bundle();
        bundle.putParcelable(ProtocolSelectFragment.PROTOCOL_PURCHASE, mViewModel);
        bundle.putParcelable("resultViewModel", mResultViewModel);
        bundle.putParcelableArrayList("likeList", likeList);
        toFragment.setArguments(bundle);
        start(toFragment);
    }

    @Override
    public void setPresenter(ProtocolBalanceInvestConfirmContact.Presenter presenter) {
    }

    @Override
    protected ProtocolBalanceInvestConfirmContact.Presenter initPresenter() {
        confirmPresenter = new ProtocolBalanceInvestConfirmPresenter(this);
        return confirmPresenter;
    }
}