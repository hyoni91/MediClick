package com.green.MediClick.orderitems.vo;

import com.green.MediClick.provider.item.vo.ItemImgVO;
import lombok.Data;

@Data
public class OrderItemsVO {

    private int productNum;
    private String productName;
    private int cateNum;
    private int productPrice;
    private int stock;
    private String detail;
    private CateVO cateVO;
    private ItemImgVO itemImgVO;
}
