import { Request } from 'express';

export const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
    if (!file) return cb(new Error('Archivo no exite'), false);
    const fileExtension = file.mimetype.split('/')[1];
    const validExtension = ['jpg', 'jpeg', 'png', 'gif'];
    console.log('validacion',validExtension.includes(fileExtension));
    if (validExtension.includes(fileExtension)) {
        console.log('cuantas veces ha entradoooo');
        return cb(null, true);
    }
    cb(null, false);
}
