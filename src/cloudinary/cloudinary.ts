import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: () => {
        return v2.config({
            cloud_name: 'dn49cdq1m',
            api_key: '847375549416715',
            api_secret: 'VW_PL1e23s1CiOUdX4ynRGEYHIA',
            secure: true
        });
    },
};