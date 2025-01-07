import catchAsync from '../../utils/catchAsync';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { TCloudinaryFileUpload } from './project.interface';
import fs from 'fs';
import config from '../../config';
import Project from './project.model';

cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
});

const createProject = catchAsync(async (req, res) => {
    const { title, tags, image } = req.body;

    if (!title || !tags.length || !image) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }

    await Project.create(req.body);

    return res
        .status(200)
        .json({ success: true, message: 'Project created successfully' });
});

const fileUpload = catchAsync(async (req, res) => {
    const image = req.file;

    const resource_type = image?.mimetype.split(
        '/'
    )[0] as TCloudinaryFileUpload;

    cloudinary.uploader.upload(
        image?.path as string,
        {
            folder: 'artists',
            resource_type,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any, result: UploadApiResponse | undefined) => {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Could not upload file to cloudinary',
                });
            }

            fs.unlink(image?.path as string, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log('File is deleted.');
                }
            });

            res.status(200).json({
                message: 'file uploaded successfully',
                data: result?.secure_url,
            });
        }
    );
});

const getAllProjects = catchAsync(async (req, res) => {
    const projects = await Project.find().sort('-createdAt');

    res.status(200).json({
        success: true,
        message: 'Projects retrieved successfully',
        data: projects,
    });
});

const projectControllers = { createProject, fileUpload, getAllProjects };

export default projectControllers;
