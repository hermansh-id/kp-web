<template>
  <validation-observer ref="simpleRules">
    <b-card>
      <b-row>
        <!-- User Info: Input Fields -->
        <b-col
          cols="12"
        >
          <b-form>
            <b-row>

              <!-- Field: Full Name -->
              <b-col
                cols="6"
              >
                <b-form-group
                  label="Nama"
                  label-for="full-name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nama"
                    rules="required"
                  >
                    <b-form-input
                      id="full-name"
                      v-model="userData.nama"
                      placeholder="Nama"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Field: Status -->
              <b-col
                cols="6"
              >
                <b-form-group
                  label="Jabatan"
                  label-for="user-jabatan"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Jabatan"
                    rules="required"
                  >
                    <v-select
                      v-model="userData.jabatan"
                      :options="jabatanOptions"
                      :reduce="(val) => val.value"
                      :clearable="false"
                      label="text"
                      placeholder="Jabatan"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Field: Status -->
              <b-col
                cols="6"
              >
                <b-form-group
                  label="Jurusan"
                  label-for="user-jurusan"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Jurusan"
                    rules="required"
                  >
                    <v-select
                      v-model="userData.jurusan"
                      :options="jurusanOptions"
                      :reduce="(val) => val.value"
                      :clearable="false"
                      label="text"
                      placeholder="Jurusan"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

            </b-row>
          </b-form></b-col></b-row>
      <!-- Action Buttons -->
      <b-button
        variant="primary"
        class="mb-1 mb-sm-0 mr-0 mr-sm-1"
        :block="$store.getters['app/currentBreakPoint'] === 'xs'"
        @click.prevent="simpan"
      >
        Simpan
      </b-button>
      <b-button
        variant="outline-secondary"
        :block="$store.getters['app/currentBreakPoint'] === 'xs'"
        @click="$route.push('/pengguna')"
      >
        Kembali
      </b-button>
    </b-card>
  </validation-observer>
</template>

<script>
import {
  BCard,
  BButton,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { required, email } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { usersCollection } from '@/firebase'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BButton,
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      userData: {},
      jabatanOptions: [
        { value: 'sbap', text: 'SBAP' },
        { value: 'jurusan', text: 'Jurusan' },
      ],
      jurusanOptions: [
        { value: 'fakultas', text: 'Fakultas' },
        { value: 'informatika', text: 'Informatika' },
        { value: 'elektro', text: 'Teknik Elektro' },
        { value: 'sipil', text: 'Teknik Sipil' },
      ],
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  async created() {
    const data = await usersCollection.doc(this.$route.params.id).get()
    this.userData = data.data()
  },
  methods: {
    simpan() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          usersCollection.doc(this.$route.params.id).update({
            email: this.userData.email,
            nama: this.userData.nama,
            jabatan: this.userData.jabatan,
            jurusan: this.userData.jurusan,
          })
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Berhasil',
                  icon: 'BellIcon',
                  text: 'Berhasil Mengedit Pengguna',
                  variant: 'success',
                },
              })
              this.$router.push('/pengguna')
            })
            .catch(error => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Gagal',
                  icon: 'BellIcon',
                  text: error.message,
                  variant: 'danger',
                },
              })
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
