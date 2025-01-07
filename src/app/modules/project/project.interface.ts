export interface TProject {
    title: string;
    image: string;
    tags: Array<string>;
}

export type TCloudinaryFileUpload =
    | 'video'
    | 'auto'
    | 'image'
    | 'raw'
    | undefined;
