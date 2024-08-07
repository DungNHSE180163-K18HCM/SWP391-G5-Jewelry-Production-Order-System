package com.swp391.JewelryProduction.services.crawl;

import com.swp391.JewelryProduction.pojos.designPojos.Metal;
import com.swp391.JewelryProduction.services.connection.ConnectionPage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import static java.lang.Math.round;

@AllArgsConstructor
@Setter
@Getter
@Builder
public class CrawlThread implements Runnable {
    private static final Logger log = LoggerFactory.getLogger(CrawlThread.class);
    private List<Metal> metals;
    private ConnectionPage connection;
    @Builder.Default
    private boolean isVND = true;

    @Value("${exchange.url}")
    private String urlExchange;
    @Value("${page.url}")
    private String urlPage;
    //*[@id="gr24_spot_gold_widget-11"]/table/tbody/tr[1]/th
    @Override
    public void run() {
        Document connectionPage = null;
        Random random = new Random();
        try {
            connectionPage = connection.getConnection(this.urlExchange);
            Element exchangeRate = connectionPage.selectFirst("#calculator > div:nth-child(1) > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(1) > h3 > span:nth-child(2) > span\n");
            double rate = Double.parseDouble(exchangeRate.text());

            connectionPage = connection.getConnection(this.urlPage);
            Elements materials = connectionPage.select("#gr24_spot_gold_widget-11 > table > tbody > tr");

            materials.forEach(product -> {
                Metal metal = Metal.builder()
                        .name("Gold")
                        .unit(product.selectFirst("th").text())
                        .marketPrice(Double.parseDouble(product.selectFirst("td").text().replace("$", "").replace(",", "")) * (isVND ? rate : 1))
                        .companyPrice(round((Double.parseDouble(product.selectFirst("td").text().replace("$", "").replace(",", "")) * (isVND ? rate : 1) - random.nextInt(1, 10)) * 100) / 100.0 )
                        .updatedTime(LocalDateTime.now())
                        .build();
                synchronized (materials) {
                    this.metals.add(metal);
                }
            });
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
