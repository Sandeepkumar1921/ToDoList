self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => console.log("SW Ready"));

self.addEventListener("message", (e) => {
  if (e.data.type === "schedule") {
    const task = e.data.task;
    const delay = e.data.delay;
    
    setTimeout(() => {
      self.registration.showNotification("Task Reminder", {
        body: `${task.text} • ${task.time}`,
        tag: task.id,
        vibrate: [300, 100, 300]
      });
    }, delay);
  }
});