import { defineStore } from "pinia";

export const useLocationStore = defineStore('locations', {
  state: () => ({
    /** @type {{ id: number, name: string }[]} */
    locations: [],
  }),
  actions: {
    addLocation(location) {
      this.locations.push(location)
    },
    deleteLocation(id) {
      this.locations = this.locations.filter(l => l.id !== id)
    },
    getLocationById(id) {
      return this.locations.find(l => l.id == id)
    }
  }
})