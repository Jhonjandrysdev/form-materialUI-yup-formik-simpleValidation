import {useState} from 'react';
import {RegisterUser} from '../firebase/myapp';
import { redirectActiverUser } from '../hooks/RedirectActiveUser';
import { UserS } from '../context/UserContext';
import { Avatar, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { LoadingButton } from "@mui/lab";
import { Formik } from 'formik';
import * as Yup from "yup";
import { Link } from 'react-router-dom';

const Register = () => {
    const {user} = UserS
    redirectActiverUser(user, "/dashboard")

const onSubmit = async ({ email, password },
      { setSubmitting, setErrors, resetForm }) => {
        try {
          const user = await RegisterUser({email, password})
          console.log(user);
          resetForm()
        } catch (error) {
          console.log(error.code);
          console.log(error.message);
          if (error.code === "auth/email-already-in-use") {
              setErrors({email: "Correo ya esta en uso"})
          }
        } finally{
          setSubmitting(false)
        } 
  }

    const validationSchema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().trim().min(6).required(),

    })
    return (
      <>
      <Box sx={{ mt: 8, maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
          <PersonAddAltOutlinedIcon/>
        </Avatar>
        <h1>Register</h1>
  
        <Formik
        initialValues={{email:"", password:""}}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {
          ({
            values, isSubmitting, touched, errors, handleBlur, handleChange, handleSubmit
          }) => (
            <Box onSubmit={handleSubmit} sx={{mt:1}} component="form">
            <TextField
              type="text"
              placeholder="Escribe tu email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              sx={{mb:3}}
              fullWidth
              label="Email"
              name='email'
              id='email'
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />
            <TextField
              type="password"
              placeholder="Escribe tu contraseña"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              fullWidth
              label="Password"
              sx={{mb:3}}
              name='password'
              id='password'
              error={errors.password && touched.password}
              helperText={errors.password && touched.password && errors.password}

            />
            <LoadingButton 
            variant='contained' 
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            sx={{mb:3}}
            fullWidth
            >
            Registrar
            </LoadingButton>
            <Button
            fullWidth
            component={Link}
            to={"/"}>
              Ya tienes una cuenta? Inicia sesión
            </Button>
          </Box>
          )}
        </Formik>
        </Box>
      </>
    );
  };
  export default Register;
  