package com.swp391.JewelryProduction.repositories;

import com.swp391.JewelryProduction.enums.Role;
import com.swp391.JewelryProduction.enums.WorkStatus;
import com.swp391.JewelryProduction.pojos.Account;
import com.swp391.JewelryProduction.pojos.Order;
import com.swp391.JewelryProduction.pojos.Staff;
import com.swp391.JewelryProduction.pojos.StaffOrderHistory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {
    Account findAccountByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    Optional<Account> findAccountByRole(Role role);
    Optional<Staff> findStaffByRoleAndWorkStatus(Role role, WorkStatus workStatus);
    Optional<Account> findByEmail(String email);
    Page<Account> findAllByRole(Role role, PageRequest pageRequest);
    List<Account> findAllByEmail(String email);
    List<Account> findAllByRoleIn (List<Role> roles);
    Long countAllByRoleIn (List<Role> roles);

    @Query("SELECT a FROM Account a")
    List<Account> findAllAccounts();

    @Query("SELECT o FROM Order o WHERE o.owner.id IN :accountIds")
    List<Order> findOrdersByAccountIds(@Param("accountIds") List<String> accountIds);

    @Query("SELECT h FROM StaffOrderHistory h WHERE h.order.id IN :orderIds")
    List<StaffOrderHistory> findHistoriesByOrderIds(@Param("orderIds") List<String> orderIds);

    @EntityGraph(attributePaths = {"userInfo", "pastOrder"})
    @Query("SELECT a from Account a WHERE a.id = :accountId")
    Optional<Account> findAccountByIdForSync (@Param("accountId") String accountId);

    @EntityGraph(attributePaths = {"userInfo", "pastOrder", "sendingReports"})
    @Query("SELECT a from Account a WHERE a.id = :accountId")
    Optional<Account> findAccountByIdForDelete (@Param("accountId") String accountId);
}
