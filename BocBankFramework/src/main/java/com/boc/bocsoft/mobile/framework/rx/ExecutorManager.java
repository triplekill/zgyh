package com.boc.bocsoft.mobile.framework.rx;

import android.os.Build;
import android.support.annotation.NonNull;

import java.io.File;
import java.io.FileFilter;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by Joker on 2015/8/24.
 */
public class ExecutorManager {

    public static final int DEVICE_INFO_UNKNOWN = 0;
    public static ExecutorService eventExecutor;
    //private static final int CPU_COUNT = Runtime.getRuntime().availableProcessors();
    private static final int CPU_COUNT = ExecutorManager.getCountOfCPU();
    private static final int CORE_POOL_SIZE = CPU_COUNT + 1;
    private static final int MAXIMUM_POOL_SIZE = CPU_COUNT * 2 + 1;
    private static final int KEEP_ALIVE = 1;
    private static final BlockingQueue<Runnable> eventPoolWaitQueue = new LinkedBlockingQueue<Runnable>(128);
    private static final ThreadFactory eventThreadFactory = new ThreadFactory() {
        private final AtomicInteger mCount = new AtomicInteger(1);

        public Thread newThread(@NonNull Runnable r) {
            return new Thread(r, "eventAsyncAndBackground #" + mCount.getAndIncrement());
        }
    };

    private static final RejectedExecutionHandler eventHandler =
            new ThreadPoolExecutor.CallerRunsPolicy();

    static {
        eventExecutor =
                new ThreadPoolExecutor(CORE_POOL_SIZE, MAXIMUM_POOL_SIZE, KEEP_ALIVE, TimeUnit.SECONDS,
                        eventPoolWaitQueue, eventThreadFactory, eventHandler);
    }

    /**
     * CPU作为Linux中的设备，在Linux中存在形式是文件，因此CPU核数量就是其文件的数量。
     * Android的CPU 设备文件位于/sys/devices/system/cpu/目录，文件名的的格式为cpu\d+。
     */
    public static int getCountOfCPU() {

        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.GINGERBREAD_MR1) {
            return 1;
        }
        int count;
        try {
            count = new File("/sys/devices/system/cpu/").listFiles(CPU_FILTER).length;
        } catch (SecurityException e) {
            count = DEVICE_INFO_UNKNOWN;
        } catch(NullPointerException e){
            count = DEVICE_INFO_UNKNOWN;
        }
        return count;
    }

    private static final FileFilter CPU_FILTER = new FileFilter() {
        @Override
        public boolean accept(File pathname) {

            String path = pathname.getName();
            if (path.startsWith("cpu")) {
                for (int i = 3; i < path.length(); i++) {
                    if (path.charAt(i) < '0' || path.charAt(i) > '9') {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
    };
}