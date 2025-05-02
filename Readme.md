# **Tugas Aplikasi Warung Makan Bahari (WMB)**

## **Deskripsi Aplikasi**
Aplikasi **Warung Makan Bahari (WMB)** adalah aplikasi untuk mengelola data terkait **menu**, **customer**, dan **transaksi pembelian** makanan. Pengguna dapat melakukan **registrasi**, **login**, menambahkan **menu**, menambah **customer**, serta melihat daftar **menu** dan **customer**.

Aplikasi ini terhubung dengan **API backend** yang telah disediakan sebelumnya dan menggunakan **React** untuk frontend.

---

## **Fitur Aplikasi**
1. **Registrasi Pengguna**
    - Pengguna baru dapat melakukan registrasi dengan memasukkan **username** dan **password**.
    - Endpoint API: `POST /register`
    - Body (JSON):
      ```json
      {
        "username": "user1",
        "password": "password123" ,
        "name" : "xxx", 
        "address" : "xxx", 
        "phone" : "08xxx" 
      }
      ```

2. **Login Pengguna**
    - Pengguna dapat login menggunakan **username** dan **password** untuk mendapatkan **JWT token**.
    - Endpoint API: `POST /login`
    - Body (JSON):
      ```json
      {
        "username": "user1",
        "password": "password123"
      }
      ```
    - Response (JSON):
      ```json
      {
        "token": "your-jwt-token-here"
      }
      ```

3. **Menambahkan Menu Baru**
    - Pengguna yang sudah login dapat menambahkan **menu** baru ke dalam sistem.
    - Endpoint API: `POST /menus`
    - Headers:
      - Authorization: `Bearer <your-jwt-token-here>`
    - Body (JSON):
      ```json
      {
        "name": "Nasi Goreng",
        "stock": 20,
        "price": 20000
      }
      ```

4. **Mendapatkan Daftar Menu**
    - Pengguna dapat melihat daftar **menu** yang ada.
    - Endpoint API: `GET /menus`
    - Headers:
      - Authorization: `Bearer <your-jwt-token-here>`

5. **Menambahkan Customer Baru**
    - Pengguna dapat menambahkan **customer** baru ke dalam sistem.
    - Endpoint API: `POST /customers`
    - Headers:
      - Authorization: `Bearer <your-jwt-token-here>`
    - Body (JSON):
      ```json
      {
        "name": "John Doe",
        "address": "Jl. ABC No. 123",
        "phone": "08123456789"
      }
      ```

6. **Mendapatkan Daftar Customer**
    - Pengguna dapat melihat daftar **customer** yang ada.
    - Endpoint API: `GET /customers`
    - Headers:
      - Authorization: `Bearer <your-jwt-token-here>`

7. **Menambahkan Meja Baru**
    - Pengguna dapat menambahkan **meja** baru ke dalam sistem.
    - Endpoint API: `POST /tables`
    - Headers:
      - Authorization: `Bearer <your-jwt-token-here>`
    - Body (JSON):
      ```json
      {
        "number": 1,
        "status": "available"
      }
      ```

8. **Mengubah Status Meja**
    - Pengguna dapat mengubah status meja menjadi **occupied** atau **available**.
    - Endpoint API: `PUT /tables/:id`
    - Headers:
      - Authorization: `Bearer <your-jwt-token-here>`
    - Body (JSON):
      ```json
      {
        "status": "occupied"
      }
      ```

9. **Melakukan Transaksi Pembelian**
    - Pengguna dapat melakukan **transaksi pembelian** dengan memilih beberapa menu dan memilih apakah ingin makan ditempat atau dibawa pulang.
    - Endpoint API: `POST /transaction`
    - Headers:
      - Authorization: `Bearer <your-jwt-token-here>`
    - Body (JSON):
      ```json
      {
        "customerId": 1,
        "items": [1, 2],
        "isDineIn": true,
        "tableNumber": 1
      }
      ```
    - Response (JSON):
      ```json
      {
        "customer": "John Doe",
        "items": [
          { "name": "Nasi Goreng", "price": 20000 },
          { "name": "Mie Goreng", "price": 15000 }
        ],
        "totalAmount": 35000,
        "isDineIn": true,
        "tableNumber": 1
      }
      ```

---

## **Tugas Pengembangan**
### **Tugas 1: Struktur Aplikasi dan Routing**
- Gunakan **React Router** untuk mengatur navigasi antar halaman:
  - **Halaman Registrasi** (Route: `/register`)
  - **Halaman Login** (Route: `/login`)
  - **Halaman Menu** (Route: `/tables`)
  - **Halaman Menu** (Route: `/menus`)
  - **Halaman Customer** (Route: `/customers`)
- Setiap halaman memiliki **fungsi dan form** yang sesuai dengan API di atas.

### **Tugas 2: Implementasi Form Registrasi dan Login**
- **Form Registrasi**:
  - Mengirim request ke API **`POST /register`** untuk registrasi pengguna baru.
  - Simpan data **username** dan **password** untuk registrasi pengguna.
- **Form Login**:
  - Mengirim request ke API **`POST /login`** untuk login dan mendapatkan **JWT token**.
  - Simpan **token** setelah login dan gunakan untuk autentikasi pada API lainnya.

### **Tugas 3: Menambahkan Menu dan Customer**
- Implementasikan form untuk menambahkan **menu** dan **customer**.
  - Form **Tambah Menu**: Mengirim request ke API **`POST /menus`** untuk menambahkan menu baru.
  - Form **Tambah Customer**: Mengirim request ke API **`POST /customers`** untuk menambahkan customer baru.

### **Tugas 4: Menampilkan Daftar Menu dan Customer**
- Buat halaman yang menampilkan **daftar menu** dan **daftar customer**.
  - Gunakan API **`GET /menus`** dan **`GET /customers`** untuk mengambil data dan menampilkannya di halaman.

### **Tugas 5: Manajemen Meja**
- Implementasikan form untuk **menambahkan meja** dan **mengubah status meja**.
  - Form **Tambah Meja**: Mengirim request ke API **`POST /tables`** untuk menambahkan meja baru.
  - Form **Ubah Status Meja**: Mengirim request ke API **`PUT /tables/:id`** untuk memperbarui status meja menjadi **occupied**.

### **Tugas 6: Melihat list, detail dan melakukan Transaksi Pembelian**
- Buat halaman yang menampilkan **daftar transaksi**.
  - Gunakan API **`GET /transactions`** untuk mengambil data dan menampilkannya di halaman.
- Implementasikan form untuk **melakukan transaksi pembelian**.
  - Pengguna dapat memilih menu dan memilih **makan ditempat** atau **dibawa pulang**.
  - Kirimkan data transaksi ke API **`POST /transaction`** dan tampilkan detail transaksi yang berhasil.

---

## **Penilaian**
1. **Struktur dan Arsitektur Aplikasi**: 
   - Menyusun komponen React dengan baik dan sesuai dengan fungsinya.
   - Penggunaan **React Router** untuk navigasi antar halaman.

2. **Interaksi dengan API**:
   - Penggunaan **fetch** untuk berinteraksi dengan backend API yang sudah disediakan.
   - Menangani **token JWT** dengan benar untuk otorisasi pada setiap request.

3. **Desain dan UI**:
   - Menggunakan **Tailwind CSS** dan framework ui untuk membuat tampilan yang rapi dan responsif.
   - Desain yang bersih dan user-friendly.

4. **Fungsionalitas**:
   - Semua fitur yang disebutkan (registrasi, login, tambah menu, tambah customer, transaksi) berjalan dengan baik dan terhubung dengan backend API.

---

## **Cara Menjalankan Aplikasi**
1. **Menjalankan Backend API**:
   - Pastikan backend API Anda sudah berjalan di `http://localhost:5000` atau sesuaikan dengan port yang digunakan.

2. **Menjalankan Aplikasi Backend**:
   - Double click pada file exe sesuai os masing2

---
