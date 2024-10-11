package com.green.MediClick.provider.inventory.vo;

import com.green.MediClick.provider.item.vo.CategoryVO;
import lombok.Data;

@Data
public class InventoryVO {
    private int inventoryNum;
    private int cateNum;
    private int productNum;
    private String productName;
    private String stockDate;
    private String outDate;
    private int initialStock;
    private int incomingQty;
    private int outgoingQty;
    private int currentStock;
    //private CategoryVO categoryVO;
}
