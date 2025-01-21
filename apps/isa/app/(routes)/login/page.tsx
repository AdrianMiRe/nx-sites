'use client';
import Head from 'next/head'
import Image from 'next/image';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormProvider } from 'react-hook-form';

import { GeneralSpinner } from '@repo/ui/spinner';
import { StyledButton } from '@repo/ui/button';
import { FormInput } from '@repo/ui/formInput';
import { Toast } from '@repo/ui/toast';

import useLogin from '@repo/graphql/hooks/login/useLogin';

const LoginForm = ( { 
    type,
    methods,
    loading,
    onSubmit,
    width,
    handleVisibility
}: { type: any, methods: any, loading: boolean, onSubmit: any, width: string, handleVisibility: () => void } ) => {
    
    return (
        <Stack justifyContent={'center'} alignItems={'center'} width={'calc(50% - 3rem)'}>
            <FormProvider { ...methods }>
                <Card elevation={7} sx={{ position: 'relative', width, px: 3, py: 5, borderRadius: '16px' }}>
                    
                    <GeneralSpinner open={loading} />

                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Stack alignItems={'center'}>
                            <Image
                                alt='login-logo'
                                src={"/login/lafam-eye.webp"}
                                width={120}
                                height={70}
                            />
                            <Typography variant='h4'>¡Bienvenido de nuevo!</Typography>
                        </Stack>

                        <Stack mt={2} spacing={2}>
                            <FormInput
                                fieldLabel={'Usuario'}
                                fieldName={'user'}
                                isPassword={false}
                                required={true}
                                type='text'
                            />

                            <FormInput
                                fieldLabel={'Contraseña'}
                                fieldName={'pass'}
                                isPassword={true}
                                required={true}
                                type={type}
                                handleVisibility={handleVisibility}
                            />

                            <StyledButton type='submit' priority='primary' variant='contained' styles={{ marginTop: '2rem !important', marginBottom: '3rem' }} >
                                Iniciar Sesión
                            </StyledButton>
                            <StyledButton variant='text' priority='primary'>
                                Olvide mi contraseña
                            </StyledButton>
                        </Stack>
                    </form>
                </Card>
            </FormProvider>
        </Stack>
    )
}

const Login = () => {

    const {
        type,
        upMd,
        downMd,
        loading,
        methods,
        onSubmit,
        handleVisibility    
    } = useLogin();

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <title> Login </title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="style.css" />
            </Head>

            <Box>
                {
                    upMd &&
                        <Stack
                            direction={'row'}
                            spacing={2}
                        >
                            <Image
                                alt='login'
                                src={"/login/principalLogin.webp"}
                                priority
                                width={500}
                                height={500}
                                style={{
                                    width: '50%',
                                    height: 'calc(100vh - 2rem)',
                                    borderRadius: '24px',
                                    marginTop: '1rem',
                                    marginLeft: '1rem'
                                }}
                            />
                            <LoginForm
                                methods={methods}
                                handleVisibility={handleVisibility}
                                loading={loading}
                                type={type}
                                width='30vw'
                                onSubmit={onSubmit}
                            />
                        </Stack>
                }
                {
                    downMd &&
                        <Stack
                            sx={{
                                backgroundImage: 'url("/login/principalLogin.webp")',
                                marginLeft: '1rem',
                                marginTop: '1rem',
                                width: 'calc(100vw - 2rem)',
                                height: 'calc(100vh - 2rem)',
                                borderRadius: '16px'
                            }}
                        >
                            <LoginForm
                                methods={methods}
                                handleVisibility={handleVisibility}
                                loading={loading}
                                type={type}
                                width='60vw'
                                onSubmit={onSubmit}
                            />
                        </Stack>
                }

                <Toast />
            </Box>
            
        </>
    )
}

export default Login;
