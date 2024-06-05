package com.swp391.JewelryProduction.services.quotationItem;

import com.swp391.JewelryProduction.dto.QuotationItemDTO;
import com.swp391.JewelryProduction.pojos.QuotationItem;
import com.swp391.JewelryProduction.repositories.QuotationItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuotationItemService implements IQuotationItemService{
    private QuotationItemRepository quotationItemRepository;

    @Autowired
    public QuotationItemService(QuotationItemRepository quotationItemRepository) {
        this.quotationItemRepository = quotationItemRepository;
    }

    @Override
    public List<QuotationItemDTO> findAllQuotationItems() {
//        return quotationItemRepository.findAll().stream().map(quotationItem -> mapToQuotationItemDTO(quotationItem)).collect(Collectors.toList());
        return null;
    }

}
