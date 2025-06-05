'use client'

import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { registerUser } from "@/actions/authActions";

export default function RegisterForm() {
    const { register, handleSubmit, setError, formState: { errors, isValid, isSubmitting } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'
    });

    async function onSubmit(data: RegisterSchema) {
        const result = await registerUser(data);

        if (result.status === 'error') {

            if (Array.isArray(result.error)) {
                result.error.forEach(element => {
                    const fieldName = element.path.join('.') as 'email' | 'name' | 'password';
                    setError(fieldName, { message: element.message })
                });
            } else {
                setError('root.serverError', { message: result.error })
            }

        }

    }

    return (
        <Card className='w-2/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className='flex flex-row items-center gap-3'>
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">Sign up</h1>
                    </div>
                    <p className="text-neutral-500">Join NextMatch!</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input label='Name' variant='bordered' type='text' {...register('name')} isInvalid={!!errors.name} errorMessage={errors.name?.message} />
                        <Input label='Email' variant='bordered' type='email' {...register('email')} isInvalid={!!errors.email} errorMessage={errors.email?.message} />
                        <Input label='Password' variant='bordered' type='password' {...register('password')} isInvalid={!!errors.password} errorMessage={errors.password?.message} />
                        {errors.root?.serverError && (<p className='text-danger text-sm'>{errors.root.serverError.message}</p>)}
                        <Button fullWidth color='secondary' type='submit' isLoading={isSubmitting} isDisabled={!isValid}>Submit</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}