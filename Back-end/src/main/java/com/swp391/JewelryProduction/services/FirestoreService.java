package com.swp391.JewelryProduction.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.swp391.JewelryProduction.dto.Blog;
import com.swp391.JewelryProduction.enums.Role;
import com.swp391.JewelryProduction.pojos.Account;
import com.swp391.JewelryProduction.pojos.Order;
import com.swp391.JewelryProduction.services.account.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@Slf4j
@RequiredArgsConstructor
@EnableAsync
public class FirestoreService {
    private static final String BLOG_COLLECTION_NAME = "blogs";
    private static final String USER_COLLECTION_NAME = "users";

    private final AccountService accountService;

    public String saveBlog(Blog blog) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(BLOG_COLLECTION_NAME).document(blog.getId()).set(blog);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Blog getBlog(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(BLOG_COLLECTION_NAME).document(id);
        ApiFuture<com.google.cloud.firestore.DocumentSnapshot> future = documentReference.get();
        com.google.cloud.firestore.DocumentSnapshot document = future.get();

        if (document.exists()) {
            return document.toObject(Blog.class);
        } else {
            return null;
        }
    }

    public String deleteBlog(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(BLOG_COLLECTION_NAME).document(id).delete();
        return writeResult.get().getUpdateTime().toString();
    }

    @Async
    public void deleteUser(String userId) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection(USER_COLLECTION_NAME).document(userId);
        ApiFuture<WriteResult> writeResult = docRef.delete();
        writeResult.get();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveOrUpdateUser(Firestore db, Account owner) {
        log.info("Begin syncing");

        DocumentReference docRef = db.collection(USER_COLLECTION_NAME).document(owner.getId());
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", owner.getId());
        userData.put("name", (owner.getUserInfo() == null) ? owner.getEmail() : owner.getUserInfo().getFirstName());
        userData.put("role", owner.getRole().toString());

        Hibernate.initialize(owner.getPastOrder());
        Order currentOrder = owner.getCurrentOrder();
        if (owner.getRole().equals(Role.CUSTOMER) && currentOrder != null)
            userData.put("saleStaff", currentOrder.getSaleStaff().getId());

        ApiFuture<WriteResult> result = docRef.set(userData, SetOptions.merge());
        try {
            result.get();
            // Log success
            System.out.println("Synced user " + owner.getId() + " to Firestore " + docRef.getId());
        } catch (InterruptedException | ExecutionException e) {
            // Log error
            System.err.println("Error writing document: " + e.getMessage());
        }
    }

}
