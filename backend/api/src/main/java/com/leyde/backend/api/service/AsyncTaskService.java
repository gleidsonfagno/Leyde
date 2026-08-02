package com.leyde.backend.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class AsyncTaskService {
    private static final Logger LOG = LoggerFactory.getLogger(AsyncTaskService.class);

    @Async("taskExecutor")
    public void performBackgroundWork(Runnable task) {
        try {
            task.run();
        } catch (Exception ex) {
            LOG.error("Async task failed", ex);
        }
    }
}
