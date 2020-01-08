const config = require('../config/config');

exports.fileUpload=  {
    async handler(request, reply) {
        // PREFIX = (request.auth.credentials.companyShortCode).toLowerCase();
        let documentdata = request.payload;
        const updateparam = {
            tri_id: documentdata.tri_id,
            tri_name: documentdata.tri_name,
            document_name: documentdata.document_name,
            document_path: documentdata.documentPath,
            created_on: documentdata.created_on,
            updated_on: documentdata.updated_on
        };
        let uploadPath = "";
        let ext;

        let date = new Date();
        let timerDis = "-" + date.getFullYear() + "_" + date.getDate() + "_" + date.getMonth() + 1;
        const lastIndex = (updateparam.document_name).lastIndexOf('.');
        ext = updateparam.document_name.substr(lastIndex + 1, updateparam.document_path.length);
        if (ext == "octet-stream") {
            ext = "doc";
        } else if (ext == "octet-stream") {
            ext = "pdf";
        }
        uploadPath = `${config.TRI_UPLOAD_CONTENT}${request.auth.credentials.companyShortCode}${updateparam.tri_id}${timerDis}${timerDis ? ('-' + updateparam.document_name) : ''}.${ext}`;
        // remove header
        let base64Image = documentdata.documentPath.split(';base64,').pop();
        fs.writeFileSync(uploadPath, base64Image, {
            encoding: 'base64'
        });
        const updateparam2 = {
            tri_id: documentdata.tri_id,
            tri_name: documentdata.tri_name,
            document_name: documentdata.document_name,
            document_path: `${request.auth.credentials.companyShortCode}${updateparam.tri_id}${timerDis}${timerDis ? ('-' + updateparam.document_name) : ''}.${ext}`,
            created_on: documentdata.created_on,
            updated_on: documentdata.updated_on
        }
        commonFunction.insertTable(Tri_uploadcontent, updateparam2).then(resultdocument => {
            return reply({
                edc: commonFunction.encrypt(JSON.stringify({
                    statusCode: 200,
                    error: false,
                    success: true,
                    message: 'document uploaded successfully',
                    data: resultdocument
                }))
            });
        }).catch(err => {
            console.log(`Error is ${err}`)
            success = false;
            error = true;
            message = 'Unable to upload document';
        });
    }
}