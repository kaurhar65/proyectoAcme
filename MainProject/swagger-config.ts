import { environment } from 'ClientApp/src/environments/environment';

export const swaggerConfig = {
    url: `${environment.apiUrl}/swagger/v1/swagger.json`,
    enabled: true,
};
