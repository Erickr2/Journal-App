
//funcion que carga las imagenes en cloudinary y recibe un archivo 
export const fileUpload = async( file ) => {

    if( !file ) throw new Error('No ha cargado ningun archivo')

    const cloudURL = 'https://api.cloudinary.com/v1_1/dpniszgyf/upload'; //guardo en endpoint
    const formData =  new FormData(); //guardo el formdata para crear mi formData
    formData.append('upload_preset', 'React-journal'); //creo mi primer columna con la llave 'upload_preset' y el valor 'React-jorunal que es el proyecto donde vamos a trabajar en cloudinary
    formData.append('file', file);// valor file y el file que voy a subir

    try {
        //espero la respuesta de mi endpoint
        const resp = await fetch( cloudURL, { //mando el endpoit y dentro el metodo y en el body mi formdata
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('no se pudo subir la imagen')
        //guardo y tranformo mi respuesta en un json
        const cloudResp = await resp.json();

        return cloudResp.secure_url; //retorno el url seguro de mi respuesta

    } catch (error) {

        console.log(error)
        throw new Error(error.message)

    }
};