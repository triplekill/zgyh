package com.chinamworld.bocmbci.fidget;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebSettings.PluginState;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.chinamworld.bocmbci.R;
import com.chinamworld.bocmbci.base.application.BaseDroidApp;
import com.chinamworld.bocmbci.biz.chsliver.ZhongYinBaseActiviy;
import com.chinamworld.bocmbci.utils.ViewUtils;

/**
 * 掌聚生活加载网络页面WebView类
 * 
 * @author xiabaoying
 * 
 *         2013-4-26
 * 
 */

public class WebViewForUrl extends ZhongYinBaseActiviy {
	private WebView mWebView;
	private WebSettings mWebSettings;
	/** 主视图布局 */
	private LinearLayout tabcontent;// 主Activity显示
	/** 左侧返回按钮 */
	private Button back;

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		initView();
		tabcontent.setPadding(0, 0, 0, 0);

	}

	/**
	 * 初始化页面控件
	 */
	private void initView() {
		btn_right.setVisibility(View.GONE);
		tabcontent = (LinearLayout) this.findViewById(R.id.sliding_body);
		addView(R.layout.webview_layout);
		Button btn_show = (Button) findViewById(R.id.btn_show);
		btn_show.setVisibility(View.GONE);
		back = (Button) findViewById(R.id.ib_back);
		back.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				finish();
			}
		});
		mWebView = (WebView) findViewById(R.id.webView1);
		ViewUtils.initWebView(mWebView);
		mWebSettings = mWebView.getSettings();
//		mWebSettings.setPluginsEnabled(true);
		mWebSettings.setJavaScriptEnabled(true);
		

		mWebView.setWebViewClient(new WebViewClient() {     
		      @Override     
		      public boolean shouldOverrideUrlLoading(WebView view, String url)     
		      {     
		        view.loadUrl(url);     
		        return true;     
		      }     
		    });     
		/**
		 * 当WebView内容影响UI时调用WebChromeClient的方法
		 */
		mWebView.setWebChromeClient(new WebChromeClient() {

		
			/**
			 * 处理JavaScript Alert事件
			 */
			@Override
			public boolean onJsAlert(WebView view, String url, String message,
					final JsResult result) {
				// 用Android组件替换
				BaseDroidApp.getInstanse().showMessageDialog(message,
						new OnClickListener() {

							@Override
							public void onClick(View v) {
								BaseDroidApp.getInstanse()
										.dismissMessageDialog();
								result.confirm();
							}
						});
				return true;
			}

		});
		mWebSettings.setPluginState(PluginState.ON);
		// 设置支持JavaScript等
		mWebSettings.setBuiltInZoomControls(true);
		mWebSettings.setLightTouchEnabled(true);
		mWebSettings.setSupportZoom(false);
		mWebSettings.setSavePassword(false);
		mWebView.setHapticFeedbackEnabled(false);
		TextView tvTitle = (TextView) findViewById(R.id.tv_title);
		tvTitle.setText(getIntent().getStringExtra(BTCConstant.FIDGET_WEB_URL_NAME));
		mWebView.loadUrl(getIntent().getStringExtra(BTCConstant.FIDGET_WEB_URL));
		((Button) findViewById(R.id.ib_back))
				.setOnClickListener(new OnClickListener() {

					@Override
					public void onClick(View v) {
						// TODO Auto-generated method stub
						WebViewForUrl.this.finish();
					}
				});

	}

	/**
	 * 在slidingbody中引入自己布局文件
	 * 
	 * @param resource
	 * @return 引入布局
	 */
	public View addView(int resource) {
		View view = LayoutInflater.from(this).inflate(resource, null);
		tabcontent.removeAllViews();
		tabcontent.addView(view);
		return view;
	}
}