package com.green.MediClick.provider.item.controller;

import com.green.MediClick.provider.item.service.ItemService;
import com.green.MediClick.provider.item.vo.CategoryVO;
import com.green.MediClick.provider.item.vo.ItemVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Resource(name = "itemService")
    ItemService itemService;

    @GetMapping("/cateList")
    public List<CategoryVO> cateList(){
        return itemService.cateList();
    }

    @PostMapping("/cateInsert")
    public void cateInsert(@RequestBody CategoryVO categoryVO){
        itemService.cateInsert(categoryVO);
    }

    @GetMapping("/cateDelete/{cateNum}")
    public void cateDelete(@PathVariable("cateNum") int cateNum){
        itemService.cateDelete(cateNum);
    }

    @PostMapping("/productInsert")
    public void productInsert(@RequestBody ItemVO itemVO){
        itemService.productInsert(itemVO);
    }

    @GetMapping("/medicalSuppliesList")
    public List<ItemVO> medicalSuppliesList(){
        return itemService.medicalSuppliesList();
    }
}

