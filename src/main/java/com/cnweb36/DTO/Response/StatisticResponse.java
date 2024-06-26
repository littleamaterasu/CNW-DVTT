package com.cnweb36.DTO.Response;

public class StatisticResponse {
	
	private Integer numberSold; // doanh số bán trong tuần
	private Integer numberRemain;// tổng số sp còn lại
	private Float[] income= new Float[13]; // lợi nhuận theo từng tháng 
	private Float incomePerWeek; // lợi nhuận từ chủ nhật tuần trc -> hiện tại
	private Integer numberAccount; //số lượng người dùng
	private Integer numberProduct;  //số lượng sảm phẩm( số loại sách)
	public Integer getNumberSold() {
		return numberSold;
	}
	public void setNumberSold(Integer numberSold) {
		this.numberSold = numberSold;
	}
	public Integer getNumberRemain() {
		return numberRemain;
	}
	public void setNumberRemain(Integer numberRemain) {
		this.numberRemain = numberRemain;
	}
	public Float getIncomePerWeek() {
		return incomePerWeek;
	}
	public void setIncomePerWeek(Float incomePerWeek) {
		this.incomePerWeek = incomePerWeek;
	}
	public Integer getNumberAccount() {
		return numberAccount;
	}
	public void setNumberAccount(Integer numberAccount) {
		this.numberAccount = numberAccount;
	}
	public Integer getNumberProduct() {
		return numberProduct;
	}
	public void setNumberProduct(Integer numberProduct) {
		this.numberProduct = numberProduct;
	}
	public Float[] getIncome() {
		return income;
	}
	public void setIncome(Float[] income) {
		this.income = income;
	}
	
	
	
}
