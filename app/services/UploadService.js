const supabase = require('../config/configSupabase'); 

const uploadPhoto = async (file) => {
  try {
      const fileName = `photo-${Date.now()}-${file.originalname}`;

      // Upload ke Supabase Storage
      const { data: uploadResult, error } = await supabase.storage
          .from('profile') // Ganti 'photos' dengan nama bucket Anda
          .upload(fileName, file.buffer, {
              contentType: file.mimetype,
          });

      if (error) {
          throw new Error('Failed to upload photo: ' + error.message);
      }

      // Dapatkan URL publik file
      const { data: publicUrlData } = supabase.storage
          .from('profile')
          .getPublicUrl(uploadResult.path);

      return {
          fileName: fileName,
          fileUrl: publicUrlData.publicUrl,
      };
  } catch (error) {
      throw new Error(error.message);
  }
};

module.exports = {
  uploadPhoto
};
