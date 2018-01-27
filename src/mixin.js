export default {
  methods: {
    firstErrorMessage (errors) {
      const error = this.firstValue(errors)
      return this.firstValue(error)
    },
    firstValue (obj) {
      return obj[Object.keys(obj)[0]]
    },
    ticketsBadgeVariant (numOfTickets) {
      if (numOfTickets === 0) {
        return 'danger'
      }
      if (numOfTickets <= 25) {
        return 'warning'
      }
      return 'success'
    }
  }
}
