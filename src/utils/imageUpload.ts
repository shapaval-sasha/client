export const checkImage = (file: File) => {
  let err = '';
  if (!file) return (err = 'File does not exist.');

  if (file.size > 1024 * 1024 * 10) err = 'The largest image sige 10Mb';
  return err;
};

export const imageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'blog_Al');
  formData.append('cloud_name', 'eccomers');


  const res = await fetch("https://api.cloudinary.com/v1_1/eccomers/upload", {
    method: "POST",
    body: formData
  })

  const data = await res.json()
  return { public_id: data.public_id, url: data.secure_url };
}