import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../lib/axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const schema = z.object({
    username: z.string().min(4, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      console.log("form data: ", data);
      const response = await AxiosInstance.post('/login', {
        username: data.username,
        password: data.password
      });

      localStorage.setItem('token', response.data.token);
      
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-[400px] flex flex-col gap-3 p-5 m-auto mt-20 shadow-lg rounded-lg">
      <CardHeader className="flex gap-3 justify-center items-center">
        <div className="flex flex-col">
          <p className="text-md">Login User</p>
          <p className="text-small text-default-500">please in your account</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-5 justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <Input
              {...register('username')}
              isRequired
              className="max-w-xs w-full"
              placeholder="username"
              label="username"
              type="text"
              isInvalid={!!errors.username}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>
          
          <div>
            <Input
              {...register('password')}
              isRequired
              className="max-w-xs w-full"
              placeholder="password"
              label="password"
              type="password"
              isInvalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            color="primary"
            type="submit"
            className="w-full"
            isLoading={loading}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-col gap-3">
      <div className="flex justify-center w-full mt-[-16px] ">
								<p className="text-gray-600 text-sm">
									belum punya akun?{" "}
									<span
										className="underline hover:cursor-pointer"
										onClick={() => navigate("/register")}
									>
										daftar sekarang
									</span>
								</p>
							</div>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
