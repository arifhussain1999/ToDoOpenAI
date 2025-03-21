package com.example.ToDo;

import com.example.ToDo.Util.MyAnalyzer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ToDoApplication {

	public static void main(String[] args) {

		SpringApplication.run(ToDoApplication.class, args);
		Set<String> strings = new HashSet<>();
		strings.add("for");
		MyAnalyzer myAnalyzer = new MyAnalyzer(strings);
		String result = myAnalyzer.stem("Nike shoes for mens");
		System.out.println(result);
	}

}
