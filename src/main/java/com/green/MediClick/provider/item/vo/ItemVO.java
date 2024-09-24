package com.green.MediClick.provider.item.vo;

import lombok.Data;

@Data
public class ItemVO {
    //상품
    private int productNum;
    private String productName;
    private int cateNum;
    private int productPrice;
    private int stock;
    private String detail;

}
