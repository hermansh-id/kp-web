<template>
  <b-card title="Detail Usulan Kerja Praktek">
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card>
          <b-skeleton width="85%" />
          <b-skeleton width="55%" />
          <b-skeleton width="70%" />
        </b-card>
      </template>

      <app-timeline
        v-if="item !== null"
      >

        <!-- 12 INVOICES HAVE BEEN PAID -->
        <app-timeline-item
          variant="success"
          icon="FileTextIcon"
        >
          <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h6>Persyaratan usulan KP</h6>
            <small class="text-muted">{{ new Date(item.tanggal.seconds * 1000) | moment("DD MMMM YYYY") }}</small>
          </div>
          <p>Mohon cek persyaratan.</p>
          <b-row class="ml-0">
            <div
              class="mr-2"
            >
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
              </a></div>
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
              </a></div>
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
              </a></div>
          </b-row>
        </app-timeline-item>

        <app-timeline-item
          variant="secondary"
          icon="CheckIcon"
        >

          <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h6>Persetujuan Jurusan</h6>
            <small class="text-muted">Disetujui 45 min</small>
          </div>
          <p>Mohon periksa persyaratan dan data detail usulan Kerja Praktek</p>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            class="mr-2"
            variant="outline-primary"
          >
            Setuju
          </b-button>
          <b-button
            v-b-toggle.report-list-with-icon
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-danger"
          >
            Tolak
          </b-button>
        </app-timeline-item>

        <!-- FINANCIAL REPORT -->
        <app-timeline-item
          variant="secondary"
          icon="FileTextIcon"
        >

          <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h6>Pembuatan surat permohonan</h6>
            <small class="text-muted">2 hours ago</small>
          </div>
          <p>Pembuatan surat dikonfirmasi tiap tahapannya</p>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-primary"
            class="mr-2"
          >
            Konfirmasi Pembuatan
          </b-button>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-primary"
          >
            Konfirmasi Tanda Tangan
          </b-button>
        </app-timeline-item>

        <!-- INTERVIEW SCHEDULE -->
        <app-timeline-item
          variant="secondary"
          icon="UploadIcon"
        >
          <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h6>Upload Surat Permohonan</h6>
            <small class="text-muted">03:00 PM</small>
          </div>
          <p>Mohon cek terlebih dahulu sebelum konfirmasi.</p>

          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-primary"
          >
            Upload file
          </b-button>
        </app-timeline-item>

        <!-- ONLINE STORE -->
        <app-timeline-item
          variant="secondary"
          icon="CheckIcon"
        >

          <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h6>Konfirmasi Balasan</h6>
            <small class="text-muted">03:00 PM</small>
          </div>
          <p>Surat Balasan sudah diterima</p>

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
            <span class="align-bottom">Surat Balasan</span>
          </a>
        </app-timeline-item>

        <!-- FINANCIAL REPORT -->
        <app-timeline-item
          variant="secondary"
          icon="FileTextIcon"
        >

          <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h6>Pembuatan surat keputusan</h6>
            <small class="text-muted">2 hours ago</small>
          </div>
          <p>Pembuatan surat dikonfirmasi tiap tahapannya</p>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-primary"
            class="mr-2"
          >
            Konfirmasi Pembuatan
          </b-button>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-primary"
          >
            Konfirmasi Tanda Tangan
          </b-button>
        </app-timeline-item>

        <!-- INTERVIEW SCHEDULE -->
        <app-timeline-item
          variant="secondary"
          icon="UploadIcon"
        >
          <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h6>Upload Surat Keterangan</h6>
            <small class="text-muted">03:00 PM</small>
          </div>
          <p>Mohon cek terlebih dahulu sebelum konfirmasi.</p>

          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-primary"
          >
            Upload file
          </b-button>
        </app-timeline-item>

        <!-- INTERVIEW SCHEDULE -->
        <app-timeline-item
          variant="secondary"
          icon="CheckIcon"
        >
          <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h6>Selesai</h6>
            <small class="text-muted">03:00 PM</small>
          </div>
          <p>Usulan sudah selesai</p>

          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="outline-danger"
          >
            Hapus usulan
          </b-button>
        </app-timeline-item>

      </app-timeline>

    </b-skeleton-wrapper></b-card>

</template>

<script>
import {
  BImg, BButton, VBToggle, VBTooltip, BRow,
  BCard,
  BSkeleton,
  BSkeletonWrapper,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import Ripple from 'vue-ripple-directive'
import { ajuanCollection } from '@/firebase'
// import route from '@/router'

export default {
  components: {
    AppTimeline,
    AppTimelineItem,
    BCard,
    BSkeleton,
    BSkeletonWrapper,
    BImg,
    BButton,
    BRow,
  },
  directives: { 'b-toggle': VBToggle, 'b-tooltip': VBTooltip, Ripple },
  data() {
    return {
      item: null,
      id: this.$route.params.id,
      loading: true,
    }
  },
  created() {
    this.$bind('item', ajuanCollection.doc(this.$route.params.id)).then(() => {
      this.loading = false
    })
  },
}
</script>
