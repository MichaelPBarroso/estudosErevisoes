package br.com.estudos.view;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class TesteCalendar {

	public static void main(String[] args) throws ParseException {
		
		SimpleDateFormat dt = new SimpleDateFormat("dd-MM-yyyy");
		
		Calendar data = Calendar.getInstance();

		System.out.println(data);
		
		System.out.println(dt.format(data.getTime()));
	
		data.setTime(dt.parse("22-02-2018"));
		
		System.out.println(dt.format(data.getTime()));
		
	}

}
