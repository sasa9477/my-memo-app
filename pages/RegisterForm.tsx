import React from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import type { Memo } from "prisma/prisma-client";
import Axios from "./Axios";

export type RegisterFormProps = {
    onSubmit?: () => void
}

type FormInputs = {
    content: string
};

interface ICreateMemoRequest {
    content: string
}

interface ICreateMemoResponse {
    memo: Memo
}

const RegisterForm = (props: RegisterFormProps) => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm<FormInputs>();
    const onSubmitForm: SubmitHandler<FormInputs> = async inputs => {
        const requestData: ICreateMemoRequest = {
            content: inputs.content
        }

        const res = await Axios.post<ICreateMemoResponse>("/create-memo", requestData)
            .then(res => res.data);

        console.log('axios result', res);

        props.onSubmit && props.onSubmit();
    }

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <textarea rows={10} { ...register("content", { required: true })}></textarea>
            {errors.content && <span>Content is required.</span>}
            <input type="submit" value="新規登録"/>
        </form>
    )
}

export default RegisterForm