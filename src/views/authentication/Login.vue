<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />
        </b-link>

        <b-card-title class="mb-1">
          Selamat datang di help desk! 👋
        </b-card-title>

        <!-- form -->
        <validation-observer
          ref="loginForm"
          #default="{invalid}"
        >
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent="submit"
          >

            <!-- email -->
            <b-form-group
              label-for="email"
              label="Email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="userEmail"
                  name="login-email"
                  :state="errors.length > 0 ? false:null"
                  placeholder="john@example.com"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">Password</label>
              </div>
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="login-password"
                    placeholder="Password"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
            >
              Masuk
            </b-button>
          </b-form>
        </validation-observer>

      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { usersCollection } from '@/firebase'

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BInputGroup,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userEmail: '',
      password: '',
      status: '',
      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    async submit() {
      try {
        const user = await this.$store.dispatch('auth/login', { email: this.userEmail, password: this.password })
        const us = await usersCollection.doc(user.uid).get()
        if (us.data().jabatan !== 'mahasiswa') {
          this.$store.dispatch('auth/fetchUserProfile', us.data())
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Selamat Datang!',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Anda berhasil login!',
            },
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Error!',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Mahasiswa tidak dapat masuk!',
            },
          })
        }
      } catch (err) {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error!',
            icon: 'CoffeeIcon',
            variant: 'danger',
            text: err.message,
          },
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
