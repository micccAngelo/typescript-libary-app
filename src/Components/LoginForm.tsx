import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Reusable/Buttons';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Modals from '../Reusable/Modals';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginAPI from '../API Services/LoginAPI';
import './LoginForm.css';

interface LoginFormProps {
  onLogin: (userId: string) => void;
}

function LoginForm({ onLogin }: LoginFormProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values: { email: string, password: string }, { setSubmitting, setErrors }: { setSubmitting: (isSubmitting: boolean) => void, setErrors: (errors: { submitError?: string }) => void }) => {
    try {
      const data = await LoginAPI(values.email, values.password);
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('username', data.username);
      setShowSuccess(true);
      onLogin(data.user_id);
      setUsername(data.username);
      setTimeout(() => {
        navigate('/book');
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrors({ submitError: 'Invalid email or password' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="Forms">
      <Card className="Form" style={{ width: '40%' }}>
        <h1 className="title">Login</h1>
        <Formik
          initialValues={{ email: '', password: '', submitError: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <FormikForm>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className={touched.email && errors.email ? "form-control is-invalid" : "form-control"}
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={touched.password && errors.password ? "form-control is-invalid" : "form-control"}
                />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </Form.Group>
              <Buttons variant='primary' label='Submit' type={'submit'} disabled={isSubmitting} />
              {errors.submitError && (
                <div className="alert alert-danger mt-3">{errors.submitError}</div>
              )}
            </FormikForm>
          )}
        </Formik>
        <Modals
          show={showSuccess}
          onHide={() => setShowSuccess(false)}
          title="Success!"
          message={`Hello ${username}!`}
        />
      </Card>
    </div>
  );
}

export default LoginForm;
