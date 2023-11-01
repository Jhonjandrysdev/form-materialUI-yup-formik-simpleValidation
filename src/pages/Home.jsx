import { Link, useNavigate } from "react-router-dom";
import { UserS } from "../context/UserContext";
import { useEffect, useState } from "react";
import { Login } from "../firebase/myapp";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Avatar, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { LoadingButton } from "@mui/lab";

const Home = () => {
  const [mensaje, setMensaje] = useState("")
  const { user } = UserS();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm },
  ) => {
    console.log({ email, password });
    try {
      const user = await Login({ email, password });
      console.log(user);
      resetForm();
      setMensaje()
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/invalid-login-credentials") {
        setMensaje("Correo o contraseña incorrecta")
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no valido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Minimo 6 caracteres")
      .required("Password requerido"),
  });

  return (
    <>
      <Box sx={{ mt: 8, maxWidth: 400, mx: "auto", textAlign: "center" }}>
        <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
          <AccountBoxIcon />
        </Avatar>

        <h1>Form Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isSubmitting,
            values,
            handleChange,
          }) => (

            <Box onSubmit={handleSubmit} sx={{ mt: 1 }} component="form">
              <TextField
                type="text"
                placeholder="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ mb: 3 }}
                label="Email"
                fullWidth
                id="email"
                value={values.email}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />
              <TextField
                type="password"
                placeholder="´Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                id="password"
                sx={{ mb: 3 }}
                label="Password"
                fullWidth
                errors={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
              <Box sx={{textAlign:"center", mb:2}}>{mensaje}</Box>

              <LoadingButton
              type="submit"
              variant="contained" 
              disabled={isSubmitting}
              loading={isSubmitting}
              fullWidth
              sx={{mb:3}}
              >
              Ingresar
              </LoadingButton>

              <Button
              fullWidth
              component={Link}
              to="/register"
              >
                ¿No tienes una cuenta? Registrate
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Home;
