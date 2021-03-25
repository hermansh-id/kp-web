export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Pengguna',
    route: 'pengguna',
    icon: 'UserIcon',
  },
  {
    title: 'Pengajuan',
    icon: 'FileIcon',
    children: [
      {
        title: 'Kerja Praktek',
        route: 'kp',
        icon: 'FileIcon',
      },
      {
        title: 'Kartu Aktif Kuliah',
        route: 'kak',
        icon: 'FileIcon',
      },
    ],
  },
]
