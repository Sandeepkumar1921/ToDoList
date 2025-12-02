function scheduleNotification(task) {
    if (!("Notification" in window)) return;
    
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
        return;
    }
    
    const taskTime = new Date(`${task.date}T${task.time}:00`);
    const now = new Date();
    
    const delay = taskTime.getTime() - now.getTime();
    if (delay < 1000) return;
    
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: "schedule",
            task: task,
            delay: delay
        });
    }
}