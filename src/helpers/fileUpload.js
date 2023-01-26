export const fileUpload = async (file) => {
    if (!file) throw new Error('No hay archivos para subir');

    const cloudURL = 'https://api.cloudinary.com/v1_1/db08a1tij/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try{
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });

        // console.log(resp);
        if(!resp.ok) throw new Error('No se obtvo respuesta');
        const cloudResp= await resp.json();
        // console.log(cloudResp);
        return cloudResp.secure_url
    }catch(error){
        console.log("Error File Upload:", error);
        throw new Error(error.message);
    }
}