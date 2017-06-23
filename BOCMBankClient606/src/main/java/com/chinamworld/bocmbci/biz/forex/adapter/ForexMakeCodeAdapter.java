package com.chinamworld.bocmbci.biz.forex.adapter;

import java.util.List;
import java.util.Map;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.chinamworld.bocmbci.R;
import com.chinamworld.bocmbci.bii.constant.Forex;
import com.chinamworld.bocmbci.constant.LocalData;
import com.chinamworld.bocmbci.utils.StringUtil;

/**
 * 定制货币对的适配器
 */
public class ForexMakeCodeAdapter extends BaseAdapter {
	private final String TAG = "ForexMakeCodeAdapter";
	private Context context;
	/**
	 * 全部货币对
	 */
	private List<Map<String, String>> allCodeList = null;
	/**
	 * 标记list
	 */
	private List<Boolean> customerCoseList = null;

	public ForexMakeCodeAdapter(Context context) {
		this.context = context;
	}

	/**
	 * 用户没有定制货币对时，使用该构造方法
	 * 
	 * @param context
	 *            ：上下文
	 * @param allCodeList
	 *            ：所有的货币对
	 */
	public ForexMakeCodeAdapter(Context context, List<Map<String, String>> allCodeList) {
		this.context = context;
		this.allCodeList = allCodeList;
	}

	/**
	 * 用户定制货币对时，使用该构造方法
	 * 
	 * @param context
	 *            ：上下文
	 * @param allCodeList
	 *            ：所有的货币对
	 * @param customerCoseList
	 *            :标记list
	 */
	public ForexMakeCodeAdapter(Context context, List<Map<String, String>> allCodeList, List<Boolean> customerCoseList) {
		this.context = context;
		this.allCodeList = allCodeList;
		this.customerCoseList = customerCoseList;
	}

	public void dateChanged(List<Boolean> customerCoseList) {
		this.customerCoseList = customerCoseList;
		notifyDataSetChanged();
	}

	@Override
	public int getCount() {
		return allCodeList.size();
	}

	@Override
	public Object getItem(int position) {
		return allCodeList.get(position);
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@Override
	public View getView(final int position, View convertView, ViewGroup parent) {
		ViewHolder holder = null;
		if (convertView == null) {
			convertView = LayoutInflater.from(context).inflate(R.layout.forex_rate_make_code_list, null);
			holder = new ViewHolder();

			holder.sourceCode = (TextView) convertView.findViewById(R.id.rate_sourceCurCde);
			holder.middleImg = (TextView) convertView.findViewById(R.id.rate_middle);

			holder.targetCode = (TextView) convertView.findViewById(R.id.rate_targetCurCde);
			holder.okImg = (ImageView) convertView.findViewById(R.id.imageViewright);
			convertView.setTag(holder);
		} else {
			holder = (ViewHolder) convertView.getTag();
		}
		holder.sourceCode.setTag(position);
		holder.middleImg.setTag(position);
		holder.targetCode.setTag(position);
		holder.okImg.setTag(position);
		Map<String, String> allMap = allCodeList.get(position);
		// 显示所有的货币对
		String sourceCode = allMap.get(Forex.FOREX_MAKE_SOURCECURCDE_RES);
		String sourceDealCode = null;
		if (LocalData.CurrencyShort.containsKey(sourceCode)) {
			sourceDealCode = LocalData.CurrencyShort.get(sourceCode);
		}
		String targetCode = allMap.get(Forex.FOREX_MAKE_TARGETCURCDE_RES);
		String targetDealCode = null;
		if (LocalData.CurrencyShort.containsKey(targetCode)) {
			targetDealCode = LocalData.CurrencyShort.get(targetCode);
		}
		if(StringUtil.isNullOrEmpty(customerCoseList)){
			//用户没有定制货币对，显示全部的货币对
		}else{
			if (customerCoseList.get(position)) {
				holder.middleImg.setVisibility(View.GONE);
				holder.okImg.setVisibility(View.VISIBLE);
				((RelativeLayout) convertView).setBackgroundResource(R.drawable.bg_for_listview_item_half_black);
			} else {
				holder.middleImg.setVisibility(View.VISIBLE);
				holder.okImg.setVisibility(View.GONE);
				((RelativeLayout) convertView).setBackgroundResource(R.drawable.bg_for_listview_item_write);
			}
		}
		
		holder.sourceCode.setText(sourceDealCode);
		holder.targetCode.setText(targetDealCode);

		return convertView;

	}

	public int getNumber() {
		int len = customerCoseList.size();
		int number = 0;
		for (int i = 0; i < len; i++) {
			if (customerCoseList.get(i)) {
				number++;
			}
		}
		return number;
	}

	/**
	 * 内部类--控件
	 */
	public final class ViewHolder {
		/**
		 * sourceCode:源货币对
		 */
		private TextView sourceCode = null;
		/**
		 * targetCode:目标货币对
		 */
		private TextView targetCode;
		/**
		 * middleImg:中间图片
		 */
		private TextView middleImg;
		/**
		 * 选中货币对后显示
		 */
		private ImageView okImg;
	}

}
