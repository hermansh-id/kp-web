<template>
  <b-card
    title="Detail Kartu Keterangan Kuliah"
    class="invoice-preview-card"
  >
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card>
          <b-skeleton width="100%" />
          <b-skeleton width="100%" />
          <b-skeleton width="100%" />
        </b-card>
      </template>
      <b-card-body
        v-if="item !== null"
        class="invoice-padding pb-2"
      >
        <div
          class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0"
        >
          <!-- Header: Left Content -->
          <div>
            <div class="logo-wrapper">
              <h3 class="text-primary invoice-logo">
                KERJA PRAKTEK
              </h3>
            </div>
            <p class="card-text mb-25">
              {{ item.pengaju.nama }}
            </p>
            <p class="card-text mb-25">
              {{ item.pengaju.jurusan }}
            </p>
            <p class="card-text mb-0">
              {{ item.pengaju.NPM }}
            </p>
          </div>

          <!-- Header: Right Content -->
          <div class="mt-md-0 mt-2">
            <h4 class="invoice-title">
              <span class="invoice-number">{{
                new Date(item.tanggal.seconds * 1000) | moment("DD MMMM YYYY")
              }}</span>
            </h4>
            <div class="invoice-date-wrapper">
              <p class="card-text mb-0">
                {{ item.pengaju.email }}
              </p>
              <p class="card-text mb-0">
                {{ item.pengaju.hp }}
              </p>
            </div>
          </div>
        </div></b-card-body>
      <app-timeline
        v-if="item !== null"
        class="p-2"
      >
        <!-- 12 INVOICES HAVE BEEN PAID -->
        <app-timeline-item
          variant="success"
          icon="FileTextIcon"
        >
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0"
          >
            <h6>Persyaratan usulan KP</h6>
            <small class="text-muted">{{
              (item.tanggal.seconds * 1000 - new Date().getTime())
                | duration("humanize")
            }} ago</small>
          </div>
          <p>Mohon cek persyaratan.</p>
          <b-row class="ml-0">
            <div class="mr-2">
              <a
                :href="item.syarat.ombus"
                target="_blank"
              >
                <b-img
                  :src="require('@/assets/images/icons/pdf.png')"
                  height="auto"
                  width="20"
                  class="mr-1"
                />
                <span class="align-bottom">sertifikat OMBUS</span>
              </a>
            </div>
            <div class="mr-5">
              <a
                :href="item.syarat.pbn"
                target="_blank"
              >
                <b-img
                  :src="require('@/assets/images/icons/pdf.png')"
                  height="auto"
                  width="20"
                  class="mr-2"
                />
                <span class="align-bottom">sertifikat PBN</span>
              </a>
            </div>
            <div class="mr-5">
              <a
                :href="item.syarat.transkrip"
                target="_blank"
              >
                <b-img
                  :src="require('@/assets/images/icons/pdf.png')"
                  height="auto"
                  width="20"
                  class="mr-2"
                />
                <span class="align-bottom">Transkrip nilai</span>
              </a>
            </div>
            <div class="mr-5">
              <a
                :href="item.syarat.persetujuan"
                target="_blank"
              >
                <b-img
                  :src="require('@/assets/images/icons/pdf.png')"
                  height="auto"
                  width="20"
                  class="mr-2"
                />
                <span class="align-bottom">Persetujuan Wali Dosen</span>
              </a>
            </div>
          </b-row>
        </app-timeline-item>

        <app-timeline-item
          :variant="item.persetujuan_jurusan ? 'success' : 'secondary'"
          icon="CheckIcon"
        >
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0"
          >
            <h6>Persetujuan Jurusan</h6>
            <small class="text-muted">{{
              (item.persetujuan_jurusan ? (item.persetujuan_jurusan.tanggal.seconds * 1000 - new Date().getTime()) : 0)
                | duration("humanize")
              }} ago</small>
          </div>
          <p>Mohon periksa persyaratan dan data detail usulan Kerja Praktek</p>
          <b-button
            v-if="!item.persetujuan_jurusan"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            class="mr-2"
            variant="outline-primary"
            @click="setujui_pengajuan"
          >
            Setuju
          </b-button>
          <b-button
            v-if="!item.persetujuan_jurusan"
            v-b-toggle.report-list-with-icon
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-danger"
            @click="tolak_pengajuan"
          >
            Tolak
          </b-button>
          <span v-if="item.persetujuan_jurusan">{{
            item.persetujuan_jurusan.status ? "DISETUJUI" : "TIDAK DISETUJUI"
          }}</span>
        </app-timeline-item>

        <!-- FINANCIAL REPORT -->
        <app-timeline-item
          v-if="item.persetujuan_jurusan && item.persetujuan_jurusan.status"
          :variant="item.konfirmasi_ttd_sp ? 'success' : 'secondary'"
          icon="FileTextIcon"
        >
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0"
          >
            <h6>Pembuatan surat permohonan</h6>
            <small class="text-muted">{{
              (item.konfirmasi_ttd_sp ? (item.konfirmasi_ttd_sp.tanggal.seconds * 1000 - new Date().getTime()) : 0)
                | duration("humanize")
              }} ago</small>
          </div>
          <p>Pembuatan surat dikonfirmasi tiap tahapannya</p>
          <b-button
            v-if="!item.konfirmasi_pembuatan_sp"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-primary"
            class="mr-2"
            @click="konfirmasi_pembuatan_sp"
          >
            Konfirmasi Pembuatan
          </b-button>
          <span v-else>DIKONFIRMASI PEMBUATAN</span>
          <b-button
            v-if="!item.konfirmasi_ttd_sp && item.konfirmasi_pembuatan_sp"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-primary"
            class="ml-4"
            @click="konfirmasi_ttd_sp"
          >
            Konfirmasi Tanda Tangan
          </b-button>
          <span
            v-if="item.konfirmasi_ttd_sp"
            class="ml-4"
          >DIKONFIRMASI TANDA TANGAN</span>
        </app-timeline-item>

        <!-- INTERVIEW SCHEDULE -->
        <app-timeline-item
          v-if="item.konfirmasi_ttd_sp"
          :variant="item.surat_permohonan && item.surat_permohonan.status ? 'success' : 'secondary'"
          icon="UploadIcon"
        >
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0"
          >
            <h6>Upload Surat Permohonan</h6>
            <small class="text-muted">{{
              (item.surat_permohonan ? (item.surat_permohonan.tanggal.seconds * 1000 - new Date().getTime()) : 0)
                | duration("humanize")
              }} ago</small>
          </div>
          <p>Mohon cek terlebih dahulu sebelum konfirmasi.</p>
          <div v-if="!item.surat_permohonan">
            <b-form-file
              id="extension"
              v-model="file_sp"
              accept=".pdf"
              :disabled="loadingsp"
            />
            <b-button
              v-if="!loadingsp"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              size="sm"
              variant="outline-primary"
              :disabled="!item"
              @click="uploadfile_sp"
            >
              Konfirmasi Tanda Tangan
            </b-button>
            <b-button
              v-if="loadingsp"
              variant="primary"
              disabled
              class="mr-1"
            >
              <b-spinner small />
              Upload...
            </b-button>
          </div>
          <div
            v-if="item.surat_permohonan && item.surat_permohonan.status"
          >
            <a
              :href="item.surat_permohonan.url"
              target="_blank"
            >
              <b-img
                :src="require('@/assets/images/icons/pdf.png')"
                height="auto"
                width="20"
                class="mr-2"
              />
              <span class="align-bottom">sertifikat PBN</span>
            </a>

          </div>
        </app-timeline-item>

        <!-- ONLINE STORE -->
        <app-timeline-item
          v-if="item.surat_permohonan && item.surat_permohonan.status"
          :variant="item.surat_balasan ? 'success' : 'secondary'"
          icon="CheckIcon"
        >
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0"
          >
            <h6>Konfirmasi Balasan</h6>
            <small class="text-muted">{{
              (item.surat_balasan ? (item.surat_balasan.tanggal.seconds * 1000 - new Date().getTime()) : 0)
                | duration("humanize")
              }} ago</small>
          </div>
          <div v-if="!item.surat_balasan">
            <p>Surat balasan belum diterima</p>
          </div>
          <div v-if="item.surat_balasan">

            <p>Surat Balasan sudah diterima</p>

            <a
              :href="item.surat_balasan.url"
              target="_blank"
            >
              <b-img
                :src="require('@/assets/images/icons/pdf.png')"
                height="auto"
                width="20"
                class="mr-1"
              />
              <span class="align-bottom">Surat Balasan</span>
            </a>
          </div>
        </app-timeline-item>

        <!-- FINANCIAL REPORT -->
        <app-timeline-item
          v-if="item.surat_balasan"
          :variant="item.konfirmasi_ttd_sk ? 'success' : 'secondary'"
          icon="FileTextIcon"
        >
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0"
          >
            <h6>Pembuatan surat keputusan</h6>
            <small class="text-muted">{{
              (item.konfirmasi_ttd_sk ? (item.konfirmasi_ttd_sk.tanggal.seconds * 1000 - new Date().getTime()) : 0)
                | duration("humanize")
              }} ago</small>
          </div>
          <p>Pembuatan surat dikonfirmasi tiap tahapannya</p>
        <b-button
            v-if="!item.konfirmasi_pembuatan_sk"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-primary"
            class="mr-2"
            @click="konfirmasi_pembuatan_sk"
          >
            Konfirmasi Pembuatan
          </b-button>
          <span v-else>DIKONFIRMASI PEMBUATAN</span>
          <b-button
            v-if="!item.konfirmasi_ttd_sk && item.konfirmasi_pembuatan_sk"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-primary"
            class="ml-4"
            @click="konfirmasi_ttd_sk"
          >
            Konfirmasi Tanda Tangan
          </b-button>
          <span
            v-if="item.konfirma_ttd_sk"
            class="ml-4"
          >DIKONFIRMASI TANDA TANGAN</span>
        </app-timeline-item>

        <!-- INTERVIEW SCHEDULE -->
        <app-timeline-item
          v-if="item.konfirmasi_ttd_sk"
          :variant="item.surat_keterangan ? 'success' : 'secondary'"
          icon="UploadIcon"
        >
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0"
          >
            <h6>Upload Surat Keputusan</h6>
            <small class="text-muted">{{
              (item.surat_keterangan ? (item.surat_keterangan.tanggal.seconds * 1000 - new Date().getTime()) : 0)
                | duration("humanize")
              }} ago</small>
          </div>
          <p>Mohon cek terlebih dahulu sebelum konfirmasi.</p>

          <div v-if="!item.surat_keterangan">
            <b-form-file
              id="extension"
              v-model="file_sk"
              accept=".pdf"
              :disabled="loadingsk"
            />
            <b-button
              v-if="!loadingsk"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              size="sm"
              variant="outline-primary"
              :disabled="!item"
              @click="uploadfile_sk"
            >
              Konfirmasi Tanda Tangan
            </b-button>
            <b-button
              v-if="loadingsk"
              variant="primary"
              disabled
              class="mr-1"
            >
              <b-spinner small />
              Upload...
            </b-button>
          </div>
          <div
            v-if="item.surat_keterangan && item.surat_keterangan.status"
          >
            <a
              :href="item.surat_keterangan.url"
              target="_blank"
            >
              <b-img
                :src="require('@/assets/images/icons/pdf.png')"
                height="auto"
                width="20"
                class="mr-2"
              />
              <span class="align-bottom">Surat Keterangan KP</span>
            </a>

          </div>
        </app-timeline-item>

        <!-- INTERVIEW SCHEDULE -->
        <app-timeline-item
          v-if="item.surat_keterangan"
          variant="success"
          icon="CheckIcon"
        >
          <div
            class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0"
          >
            <h6>Selesai</h6>
            <small class="text-muted">{{
              (item.surat_keterangan ? (item.surat_keterangan.tanggal.seconds * 1000 - new Date().getTime()) : 0)
                | duration("humanize")
              }} ago</small>
          </div>
          <p>Usulan sudah selesai</p>

          <!-- <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-danger"
          >
            Hapus usulan
          </b-button> -->
        </app-timeline-item>
      </app-timeline>
    </b-skeleton-wrapper></b-card>
</template>

<script>
import {
  BImg,
  BButton,
  VBToggle,
  VBTooltip,
  BRow,
  BCard,
  BSkeleton,
  BSkeletonWrapper,
  BCardBody,
  BFormFile,
  BSpinner,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import Ripple from 'vue-ripple-directive'
import { ajuanCollection, firebase } from '@/firebase'
import 'firebase/storage'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import axios from '@axios'
// import route from '@/router'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    AppTimeline,
    AppTimelineItem,
    BCard,
    BSkeleton,
    BSkeletonWrapper,
    BImg,
    BButton,
    BRow,
    BCardBody,
    BFormFile,
    BSpinner,
  },
  directives: { 'b-toggle': VBToggle, 'b-tooltip': VBTooltip, Ripple },
  data() {
    return {
      item: null,
      id: this.$route.params.id,
      loading: true,
      file_sp: null,
      file_sk: null,
      loadingsp: false,
      loadingsk: false,
    }
  },
  created() {
    this.$bind('item', ajuanCollection.doc(this.$route.params.id)).then(() => {
      this.loading = false
    })
  },
  methods: {
    uploadfile_sp() {
      this.loadingsp = true
      const storageRef = firebase.storage().ref()
      storageRef
        .child(
          `permohonan_kp/${this.item.pengaju.nama}_${this.item.tanggal.seconds}`,
        )
        .put(this.file_sp)
        .then(snap => {
          snap.ref.getDownloadURL().then(link => {
            ajuanCollection
              .doc(this.$route.params.id)
              .update({
                surat_permohonan: {
                  url: link,
                  status: true,
                  tanggal: firebase.firestore.FieldValue.serverTimestamp(),
                },
              })
              .then(() => {
                this.loadingsp = false
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Berhasil',
                    icon: 'BellIcon',
                    text: 'Berhasil Memperbaharui data',
                    variant: 'success',
                  },
                })
              })
              .catch(err => {
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
          })
        })
    },
    uploadfile_sk() {
      this.loadingsk = true
      const storageRef = firebase.storage().ref()
      storageRef
        .child(
          `keterangan_kp/${this.item.pengaju.nama}_${this.item.tanggal.seconds}`,
        )
        .put(this.file_sk)
        .then(snap => {
          snap.ref.getDownloadURL().then(link => {
            ajuanCollection
              .doc(this.$route.params.id)
              .update({
                surat_keterangan: {
                  url: link,
                  status: true,
                  tanggal: firebase.firestore.FieldValue.serverTimestamp(),
                },
              })
              .then(() => {
                this.loadingsk = false
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Berhasil',
                    icon: 'BellIcon',
                    text: 'Berhasil Memperbaharui data',
                    variant: 'success',
                  },
                })
              })
              .catch(err => {
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
          })
        })
    },
    konfirmasi_pembuatan_sp() {
      this.pengajuan(
        'mengkonfirmasi pembuatan surat permohonan KP',
        'Konfirmasi',
        {
          konfirmasi_pembuatan_sp: {
            status: true,
            tanggal: firebase.firestore.FieldValue.serverTimestamp(),
          },
        },
      )
    },
    konfirmasi_ttd_sp() {
      this.pengajuan(
        'mengkonfirmasi surat permohonan KP telah ditandatangani',
        'Konfirmasi',
        {
          konfirmasi_ttd_sp: {
            status: true,
            tanggal: firebase.firestore.FieldValue.serverTimestamp(),
          },
        },
      )
    },
    konfirmasi_pembuatan_sk() {
      this.pengajuan(
        'mengkonfirmasi pembuatan surat keputusan Kerja Praktek',
        'Konfirmasi',
        {
          konfirmasi_pembuatan_sk: {
            status: true,
            tanggal: firebase.firestore.FieldValue.serverTimestamp(),
          },
        },
      )
    },
    konfirmasi_ttd_sk() {
      this.pengajuan(
        'mengkonfirmasi surat keterangan Kerja Praktek telah ditandatangani',
        'Konfirmasi',
        {
          konfirmasi_ttd_sk: {
            status: true,
            tanggal: firebase.firestore.FieldValue.serverTimestamp(),
          },
        },
      )
    },
    setujui_pengajuan() {
      this.pengajuan('menyetujui usulan permohonan KP', 'Setujui', {
        persetujuan_jurusan: {
          status: true,
          tanggal: firebase.firestore.FieldValue.serverTimestamp(),
        },
      })
    },
    tolak_pengajuan() {
      this.pengajuan('menolak usulan permohonan KP', 'Tolak', {
        persetujuan_jurusan: {
          status: false,
          tanggal: firebase.firestore.FieldValue.serverTimestamp(),
        },
      })
    },
    pengajuan(jenis, button, data) {
      this.$swal({
        title: 'Apa Anda Yakin?',
        text: `Anda akan ${jenis} ${this.item.pengaju.nama}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: button,
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          // eslint-disable-next-line no-underscore-dangle
          ajuanCollection
            .doc(this.$route.params.id)
            .update(data)
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Berhasil',
                  icon: 'BellIcon',
                  text: 'Berhasil Memperbaharui data',
                  variant: 'success',
                },
              })
            })
            .catch(err => {
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
  },
}
</script>

<style lang="scss" scoped>
@import "@core/scss/base/pages/app-invoice.scss";
</style>

<style lang="scss">
@media print {
  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // Invoice Specific Styles
  .invoice-preview-wrapper {
    .row.invoice-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .invoice-preview-card {
        .card-body:nth-of-type(2) {
          .row {
            > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .invoice-actions {
      display: none;
    }
  }
}
</style>
