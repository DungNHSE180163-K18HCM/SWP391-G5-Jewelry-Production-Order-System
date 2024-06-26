package com.swp391.JewelryProduction;

import com.github.javafaker.Faker;
import com.swp391.JewelryProduction.enums.AccountStatus;
import com.swp391.JewelryProduction.enums.Gender;
import com.swp391.JewelryProduction.enums.OrderStatus;
import com.swp391.JewelryProduction.enums.Role;
import com.swp391.JewelryProduction.pojos.*;
import com.swp391.JewelryProduction.pojos.designPojos.Product;
import com.swp391.JewelryProduction.repositories.AccountRepository;
//import com.swp391.JewelryProduction.websocket.listener.GlobalEntityListener;
import com.swp391.JewelryProduction.repositories.OrderRepository;
import com.swp391.JewelryProduction.repositories.ProductRepository;
import com.swp391.JewelryProduction.repositories.StaffRepository;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Random;

@SpringBootApplication
@ComponentScan({"com.swp391.JewelryProduction.security.*", "com.swp391.JewelryProduction.*"})
@EntityScan("com.swp391.JewelryProduction.*")
@ConfigurationPropertiesScan("com.swp391.JewelryProduction.*")
@EnableJpaRepositories("com.swp391.JewelryProduction.*")
@EnableScheduling
@EnableTransactionManagement
public class Application   {

	private static final Logger logger = LoggerFactory.getLogger(Application.class);
	private final PasswordEncoder passwordEncoder;

	public Application(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

	public static void main(String[] args) throws IOException {
		SpringApplication.run(Application.class, args);
//		ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
//
//		CrawlDataService crawlDataService = context.getBean(CrawlDataService.class);
//		crawlDataService.crawData();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(@NotNull CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*")
						.allowedMethods("HEAD","GET","POST","PUT","DELETE","PATCH","OPTIONS");
			}
		};
	}


	@Bean
	public CommandLineRunner commandLineRunner (AccountRepository accountRepository, StaffRepository staffRepository, OrderRepository orderRepository, ProductRepository productRepository) {
		return args -> {
			logger.info("Application start");
			Account acc = Account.builder()
					.email("nguyenhoangdung335@gmail.com")
					.password(passwordEncoder.encode("#Dung111004"))
					.dateCreated(LocalDateTime.now())
					.role(Role.ADMIN)
					.status(AccountStatus.ACTIVE)
					.build();
			acc.setUserInfo(UserInfo.builder()
					.firstName("Dung")
					.lastName("Nguyen Hoang")
					.gender(Gender.MALE)
					.address("Vinhomes")
					.birthDate(LocalDate.parse("2004-10-11"))
					.phoneNumber("0916320563")
					.build());
			accountRepository.save(acc);
			logger.info("Acc00001 Added");


			acc = Account.builder()
					.email("dungnhse180163@fpt.edu.vn")
					.password(passwordEncoder.encode("#Dung111004"))
					.dateCreated(LocalDateTime.now())
					.role(Role.MANAGER)
					.status(AccountStatus.ACTIVE)
					.build();
			acc.setUserInfo(UserInfo.builder()
					.firstName("Dung")
					.lastName("Nguyen Hoang")
					.gender(Gender.MALE)
					.address("Vinhomes")
					.birthDate(LocalDate.parse("2004-10-11"))
					.phoneNumber("0916320563")
					.build());
			accountRepository.save(acc);

			acc = Account.builder()
					.email("nguyenhoangd335@gmail.com")
					.password(passwordEncoder.encode("#Dung111004"))
					.dateCreated(LocalDateTime.now())
					.role(Role.SALE_STAFF)
					.status(AccountStatus.ACTIVE)
					.build();
			acc.setUserInfo(UserInfo.builder()
					.firstName("Dung")
					.lastName("Nguyen Hoang")
					.gender(Gender.MALE)
					.address("Vinhomes")
					.birthDate(LocalDate.parse("2004-10-11"))
					.phoneNumber("0916320563")
					.build());
			accountRepository.save(acc);

			Faker faker = new Faker();
			Random rand = new Random();
			for (int i = 0; i < 10; i++) {
				acc = Account.builder()
						.email(faker.internet().safeEmailAddress())
						.password(passwordEncoder.encode(faker.internet().password()))
						.dateCreated(LocalDateTime.now().plusWeeks(rand.nextLong(10)).plusDays(rand.nextLong(31)))
						.role(Role.CUSTOMER)
						.status(AccountStatus.ACTIVE)
						.build();
				acc.setUserInfo(UserInfo.builder()
						.firstName(faker.name().firstName())
						.lastName(faker.name().lastName())
						.gender(Gender.values()[rand.nextInt(1)])
						.address(faker.address().fullAddress())
						.birthDate(faker.date().birthday(10, 80).toInstant()
								.atZone(ZoneId.systemDefault())
								.toLocalDate())
						.phoneNumber(faker.phoneNumber().phoneNumber())
						.build());
				accountRepository.save(acc);
			}

			Staff staff;
			for (int i = 0; i < 15; i++) {
				staff = Staff.builder()
						.email(faker.internet().safeEmailAddress())
						.password(passwordEncoder.encode(faker.internet().password()))
						.dateCreated(LocalDateTime.now().plusWeeks(rand.nextLong(10)).plusDays(rand.nextLong(31)))
						.role(
								(i < 10)?
										(i< 5)? Role.SALE_STAFF: Role.DESIGN_STAFF
										: Role.PRODUCTION_STAFF
						)
						.status(AccountStatus.ACTIVE)
						.build();
				staff.setUserInfo(UserInfo.builder()
						.firstName(faker.name().firstName())
						.lastName(faker.name().lastName())
						.gender(Gender.values()[rand.nextInt(1)])
						.address(faker.address().fullAddress())
						.birthDate(faker.date().birthday(10, 80).toInstant()
								.atZone(ZoneId.systemDefault())
								.toLocalDate())
						.phoneNumber(faker.phoneNumber().phoneNumber())
						.build());
				staffRepository.save(staff);
			}

			acc = Account.builder()
					.email("tranmaiquangkhai@gmail.com")
					.password(passwordEncoder.encode("Khai1@"))
					.dateCreated(LocalDateTime.now())
					.role(Role.ADMIN)
					.status(AccountStatus.ACTIVE)
					.build();
			acc.setUserInfo(UserInfo.builder()
					.firstName("Khai")
					.lastName("Tran Mai Quang")
					.gender(Gender.MALE)
					.address("Vinhomes")
					.birthDate(LocalDate.parse("2004-10-11"))
					.phoneNumber("0916320563")
					.build());
			accountRepository.save(acc);

//			GlobalEntityListener.setInitializedDone();

			for(int  i = 0; i < 10; i ++) {
				Product product = Product.builder()
						.description(faker.lorem().sentence())
						.build();
				Order order = Order.builder()
						.budget(Double.parseDouble(faker.commerce().price()))
						.createdDate(LocalDateTime.now())
						.name(faker.commerce().productName())
						.status(OrderStatus.REQUESTING)
						.build();
				order.setProduct(Product.builder()
						.name(order.getName())
						.description(faker.lorem().sentence())
						.order(order)
						.build());
				order.setQuotation(Quotation.builder()
						.createdDate(LocalDate.now())
						.expiredDate(LocalDate.now().plusDays(rand.nextInt(10)))
						.title(order.getName())
						.order(order)
						.build());
				order.setDesign(Design.builder()
						.lastUpdated(LocalDateTime.now())
						.designLink(faker.internet().url())
						.order(order)
						.build());
                orderRepository.save(order);
			}
		};
	}
}
