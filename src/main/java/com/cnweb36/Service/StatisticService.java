package com.cnweb36.Service;

import java.time.Period;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.cnweb36.DTO.Response.StatisticResponse;
import com.cnweb36.DTO.Response.UserStatisticResponse;
import com.cnweb36.Entity.AccountEntity;
import com.cnweb36.Entity.OrderEntity;
import com.cnweb36.Entity.PaymentEntity;
import com.cnweb36.Entity.ProductEntity;
import com.cnweb36.Repository.AccountRepository;
import com.cnweb36.Repository.PaymentRepository;
import com.cnweb36.Repository.ProductRepository;

@Service
public class StatisticService {

	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private PaymentRepository paymentRepository;
	@Autowired
	private AccountRepository accountRepository;
	
	public int getCalender() {
		Date date = new Date();
	    Calendar calendar = Calendar.getInstance();
	    calendar.setTime(date);
	    return calendar.get(Calendar.DAY_OF_WEEK);
	}
	
	
	public StatisticResponse getstatistic() {
		StatisticResponse statisticResponse= new StatisticResponse();
		statisticResponse.setNumberAccount((int)accountRepository.count());
		int numberProduct=0;
		int numberRemain=0;
		for(ProductEntity p: productRepository.findAll()) {
			numberProduct++;
			numberRemain+=p.getRemainedCount();
		}
		statisticResponse.setNumberProduct(numberProduct);
		statisticResponse.setNumberRemain(numberRemain);
		
		int numbersold=0;
		Float[] income=new Float[13];
		for (int i = 0; i < income.length; i++) {
			income[i] = (float) 0;
        }
		float incomePerW= 0;
		int x=this.getCalender()-1 ; //số ngày kể từ chủ nhật
		if(x==0) x=7;
		// tính toán lợi nhuận trong năm 2024
		for(PaymentEntity p: paymentRepository.findAllSold(2024)) {
			Date date=new Date();
			long Day = (date.getTime()-p.getModifiedDate().getTime()) / (24 * 3600 * 1000);
			// tuần
			if(Day<=x) {
				for(OrderEntity o: p.getOrderList()) {
					numbersold+=o.getQuantity();
				}
				incomePerW+=p.getPay();
			}
			
			// doanh thu tháng
			int month=p.getModifiedDate().getMonth();
			income[month]+=p.getPay();
			
			statisticResponse.setIncome(income);
			statisticResponse.setIncomePerWeek(incomePerW);
			statisticResponse.setNumberSold(numbersold);
		}
		return statisticResponse;
	}
	
	public UserStatisticResponse getStaticUser(String username) {
		AccountEntity accountEntity=accountRepository.findEntityByUsername(username);
		if(accountEntity!=null) {
		List<PaymentEntity> listPay=paymentRepository.findAll(accountEntity, Sort.by("id").descending());
		Integer numberPay=0;
		Float paid=(float) 0.0;
		for(PaymentEntity p: listPay) {
			if(p.getStatus().compareTo("1")==0) {
				numberPay++;
				paid+=p.getPay();
			}
		}
		
		return new UserStatisticResponse(numberPay, paid);
		}else {
			return null;
		}
	}
}
