import { FileInput, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateProfile, viewProfile } from "../../Reducer/ProfileSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
    const dispatch = useDispatch();
    const { profileDetail, loadingPro } = useSelector((state) => state.profile);
    console.log("profileDetail", profileDetail)

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(viewProfile()).then((res) => {
            console.log("res", res)
            if (res?.payload?.status_code === 200) {
                setValue("avatar", res?.payload?.data?.avatar)
                setValue("first_name", res?.payload?.data?.first_name)
                setValue("last_name", res?.payload?.data?.last_name)
                setValue("user_name", res?.payload?.data?.user_name)
                setValue("email", res?.payload?.data?.email)
                setValue("mobile", res?.payload?.data?.mobile)

                const createdAt = res?.payload?.data?.created_at;
                const formattedDate = new Date(createdAt).toLocaleDateString('en-GB');
                // This will format the date as DD-MM-YYYY
                setValue("createdAt", formattedDate);
            }
        })
    }, [dispatch, setValue]);

    const onSubmit = (data) => {
        console.log("Data", data)
        const formData = new FormData();
        if (data?.avatar && data?.avatar[0]) {
            formData.append("avatar", data.avatar[0]);
        }
        formData.append("first_name", data?.first_name);
        formData.append("last_name", data?.last_name);
        formData.append("mobile", data?.mobile);
        formData.append("user_name", data?.user_name);
        formData.append("email", data?.email);
        dispatch(updateProfile(formData)).then((res) => {
            console.log("Updated Res", res);
            if (res?.payload?.status_code === 200) {
                toast.success(res?.payload?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(viewProfile());
            } else if (res?.payload?.response?.data?.data[0]?.message) {
                toast.error(res?.payload?.response?.data?.data[0]?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        });

    };

    return (
        <>
            <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg mt-10">
                <h2 className="text-2xl font-bold mb-6 text-blue-500 text-center">Profile</h2>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label className="block text-black font-medium mb-1">Profile Picture</Label>
                        <FileInput
                            type="file"
                            id="avatar"
                            className="w-full"
                            accept="image/*"
                            {...register("avatar")}
                        />
                        {profileDetail?.data?.avatar && (
                            <img
                                src={profileDetail?.data?.avatar}
                                alt="Profile"
                                className="w-24 h-24 mt-4 rounded-full object-cover"
                            />
                        )}
                    </div>

                    <div>
                        <Label className="block text-black font-medium mb-1">First Name</Label>
                        <TextInput
                            type="text"
                            id="firstName"
                            sizing="md"
                            {...register("first_name")}
                        />
                    </div>

                    <div>
                        <Label className="block text-black font-medium mb-1">Last Name</Label>
                        <TextInput
                            type="text"
                            id="lastName"
                            sizing="md"
                            {...register("last_name")}
                        />
                    </div>

                    <div>
                        <Label className="block text-black font-medium mb-1">Username</Label>
                        <TextInput
                            type="text"
                            id="username"
                            sizing="md"
                            {...register("user_name")}
                        />
                    </div>

                    <div>
                        <Label className="block text-black font-medium mb-1">Email</Label>
                        <TextInput
                            type="email"
                            id="email"
                            sizing="md"
                            {...register("email", {
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        "Entered value does not match email format",
                                },
                            })}
                        />
                    </div>

                    <div>
                        <Label className="block text-black font-medium mb-1">Mobile</Label>
                        <TextInput
                            type="tel"
                            id="mobile"
                            sizing="md"
                            {...register("mobile", {
                                pattern: {
                                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                    message: "Only numbers are allowed",
                                },
                            })}
                        />
                    </div>

                    {/* <div>
                        <Label className="block text-black font-medium mb-1">Status</Label>
                        <select
                            name="status"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div> */}

                    <div className="mt-4">
                        <Label className="block text-black font-medium">Created At</Label>
                        <TextInput
                            type="text"
                            id="createdAt"
                            sizing="md"
                            readOnly
                            {...register("createdAt")}
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            {loadingPro ? "Wait.." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default Profile;