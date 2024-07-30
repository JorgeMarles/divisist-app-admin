export enum ContentType {
    APPLICATION_JSON = "application/json",
    OCTET_STREAM = "application/octet-stream"
}

function download(content: string, filename: string, contentType: ContentType): void {
    if (!contentType) contentType = ContentType.OCTET_STREAM;
    var a = document.createElement('a');
    var blob = new Blob([content], { type: contentType });
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

export default download;