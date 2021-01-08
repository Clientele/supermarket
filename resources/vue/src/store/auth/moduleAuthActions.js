/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Charden DyDy
==========================================================================================*/

import jwt from '../../http/requests/auth/jwt/index.js'


import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'
import axios from "@/http/axios";

export default {

   loginJWT ({ commit }, payload) {

    return new Promise((resolve, reject) => {

      axios.post('/auth/login', {
        email : payload.userDetails.email,
        password :  payload.userDetails.password
      }).then(response => {

        console.log(JSON.stringify(response.data));

        if (response.data.success) {
            // Navigate User to homepage
            router.push(router.currentRoute.query.to || '/')

            let token = response.data.payload.accessToken;
             console.log(token);

            // Set accessToken
            localStorage.setItem('accessToken', token)

            // Update user details
            commit('UPDATE_USER_INFO', response.data.payload.user, {root: true})

            // Set bearer token in axios
            commit('SET_BEARER', token)


            resolve(response)
          } else {
            reject({message: 'Wrong Email or Password'})
          }

        })
        .catch(error => { reject(error) })
    })
  },

  registerUserJWT ({ commit }, payload) {

    const { displayName, email, password, confirmPassword } = payload.userDetails

    return new Promise((resolve, reject) => {

      // Check confirm password
      if (password !== confirmPassword) {
        reject({message: 'Password doesn\'t match. Please try again.'})
      }

      jwt.registerUser(displayName, email, password)
        .then(response => {
          // Redirect User
          router.push(router.currentRoute.query.to || '/')

          // Update data in localStorage
          localStorage.setItem('accessToken', response.data.accessToken)
          commit('UPDATE_USER_INFO', response.data.userData, {root: true})

          resolve(response)
        })
        .catch(error => { reject(error) })
    })
  },

  fetchAccessToken () {
    return new Promise((resolve) => {
      jwt.refreshToken().then(response => { resolve(response) })
    })
  }

}
