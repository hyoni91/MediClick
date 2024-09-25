package com.green.MediClick.provider.item.controller;

import com.green.MediClick.provider.item.service.ItemService;
import com.green.MediClick.provider.item.vo.CategoryVO;
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

    @GetMapping("/deleteCate/{cateNum}")
    public void deleteCate(@PathVariable("cateNum") int cateNum){
        System.out.println("dddddd"+cateNum);
        itemService.deleteCate(cateNum);
    }

}
