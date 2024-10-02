package com.green.MediClick.provider.item.vo;

import com.green.MediClick.schedule.vo.PageVO;
import lombok.Data;

@Data
public class ItemListData {
    private String searchType;
    private String searchValue;
    private PageVO pageVO;
}
