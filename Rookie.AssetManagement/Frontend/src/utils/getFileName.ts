import { AxiosResponse } from "axios";

export default function (response: AxiosResponse): string {
    const fileNameHeader = "content-disposition";

    const suggestedFileName = response.headers[fileNameHeader];

    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

    const matches = filenameRegex.exec(suggestedFileName);
    
    if (matches != null && matches[1]) {
        return matches[1].replace(/['"]/g, '');
    }

    return 'report.xlsx';
}
