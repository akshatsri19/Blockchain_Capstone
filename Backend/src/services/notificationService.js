const { db } = require("../config/firebase");

class NotificationService {
  constructor() {
    this.collection = db.collection('notifications');
  }

  async addNotification(notification) {
    try {
      const docRef = await this.collection.add(notification);
      console.log("Notification added with ID: ", docRef.id, this.collection);
      return docRef.id;
    } catch (error) {
      console.error("Error adding notification:", error);
      throw error;
    }
  }

  async getPendingNotifications() {
    try {
      const snapshot = await this.collection.where('status', '==', 'pending').get();
      if (snapshot.empty) return [];
      const notifications = [];
      snapshot.forEach(doc => notifications.push({ id: doc.id, ...doc.data() }));
      return notifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  async getPendingNotificationById(id) {
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error("Error fetching notification by ID:", error);
      throw error;
    }
  }

  async updateNotificationStatus(id, status) {
    try {
      await this.collection.doc(id).update({ status });
    } catch (error) {
      console.error("Error updating notification status:", error);
      throw error;
    }
  }
}

module.exports = new NotificationService();
