import { Router } from 'express';
import upload from '../../utils/multerFileUpload';
import projectControllers from './project.controller';

const router = Router();

router.get('/', projectControllers.getAllProjects);
router.post('/create-project', projectControllers.createProject);
router.post(
    '/file-upload',
    upload.single('file'),
    projectControllers.fileUpload
);

const projectRoute = router;
export default projectRoute;
