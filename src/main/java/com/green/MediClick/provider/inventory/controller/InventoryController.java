package com.green.MediClick.provider.inventory.controller;

import com.green.MediClick.provider.inventory.service.InventoryService;
import com.green.MediClick.provider.inventory.vo.InventoryVO;
import com.green.MediClick.provider.item.vo.ItemListData;
import com.green.MediClick.provider.item.vo.ItemVO;
import com.green.MediClick.schedule.vo.PageVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Resource(name = "inventoryService")
    private InventoryService inventoryService;

    @GetMapping("/list")
    public List<InventoryVO> inventoryList(){
        return inventoryService.inventoryList();
    }

}
