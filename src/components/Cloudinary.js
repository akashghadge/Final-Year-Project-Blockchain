
//import getCloudinaryUrl from './Cloudinary.js';
//getCloudinaryUrl(file)
import axios from 'axios';

const getCloudinaryUrl = (input) =>{
    return new Promise
    (
        function(resolve,reject){
            let reader = new FileReader();
            reader.readAsDataURL(input);
            let image = input;
            if(image != null){
                const formdata = new FormData();
                  formdata.append("file",image );
                  formdata.append("upload_preset", "b1mhgyub")
                  axios.post("https://api.cloudinary.com/v1_1/darshanscloud/image/upload", formdata).then(async (res) => {
                    let url = res.data.secure_url;
                    return resolve(url);
                  })
                }
            else{
                return reject(null);
            }
        }
    )
}
export default getCloudinaryUrl;