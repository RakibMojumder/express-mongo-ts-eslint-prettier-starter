import { model, Schema } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema<TProject>(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

const Project = model<TProject>('project', projectSchema);
export default Project;
