package com.chinamworld.bocmbci.biz.thridmanage.cecuritytrade;


/**
 * 借记卡关联确认信息页
 * 
 * @author wangmengmeng
 * 
 */
public class AccDebitCardConfirmActivity extends com.chinamworld.bocmbci.biz.acc.relevanceaccount.AccDebitCardConfirmActivity{/*
	

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		initLeftSideList(this, LocalData.thirdManangerLeftListData);
		// 右上角按钮点击事件
		setRightBtnClick(rightBtnClick);
		
	}
	@Override
	protected void setSelectedMenu(int clickIndex) {
		ActivityTaskManager.getInstance().removeAllSecondActivity();
		Intent it = new Intent();
		switch (clickIndex) {
		case 0:
			// 第三方存管
			it.setClass(this, CecurityTradeActivity.class);
			break;
		case 1:
			// 历史交易
			it.setClass(this, HistoryTradeActivity.class);
			break;
		case 2:
			// 台账
			it.setClass(this, PlatforAcctActivity.class);
			break;
		case 3:
			// 开户
			it.setClass(this, OpenAccActivity.class);
			break;
		}
		startActivity(it);
	}
	OnClickListener rightBtnClick = new OnClickListener() {

		@Override
		public void onClick(View v) {
			// // 回主页面
			ActivityTaskManager.getInstance().removeAllSecondActivity();
		}
	};
	@Override
	public void requestPsnRelevanceAccountResultCallback(Object resultObj) {
		super.requestPsnRelevanceAccountResultCallback(resultObj);
		Intent intent = new Intent(AccDebitCardConfirmActivity.this,
				AccDebitCardSuccessActivity.class);
		startActivityForResult(intent,
				ConstantGloble.ACTIVITY_REQUEST_ADDNEWACCC_CODE);
	}
	public ActivityTaskType getActivityTaskType() {
		// TODO Auto-generated method stub
		return ActivityTaskType.TwoTask;
	}
*/}
