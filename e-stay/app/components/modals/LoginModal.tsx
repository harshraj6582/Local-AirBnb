'use client'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback , useState } from 'react';
import Modal from './Modals';
import {
    FieldValues,
    SubmitHandler,
    useForm,
    FieldErrors
} from 'react-hook-form';
import Heading from '../navbar/Heading';
import {signIn} from 'next-auth/react'
import Input from '../inputs/Inputs';
import userRegisterModal from '@/app/hooks/useRegisterModal';
import toast from 'react-hot-toast';
import Button from '../Button';
import userLoginModal from '@/app/hooks/useLoginModal';
import { callbackify } from 'util';
import { useRouter } from 'next/navigation';


const LoginModal  = () => {
    const router = useRouter();
    const registerModal = userRegisterModal();
    const loginModal = userLoginModal()
    const [isLoading , setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState : {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues : {
           
            email : '',
            password : ''
        }
    });

    const onSubmit : SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);
        
        signIn('credentials' ,{
            ...data ,
            redirect: false,
        })
        .then((callback) =>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success("Logged In ");
                router.refresh();
                loginModal.onClose();



            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
            title = "Welcome Back "
            subtitle='Login to your Account'
            
            /> 
            <Input
            id = "email"
            label = "Email"
            disabled = {isLoading}
            register={register}
            errors= {errors}
            required
            
            />
         

            <Input
            id = "password"
            type = "password"
            label = "Password"
            disabled = {isLoading}
            register={register}
            errors= {errors}
            required
            
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3 ' >
            <hr/>
            <Button
            outline
            label = "Continue with Google"
            icon = {FcGoogle}
            onClick={() => signIn('google')}
            
            />

            <Button
            outline
            label = "Continue with Github"
            icon = {AiFillGithub}
            onClick={()=>{}}
            
            />

            <div className='
            text-neutral-500
            text-center
            mt-4
            font-light'
            
            >

                <div className=' justify-center flex flex-row items-center gap-2 '>
                    <div>
                        Already have account ?
                    </div>
                    <div onClick={registerModal.onClose} 
                    className='text-neutral-800
                    cursor-pointer
                    hover:underline'>
                        Login 
                    </div>
                </div>

            </div>
        </div>
    )




    return ( 
        <Modal
            disabled = {isLoading}
            isOpen = {loginModal.isOpen}
            title = "Login"
            actionLabel = "Continue"
            onClose = {loginModal.onClose}
            onSubmit = {handleSubmit(onSubmit)}
            body = {bodyContent}
            footer = {footerContent}
        />
            

        
     );
}
 
export default LoginModal ;