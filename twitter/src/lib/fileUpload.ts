export const fileRead = async (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    await new Promise<void>((resolve) => (fileReader.onload = () => resolve()));
    return fileReader.result as string;
};
