import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import errorHandler from "../store/ErrorHandler";
import { Base64, decode, encode } from "js-base64";
import api from "../store/Api";





//For Register


export const registerUser = createAsyncThunk(
    'user/register',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('auth/register', userInput);
            if (response?.data?.status_code === 201) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)


//for OTP

export const verifyOtp = createAsyncThunk(
    'user/verify-otp',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('otpapi', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Failed to verify OTP');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


// For Login


export const login = createAsyncThunk(
    'auth/login',
    async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.post('/auth/login', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
)

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/forget-password', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
)
export const resetPassword = createAsyncThunk(
    'auth/resetPawwrod',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('forget-password/reset-password', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
)

export const createSubDomain = createAsyncThunk(
    'auth/createSubDomain',
    async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.post('/sub-domain/create-subdomain', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
)
export const getSubdomain = createAsyncThunk(
    'auth/getSubdomain',
    async (userInput, { rejectWithValue }) => {

        try {
            const response = await api.get('/domain/get-all-domains', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
)
//init state

const initialState = {
    message: null,
    error: null,
    loading: false,
    isLoggedIn: false,
    currentUser: {},
    subdomain: [],

}



//slice part
const AuthSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {

            clearCurrentUser: (state) => {
                state.currentUser = {};
            },
            resetAfterLoggedIn: (state) => {
                state = { ...initialState, isLoggedIn: true };
            },

            logout: (state) => {
                state.isLoggedIn = false;
                state.currentUser = {};
                state.message = null;
                state.error = null
                localStorage.removeItem('ecomToken')
                localStorage.removeItem('userType')
                localStorage.removeItem('userId')
                localStorage.removeItem('first_name')
                localStorage.removeItem('shortName')
                localStorage.removeItem('sub_domain_name')
                localStorage.removeItem('domain_status')
            }
        },
        extraReducers: (builder) => {
            builder.addCase(registerUser.pending, (state) => {
                state.message = null
                state.loading = true;
                state.error = null
            })
                .addCase(registerUser.fulfilled, (state, { payload }) => {
                    const { email, user_name, first_name, last_name, password } = payload;
                    state.loading = false;
                    state.message = payload;
                    state.currentUser = {
                        password: password,
                        email: email,
                        user_name: user_name,
                        first_name: first_name,
                        last_name: last_name,
                    };
                })
                .addCase(registerUser.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })
                .addCase(verifyOtp.pending, (state) => {
                    state.message = null;
                    state.error = null;
                    state.loading = true;
                })
                .addCase(verifyOtp.fulfilled, (state, { payload }) => {
                    const { message } = payload;
                    state.loading = false;
                    state.currentUser.otp_verified = 1;
                    state.message = message;
                })
                .addCase(verifyOtp.rejected, (state, response) => {
                    state.loading = false;
                    state.message =
                        response.payload !== undefined && response.payload.message
                            ? response.payload.message
                            : 'Something went wrong. Try again later.';
                })

                .addCase(login.pending, (state) => {
                    state.loading = true;
                    state.isLoggedIn = false;
                    state.error = false;
                })
                .addCase(login.fulfilled, (state, { payload }) => {
                    const { token, data, sub_domain_name, sub_domain } = payload;
                    // console.log("Payload", payload?.data[0]);
                    state.isLoggedIn = true;

                    state.message = payload?.message;
                    state.loading = false;
                    // state.currentUser = {
                    //     password: password,
                    //     userName: userName,
                    // };
                    localStorage.setItem(
                        'ecomToken',
                        JSON.stringify({ token: token })
                    )
                    localStorage.setItem('userType', Base64.encode(JSON.stringify({ user_type: data[0]?.user_type })))

                    localStorage.setItem('userId', Base64.encode(JSON.stringify({ user_id: data[0]?.id })))
                    localStorage.setItem('shortName', Base64.encode(JSON.stringify({ user_type_short_name: data[0]?.user_type_short_name })))
                    localStorage.setItem('first_name', Base64.encode(JSON.stringify({ first_name: data[0]?.first_name })))
                    localStorage.setItem('domain_status', Base64.encode(JSON.stringify({ sub_domain: sub_domain })))

                    localStorage.setItem('sub_domain_name', Base64.encode(JSON.stringify({ sub_domain_name: sub_domain_name })))

                })

                .addCase(login.rejected, (state, { payload }) => {
                    // console.log("Payload: ", payload);
                    state.error = true;
                    state.loading = false;
                    state.message =
                        payload !== undefined && payload.message
                            ? payload.message
                            : 'Something went wrong. Try again later.';
                })
                .addCase(forgotPassword.pending, (state) => {
                    state.loading = true;
                })
                .addCase(forgotPassword.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.message = payload?.message;
                })
                .addCase(forgotPassword.rejected, (state, { payload }) => {
                    // console.log("Payload: ", payload);
                    state.error = true;
                    state.loading = false;
                    state.message =
                        payload !== undefined && payload.message
                            ? payload.message
                            : 'Something went wrong. Try again later.';
                })
                .addCase(resetPassword.pending, (state) => {
                    state.loading = true;
                })
                .addCase(resetPassword.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.message = payload.message
                })
                .addCase(resetPassword.rejected, (state, { payload }) => {
                    // console.log("Payload: ", payload);
                    state.error = true;
                    state.loading = false;
                    state.message =
                        payload !== undefined && payload.message
                            ? payload.message
                            : 'Something went wrong. Try again later.';
                })
                .addCase(createSubDomain.pending, (state) => {
                    state.loading = true
                })
                .addCase(createSubDomain.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.message = payload
                    state.error = false
                })
                .addCase(createSubDomain.rejected, (state, { payload }) => {
                    state.error = true;
                    state.loading = false;
                    state.message =
                        payload !== undefined && payload.message
                            ? payload.message
                            : 'Something went wrong. Try again later.';
                })
                .addCase(getSubdomain.pending, (state) => {
                    state.loading = false
                })
                .addCase(getSubdomain.fulfilled, (state, { payload }) => {
                    console.log("Payload: ", payload);
                    const { data } = payload
                    console.log("data: ", data?.[0]?.server_domain);
                    state.loading = false
                    state.subdomain = payload
                    state.error = false
                    localStorage.setItem("serverDomainInside", data?.[0]?.server_domain)
                })
                .addCase(getSubdomain.rejected, (state, { payload }) => {
                    state.error = true;
                    state.loading = false;
                    state.message =
                        payload !== undefined && payload.message
                            ? payload.message
                            : 'Something went wrong. Try again later.';
                })
        }
    }
)

export const { resetAfterLoggedIn, clearCurrentUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer