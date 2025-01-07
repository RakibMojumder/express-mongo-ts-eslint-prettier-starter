import catchAsync from '../../utils/catchAsync';
import Review from './review.model';

const addReview = catchAsync(async (req, res) => {
    const { name, companyName, description, image } = req.body;

    if (!name || !companyName || !description || !image) {
        return res
            .status(400)
            .json({ success: false, message: 'All fields are required' });
    }

    const review = await Review.create(req.body);

    res.status(200).json({
        success: true,
        message: 'Review added successfully',
        data: review,
    });
});

const getAllReview = catchAsync(async (req, res) => {
    const reviews = await Review.find().sort('-createAt');

    res.status(200).json({
        success: true,
        message: 'Review retrieved successfully',
        data: reviews,
    });
});

const reviewControllers = { addReview, getAllReview };

export default reviewControllers;
