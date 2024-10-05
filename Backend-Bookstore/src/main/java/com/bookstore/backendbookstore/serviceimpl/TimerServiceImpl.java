package com.bookstore.backendbookstore.serviceimpl;

import com.bookstore.backendbookstore.service.TimerService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("session")
public class TimerServiceImpl implements TimerService {

    Long startTime;

    @Override
    public void startTimer() {
        startTime = System.currentTimeMillis();
    }

    @Override
    public Long stopTimer() {
        System.out.println(this);
        return System.currentTimeMillis() - startTime;
    }
}
