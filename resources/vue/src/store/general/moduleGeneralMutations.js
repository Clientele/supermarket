

export default {

  TOGGLE_USER_FORM (state, isVisible) {
    state.userFormVisible = isVisible
  },

  TOGGLE_GENERAL_NOTIFICATION (state, boolVal) {
    state.showGeneralNotification = boolVal
  },

}
