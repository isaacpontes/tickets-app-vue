import { defineStore } from "pinia";

export const useSubscriberStore = defineStore('subscribers', {
  state: () => ({
    /** @type {{ id: number, name: string, birthday: string, locationId: number, isUpdated: boolean, location: { id: number, name: string } }[]} */
    subscribers: [],
    total: 0,
    currentLocation: { id: 0, name: 'Todos' },
  }),
  actions: {
    addSubscriber(subscriber) {
      this.subscribers.unshift(subscriber)
    },
    updateSubscriber(subscriber) {
      this.subscribers = this.subscribers.map(sub => sub.id === subscriber.id ? subscriber : sub)
    },
    deleteSubscriber(id) {
      this.subscribers = this.subscribers.filter(subscriber => subscriber.id !== id)
    },
    resetLocation() {
      this.currentLocation = { id: 0, name: 'Todos' }
    }
  }
})