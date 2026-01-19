/**
 * Cornerstone: 90 - Push Notification Service
 * Handles push notifications for daily readings (5 AM CT) and workouts (6 PM CT)
 */

interface NotificationSchedule {
  type: 'reading' | 'workout';
  hour: number;
  minute: number;
  timezone: string;
}

const NOTIFICATION_SCHEDULES: NotificationSchedule[] = [
  {
    type: 'reading',
    hour: 5,
    minute: 0,
    timezone: 'America/Chicago'
  },
  {
    type: 'workout',
    hour: 18,
    minute: 0,
    timezone: 'America/Chicago'
  }
];

class NotificationService {
  private swRegistration: ServiceWorkerRegistration | null = null;
  private notificationCheckInterval: NodeJS.Timeout | null = null;
  private vapidPublicKey: string;

  constructor() {
    // Get VAPID public key from environment variable
    this.vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';
    
    if (!this.vapidPublicKey) {
      console.warn('[Notification Service] VAPID public key not found. Generate keys at /generate-vapid-keys.html');
    }
  }

  /**
   * Initialize notification service
   */
  async initialize(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      console.log('[Notification Service] Service Workers not supported');
      return false;
    }

    if (!('PushManager' in window)) {
      console.log('[Notification Service] Push notifications not supported');
      return false;
    }

    try {
      // Register service worker
      this.swRegistration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });

      console.log('[Notification Service] Service Worker registered:', this.swRegistration);

      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;

      return true;
    } catch (error) {
      console.error('[Notification Service] Registration failed:', error);
      return false;
    }
  }

  /**
   * Request notification permission from user
   */
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('[Notification Service] Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      console.log('[Notification Service] Notification permission denied');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('[Notification Service] Permission request failed:', error);
      return false;
    }
  }

  /**
   * Subscribe to push notifications
   */
  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.swRegistration) {
      console.error('[Notification Service] Service Worker not registered');
      return null;
    }

    if (!this.vapidPublicKey) {
      console.error('[Notification Service] VAPID public key not configured');
      console.log('[Notification Service] Generate keys at /generate-vapid-keys.html');
      // Continue without VAPID for local notifications
    }

    try {
      // Check if already subscribed
      let subscription = await this.swRegistration.pushManager.getSubscription();

      if (!subscription && this.vapidPublicKey) {
        // Create new subscription with VAPID key
        subscription = await this.swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
        });

        console.log('[Notification Service] Push subscription created:', subscription);

        // Save subscription to backend (if you have one)
        await this.saveSubscription(subscription);
      } else if (!this.vapidPublicKey) {
        console.log('[Notification Service] Using local notifications (no VAPID key configured)');
      }

      return subscription;
    } catch (error) {
      console.error('[Notification Service] Push subscription failed:', error);
      // Continue with local notifications even if push subscription fails
      return null;
    }
  }

  /**
   * Start scheduled notification checks
   */
  startScheduledNotifications(): void {
    if (this.notificationCheckInterval) {
      return; // Already running
    }

    console.log('[Notification Service] Starting scheduled notifications');

    // Check every minute for scheduled notifications
    this.notificationCheckInterval = setInterval(() => {
      this.checkAndSendScheduledNotifications();
    }, 60000); // Check every 60 seconds

    // Initial check
    this.checkAndSendScheduledNotifications();
  }

  /**
   * Stop scheduled notifications
   */
  stopScheduledNotifications(): void {
    if (this.notificationCheckInterval) {
      clearInterval(this.notificationCheckInterval);
      this.notificationCheckInterval = null;
      console.log('[Notification Service] Stopped scheduled notifications');
    }
  }

  /**
   * Check and send scheduled notifications based on Central Time
   */
  private async checkAndSendScheduledNotifications(): Promise<void> {
    const now = new Date();
    const centralTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    const currentHour = centralTime.getHours();
    const currentMinute = centralTime.getMinutes();

    console.log(`[Notification Service] Checking schedule - CT: ${currentHour}:${currentMinute.toString().padStart(2, '0')}`);

    // Get user progress
    const progress = this.getUserProgress();
    const currentDay = progress?.day || 1;

    for (const schedule of NOTIFICATION_SCHEDULES) {
      // Check if we're within the notification window (within 5 minutes)
      if (
        currentHour === schedule.hour &&
        currentMinute >= schedule.minute &&
        currentMinute < schedule.minute + 5
      ) {
        // Check if we already sent this notification today
        const lastSent = localStorage.getItem(`last_${schedule.type}_notification`);
        const today = centralTime.toDateString();

        if (lastSent !== today) {
          await this.sendNotification(schedule.type, currentDay);
          localStorage.setItem(`last_${schedule.type}_notification`, today);
          console.log(`[Notification Service] Sent ${schedule.type} notification for Day ${currentDay}`);
        }
      }
    }
  }

  /**
   * Send a notification
   */
  private async sendNotification(type: 'reading' | 'workout', day: number): Promise<void> {
    if (Notification.permission !== 'granted') {
      console.log('[Notification Service] Permission not granted');
      return;
    }

    const notifications = {
      reading: {
        title: '🏛️ Cornerstone: 90 - Daily Reading',
        body: `Day ${day}: Your daily Scripture reading is ready. Start your day in God's Word.`,
        icon: '/cornerstone-icon.svg',
        badge: '/cornerstone-icon.svg',
        tag: 'daily-reading',
        data: { url: '/reading', day },
        actions: [
          { action: 'read', title: '📖 Read Now' },
          { action: 'later', title: '⏰ Remind Later' }
        ]
      },
      workout: {
        title: '💪 Cornerstone: 90 - Workout Reminder',
        body: `Day ${day}: Time for your workout. Build strength in body and spirit.`,
        icon: '/cornerstone-icon.svg',
        badge: '/cornerstone-icon.svg',
        tag: 'daily-workout',
        data: { url: '/workout', day },
        actions: [
          { action: 'workout', title: '💪 Start Workout' },
          { action: 'skip', title: '⏭️ Skip Today' }
        ]
      }
    };

    const notificationData = notifications[type];

    if (this.swRegistration) {
      // Use Service Worker to show notification (better for background)
      await this.swRegistration.showNotification(notificationData.title, {
        body: notificationData.body,
        icon: notificationData.icon,
        badge: notificationData.badge,
        tag: notificationData.tag,
        requireInteraction: true,
        data: notificationData.data
      });
    } else {
      // Fallback to regular notification
      new Notification(notificationData.title, {
        body: notificationData.body,
        icon: notificationData.icon,
        badge: notificationData.badge,
        tag: notificationData.tag,
        requireInteraction: true,
        data: notificationData.data
      });
    }

    console.log(`[Notification Service] Sent ${type} notification for Day ${day}`);
  }

  /**
   * Send test notification
   */
  async sendTestNotification(type: 'reading' | 'workout'): Promise<void> {
    const progress = this.getUserProgress();
    const currentDay = progress?.day || 1;
    await this.sendNotification(type, currentDay);
  }

  /**
   * Get user progress from localStorage
   */
  private getUserProgress() {
    const stored = localStorage.getItem('mensalliance_progress');
    return stored ? JSON.parse(stored) : { day: 1 };
  }

  /**
   * Save push subscription to backend (placeholder)
   */
  private async saveSubscription(subscription: PushSubscription): Promise<void> {
    // TODO: Send subscription to your backend server
    // For now, just save to localStorage
    localStorage.setItem('push_subscription', JSON.stringify(subscription));
    console.log('[Notification Service] Subscription saved locally');
    
    // Example backend call (uncomment when backend is ready):
    /*
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    });
    */
  }

  /**
   * Convert VAPID key to Uint8Array
   */
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  /**
   * Check if notifications are enabled
   */
  isEnabled(): boolean {
    return Notification.permission === 'granted';
  }

  /**
   * Get notification permission status
   */
  getPermissionStatus(): NotificationPermission {
    return Notification.permission;
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
export default notificationService;
