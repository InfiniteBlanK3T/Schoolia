export const validateTitle = (title: string): boolean => {
  return title.length >= 5 && title.length <= 100;
};

export const validateDescription = (description: string): boolean => {
  return description.length >= 20 && description.length <= 1000;
};

export const validateAttachments = (files: FileList | null): boolean => {
  if (!files) return true;
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];

  for (let i = 0; i < files.length; i++) {
    if (files[i].size > maxSize || !allowedTypes.includes(files[i].type)) {
      return false;
    }
  }
  return true;
};
