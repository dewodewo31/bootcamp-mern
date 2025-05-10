const { trusted } = require("mongoose");
const multer = require("multer");

/**
 * multer.diskStorage()
 * Method ini digunakan untuk membuat storage engine yang menentukan cara penyimpanan file ke disk.
 * Mengambil konfigurasi object yang berisi 2 function utama: destination dan filename.
 */

const storage = multer.diskStorage({
  /**
   * destination Function
   * Fungsi: Menentukan folder tujuan penyimpanan file
   * Parameter seharusnya: (req, file, cb)
   * cb(null, "public/uploads/") artinya file akan disimpan di folder public/uploads/
   */
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },

  /**
   *
   * Membuat nama file unik untuk menghindari overwrite file
   * Cara kerja:
   * Generate angka random antara 0-99999999
   * Digabung dengan nama original file
   * Contoh hasil: 48392934-foto_saya.jpg
   */
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 99999999) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  /**
   * melakukan logic validasi tipe file yang diperbolehkan untuk upload
   */
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
    /**
     * melakukan reject file jika file tidak sesuai dengan tipe yang disupport
     */
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: fileFilter,
});

module.exports = uploadMiddleware;
