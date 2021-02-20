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

              <b-form-select
                id="searchBy"
                v-model="searchBy"
                :options="sortOptions"
              >
                <template #first>
                  <option value="">
                    none
                  </option>
                </template>
              </b-form-select>
            </b-input-group>
          </b-form-group>
          <b-button
            variant="primary"
            class="ml-3 mr-2"
            size="sm"
            @click="$router.push('/artikel/tambah')"
          >
            <span class="text-nowrap">Tambah Artikel</span>
          </b-button>
        </b-row>
      </div>
    </b-card-body>
    <b-table
      ref="tableartikel"
      striped
      hover
      responsive
      class="position-relative"
      :busy.sync="busy"
      :per-page="perPage"
      :current-page="currentPage"
      :items="getdata"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
    >
      <template #cell(tanggal)="data">
        {{ Date(data.value.seconds * 1000) }}
      </template>
      <template #cell(action)="data">
        <feather-icon
          icon="EyeIcon"
          class="mr-50"
          @click="$router.push(`/artikel/view/${data.item._id}`)"
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
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'

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
  data() {
    return {
      perPage: 5,
      dataselect: null,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: 'name',
      searchBy: 'name',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      busy: false,
      fields: [
        {
          key: 'pengaju.nama', label: 'Nama', sortable: true,
        },
        {
          key: 'pengaju.jurusan', label: 'Jurusan', sortable: true,
        },
        { key: 'pengaju.NPM', label: 'NPM', sortable: true },
        { key: 'tanggal', label: 'Tanggal', sortable: true },
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
  },
  created() {

  },
  methods: {

    getdata() {
      const where = [
        ['jenis', '==', 'KP'],
      ]
      // can have several parameters
      const orderBy = ['tanggal']
      return store.dispatch('ajuan/openDBChannel', { clauses: { where, orderBy } })
        .then(({ streaming }) => {
          streaming
            .then(() => {
            })
            .catch(error => {
              console.log(error.message)
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Error',
                  icon: 'BellIcon',
                  text: error.message,
                  variant: 'danger',
                },
              })
            })
          const { data } = store.state.ajuan
          const vdata = Object.keys(data).map(key => ({ id: key, ...data[key] }))
          console.log(vdata)
          return vdata
        })
        .catch(error => {
          console.log(error.message)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'BellIcon',
              text: error.message,
              variant: 'danger',
            },
          })
        })
    //   return store.dispatch('ajuan/fetchAndAdd', { where: [['jenis', '==', 'KP']] }).then(() => {
    //     const { data } = store.state.ajuan
    //     const vdata = Object.keys(data).map(key => ({ id: key, ...data[key] }))
    //     console.log(vdata)
    //     return vdata
    //   }).catch(() => {
    //     this.busy = false
    //     this.$toast({
    //       component: ToastificationContent,
    //       props: {
    //         title: 'Error',
    //         icon: 'BellIcon',
    //         text: 'Gagal Mendapat Artikel',
    //         variant: 'danger',
    //       },
    //     })
    //     return []
    //   })
    },
    deleteData(data) {
      this.$swal({
        title: 'Apa Anda Yakin?',
        text: `Anda akan menghapus ${data.item.name}`,
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
          store.dispatch('artikel/hapusArtikel', data.item._id).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Sukses',
                icon: 'BellIcon',
                text: 'Data berhasil dihapus',
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
