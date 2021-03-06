package com.chinamworld.bocmbci.biz.crcd.mycrcd.transquery;

import com.chinamworld.bocmbci.biz.crcd.CrcdBaseActivity;

/**
 * 未出账单查询列表
 * 
 * @author huangyuchao
 * 注释此类 因 dex方法超出限制  sunh 
 */
public class CrcdNoTransQueryListActivity extends CrcdBaseActivity {/*
	private static final String TAG = "CrcdNoTransQueryListActivity";
	private View view = null;

	Button sureButton;

	*//** 信用卡列表 *//*
	private ListView myListView;

	CrcdSetupAdapter adapter;
	static String accountId;
	static String accountNumber;
	static String currencyCode;
	private int accNum = 0;
	*//** 选择卡片标题 *//*
	private TextView tv_title;

	public static String accountType;
	*//** 有账户布局 *//*
	private RelativeLayout cardLayout;
	*//** 关联新账户布局 *//*
	private LinearLayout nocardLayout;
	*//** 关联新账户 *//*
	private Button btn_description;
	*//** 1-初始化 ,2-onActivityResult *//*
	private int ttag = 1;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		LogGloble.d(TAG, "OnCreate");
		// 为界面标题赋值
		setTitle(this.getString(R.string.mycrcd_setup_weichu_query));
		if (view == null) {
			view = addView(R.layout.crcd_mycard_setup_list);
		}
		setLeftSelectedPosition("myCrcd_3");
		back = (Button) findViewById(R.id.ib_back);
		back.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				Intent intent = new Intent(CrcdNoTransQueryListActivity.this, MyCardTransMenuActivity.class);
				startActivity(intent);
				finish();
			}
		});
		// 获取信用卡列表
		requestCrcdList();

	}

	*//** 初始化界面 *//*
	private void init() {

		cardLayout = (RelativeLayout) findViewById(R.id.cardLayout);
		nocardLayout = (LinearLayout) findViewById(R.id.nocardLayout);

		btn_description = (Button) findViewById(R.id.btn_description);
		btn_description.setOnClickListener(goRelevanceClickListener);

		tv_title = (TextView) findViewById(R.id.tv_service_title);
		tv_title.setText(getString(R.string.mycrcd_creditcard_choise_card));

		sureButton = (Button) findViewById(R.id.sureButton);
		sureButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if (accNum == 0) {
					String errorInfo = getResources().getString(R.string.crcd_notselectacard_error);
					BaseDroidApp.getInstanse().showInfoMessageDialog(errorInfo);
					return;
				} else {
					Intent it = new Intent(CrcdNoTransQueryListActivity.this, MyCrcdDetailActivity.class);
					it.putExtra(Crcd.CRCD_ACCOUNTID_RES, accountId);
					it.putExtra(Crcd.CRCD_ACCOUNTNUMBER_RES, accountNumber);
					it.putExtra(Crcd.CRCD_CURRENCYCODE, currencyCode);
					it.putExtra(Crcd.CRCD_NUM, ALL_REN);
					it.putExtra("fromQuery", "fromNoQuery");
					BaseDroidApp.getInstanse().getBizDataMap().put(ConstantGloble.CRCD_QUERY_LIST, bankSetupList);
					BaseDroidApp.getInstanse().getBizDataMap().put(ConstantGloble.IS_EBANK_0, 0);
					it.putExtra(ConstantGloble.ACC_POSITION, accNum - 1);
					LogGloble.d(TAG + " ------", "accNum----" + accNum);
					startActivity(it);

				}
			}
		});

		myListView = (ListView) view.findViewById(R.id.crcd_mycrcdlist);

		myListView.setOnItemClickListener(new OnItemClickListener() {

			@Override
			public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

				accNum = position + 1;
				accountId = (String) bankSetupList.get(position).get(Crcd.CRCD_ACCOUNTID_RES);
				accountNumber = (String) bankSetupList.get(position).get(Crcd.CRCD_ACCOUNTNUMBER_RES);
				currencyCode = (String) bankSetupList.get(position).get(Crcd.CRCD_CURRENCYCODE);
				accountType = (String) bankSetupList.get(position).get(Crcd.CRCD_ACCOUNTTYPE_RES);

				adapter = new CrcdSetupAdapter(CrcdNoTransQueryListActivity.this, bankSetupList, position);
				myListView.setAdapter(adapter);
				// bankSetupListmyListView.setSelection(position);
			}
		});
	}

	*//** 进行自助关联监听事件 *//*
	OnClickListener goRelevanceClickListener = new OnClickListener() {

		@Override
		public void onClick(View v) {

//			startActivityForResult((new Intent(CrcdNoTransQueryListActivity.this,
//					AccInputRelevanceAccountActivity.class)), ConstantGloble.ACTIVITY_REQUEST_ADDNEWACCC_CODE);
			
			BusinessModelControl.gotoAccRelevanceAccount(CrcdNoTransQueryListActivity.this, ConstantGloble.ACTIVITY_REQUEST_ADDNEWACCC_CODE, null);
			// finish();
		}
	};

	public void requestCrcdList() {
		// 通讯开始,展示通讯框
		BaseHttpEngine.showProgressDialogCanGoBack();
		BiiRequestBody biiRequestBody = new BiiRequestBody();
		biiRequestBody.setMethod(Crcd.QRY_CRCD_LIST_API);
		Map<String, Object> params = new HashMap<String, Object>();
		String[] s = { ZHONGYIN, GREATWALL, SINGLEWAIBI };
		params.put(Crcd.CRCD_ACCOUNTTYPE_REQ, s);
		biiRequestBody.setParams(params);
		HttpManager.requestBii(biiRequestBody, this, "requestCrcdListCallBack");
	}

	*//**
	 * 请求信用卡列表回调
	 *//*
	public void requestCrcdListCallBack(Object resultObj) {
		BiiResponse response = (BiiResponse) resultObj;
		List<BiiResponseBody> list = response.getResponse();
		BiiResponseBody body = list.get(0);
		List<Map<String, Object>> returnList = (List<Map<String, Object>>) body.getResult();
		if (bankSetupList != null && bankSetupList.size() > 0) {
			bankSetupList.clear();
		}
		for (int i = 0; i < returnList.size(); i++) {
			if (ZHONGYIN.equals(returnList.get(i).get(Crcd.CRCD_ACCOUNTTYPE_RES))
					|| GREATWALL.equals(returnList.get(i).get(Crcd.CRCD_ACCOUNTTYPE_RES))
					|| SINGLEWAIBI.equals(returnList.get(i).get(Crcd.CRCD_ACCOUNTTYPE_RES))) {
				bankSetupList.add(returnList.get(i));
			}
		}
		BaseHttpEngine.dissMissProgressDialog();
		if (ttag == 1) {
			init();
		}
		if (StringUtil.isNullOrEmpty(bankSetupList)) {
			nocardLayout.setVisibility(View.VISIBLE);
			cardLayout.setVisibility(View.GONE);
		} else {
			nocardLayout.setVisibility(View.GONE);
			cardLayout.setVisibility(View.VISIBLE);
			adapter = new CrcdSetupAdapter(this, bankSetupList, -1);
			myListView.setAdapter(adapter);

		}
	}


	@Override
	protected void onDestroy() {
		BaseHttpEngine.dissMissProgressDialog();
		super.onDestroy();
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		if (requestCode == ConstantGloble.ACTIVITY_REQUEST_ADDNEWACCC_CODE && resultCode == RESULT_OK) {
			// 请求信用卡列表
			ttag = 2;
			requestCrcdList();
		}
		super.onActivityResult(requestCode, resultCode, data);
	}

	@Override
	protected void onNewIntent(Intent intent) {
		if (adapter != null) {
			adapter.setSelectedPosition(-1);
		} else {
			adapter = new CrcdSetupAdapter(this, bankSetupList, -1);
			myListView.setAdapter(adapter);
		}
		accNum = 0;
		super.onNewIntent(intent);
	}
*/}
