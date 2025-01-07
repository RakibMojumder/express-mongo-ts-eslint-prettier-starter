import bcrypt from 'bcrypt';
import catchAsync from '../../utils/catchAsync';
import User from './user.model';
import generateToken from '../../utils/generateToken';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
    const data = req.body;
    await User.create(data);

    res.status(200).json({
        success: true,
        message: 'User created successfully',
    });
});

const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }

    // check is user exist in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    // check is password match
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(404).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    //   create token
    const token = generateToken(
        { id: user._id, email: user.email },
        config.jwt_access_token as string,
        '2d'
    );

    res.cookie('token', token, {
        secure: true,
        // httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.status(200).json({
        success: true,
        message: 'login successful',
        data: { token },
    });
});

const userControllers = { createUser, loginUser };
export default userControllers;
