package com.cnweb36.DTO.Entity;

public class CategoryDTO extends BaseDTO {

	private String name;
	private String info;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public CategoryDTO(String name, String info) {
		super();
		this.name = name;
		this.info = info;
	}

	public CategoryDTO() {
		super();
	}

}
