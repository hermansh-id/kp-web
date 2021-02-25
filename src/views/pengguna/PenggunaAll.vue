<template>
  <b-card
    title="Artikel"
    no-body
  >
    <b-card-body>
      <div class="d-flex justify-content-between  flex-wrap">

        <!-- sorting  -->
        <b-form-group
          label="Urutkan"
          label-size="sm"
          label-align-sm="left"
          label-cols-sm="4"
          label-for="sortBySelect"
          class="mr-1 mb-md-0"
        >
          <b-input-group
            size="sm"
          >
            <b-form-select
              id="sortBySelect"
              v-model="sortBy"
              :options="sortOptions"
            >
              <template #first>
                <option value="">
                  none
                </option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              size="sm"
              :disabled="!sortBy"
            >
              <option :value="false">
                Asc
              </option>
              <option :value="true">
                Desc
              </option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
        <b-row>
          <!-- filter -->
          <b-form-group
            label="Cari"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filterInput"
                v-model="filter"
                type="search"
                placeholder="Ketik untuk mencari"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!filter"
                  @click="filter = ''"
                >
                  Hapus
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-button
            size="sm"
            variant="primary"
            class="ml-2"
            @click="$router.push('/pengguna/tambah')"
          >
            Tambah Pengguna
          </b-button>
        </b-row>
      </div>
    </b-card-body>
    <b-table
      ref="tableartikel"
      striped
      hover
      responsive
      dense
      class="position-relative"
      :busy.sync="busy"
      :per-page="perPage"
      :current-page="currentPage"
      :items="kpId"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
    >
      <template #cell(jurusan)="data">
        {{ data.value || '-' }}
      </template>
      <template #cell(NPM)="data">
        {{ data.value || '-' }}
      </template>
      <template #cell(action)="data">
        <feather-icon
          v-b-tooltip.hover.top="'Ganti Password'"
          icon="LockIcon"
          class="mr-50"
          @click="gantiPassword(data)"
        />
        <feather-icon
          v-b-tooltip.hover.top="'Edit Pengguna!'"
          icon="EditIcon"
          class="mr-50"
          @click="$router.push('/pengguna/edit/'+data.item.id)"
        />
        <feather-icon
          v-b-tooltip.hover.top="'Hapus Pengguna'"
          icon="TrashIcon"
          class="mr-50"
          @click="deleteData(data)"
        />
      </template>
    </b-table>

    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

      <!-- page length -->
      <b-form-group
        label="Per Halaman"
        label-cols="6"
        label-align="left"
        label-size="sm"
        label-for="sortBySelect"
        class="text-nowrap mb-md-0 mr-1"
      >
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          size="sm"
          inline
          :options="pageOptions"
        />
      </b-form-group>

      <!-- pagination -->
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          first-number
          last-number
          prev-class="prev-item"
          next-class="next-item"
          class="mb-0"
        >
          <template #prev-text>
            <feather-icon
              icon="ChevronLeftIcon"
              size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
              icon="ChevronRightIcon"
              size="18"
            />
          </template>
        </b-pagination>
      </div>
    </b-card-body>

  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BTable, BFormGroup, BFormSelect, BPagination, BInputGroup, BFormInput, BInputGroupAppend, BButton, BCardBody,
  VBTooltip,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { usersCollection, auth } from '@/firebase'
import axios from '@axios'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    BRow,
    BCard,
    BTable,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCardBody,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      perPage: 10,
      dataselect: null,
      pageOptions: [5, 10, 20, 50, 100],
      currentPage: 1,
      sortBy: 'nama',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      busy: false,
      kp: [],
      fields: [
        {
          key: 'nama', label: 'Nama', sortable: true,
        },
        {
          key: 'jurusan', label: 'Jurusan', sortable: true,
        },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'NPM', label: 'NPM', sortable: true },
        { key: 'jabatan', label: 'Jabatan', sortable: true },
        { key: 'action', label: 'Aksi' },
      ],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    kpId() {
      if (this.kp.length === 0) {
        return []
      }
      return this.kp.map(r => ({ ...r, id: r.id }))
    },
    totalRows() {
      return this.kpId.length
    },
  },
  firestore: {
    kp: usersCollection,
  },
  created() {

  },
  methods: {
    gantiPassword(data) {
      this.$swal({
        title: 'Apa Anda Yakin?',
        text: `Reset password ${data.item.nama} akan dikirim lewat email`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ganti Password',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          // eslint-disable-next-line no-underscore-dangle
          auth.sendPasswordResetEmail(data.item.email).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Berhasil',
                icon: 'BellIcon',
                text: 'Berhasil Mengirim Email Reset Password Pengguna',
                variant: 'success',
              },
            })
            this.$refs.tableartikel.refresh()
          }).catch(err => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Error',
                icon: 'BellIcon',
                text: err.message,
                variant: 'danger',
              },
            })
          })
        }
      })
    },

    deleteData(data) {
      this.$swal({
        title: 'Apa Anda Yakin?',
        text: `Anda akan menghapus ${data.item.nama}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          // eslint-disable-next-line no-underscore-dangle
          axios.delete(`user/${data.item.id}`).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Berhasil',
                icon: 'BellIcon',
                text: 'Berhasil Menghapus Pengguna',
                variant: 'success',
              },
            })
            this.$refs.tableartikel.refresh()
          }).catch(err => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Error',
                icon: 'BellIcon',
                text: err.response.data.message,
                variant: 'danger',
              },
            })
          })
        }
      })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update t\he number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
