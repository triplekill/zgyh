package com.chinamworld.bocmbci.biz.more;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.chinamworld.bocmbci.R;
import com.chinamworld.bocmbci.base.activity.BaseActivity;

public class MoreBaseActivity extends BaseActivity implements OnClickListener{
	
	/** 主视图布局 */
	protected LinearLayout tabcontent;// 主Activity显示
	/** 左侧返回按钮 */
	protected Button back;
	/** 右上角按钮 */
	protected Button btn_right,btn_login;
	/** 设置按钮 */
	protected Button ib_setting_btn;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
//		ActivityTaskManager.getInstance().addActivit(this);
		setContentView(R.layout.biz_more_activity_layout);
		// 初始化弹窗按钮
		initPulldownBtn();
		// 初始化底部菜单栏
		initFootMenu();
		//隐藏标题栏隐藏登录按钮
		hineTitlebarLoginButton();
		Button btn_show = (Button) findViewById(R.id.btn_show);
		btn_show.setVisibility(View.GONE);
		tabcontent = (LinearLayout) this.findViewById(R.id.sliding_body);
//		btn_login = (Button) findViewById(R.id.ib_top_right_login_btn);
//		btn_login.setVisibility(View.GONE);
		btn_right = (Button) findViewById(R.id.ib_top_right_btn);
		btn_right.setVisibility(View.GONE);
		back = (Button) findViewById(R.id.ib_back);
		ib_setting_btn = (Button) findViewById(R.id.ib_setting_btn);
		
		back.setOnClickListener(this);
	}
	
	/**
	 * 在slidingbody中引入自己布局文件
	 * 
	 * @param resource
	 * @return 引入布局
	 */
	public View addView(int resource) {
		View view = LayoutInflater.from(this).inflate(resource, null);
		tabcontent.addView(view);
		return view;
	}
	
	@Override
	protected void onResume() {
		super.onResume();
		hineTitlebarLoginButton();
	}

	/**
	 * 设置标题栏
	 * 
	 * @param title
	 */
	public void setTitle(String title) {
		TextView tvTitle = (TextView) findViewById(R.id.tv_title);
		tvTitle.setText(title);
	}

	@Override
	public void onClick(View arg0) {
		switch (arg0.getId()) {
		case R.id.ib_back:
			finish();
			break;
		default:
			break;
		}
		
	}

	@Override
	public ActivityTaskType getActivityTaskType() {
		// TODO Auto-generated method stub
		return ActivityTaskType.OneTask;
	}
	

	
}
