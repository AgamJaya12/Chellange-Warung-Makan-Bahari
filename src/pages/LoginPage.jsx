import React from "react";
import { Link } from "react-router-dom";
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
      // Simulate a login request
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.username === "admin" && data.password === "admin") {
            resolve("Login successful");
          } else {
            reject(new Error("Invalid username or password"));
          }
        }, 1000);
      });
      navigate("/home");
    } catch (error) {
      setError(error.message);
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
        <p>
          belum punya akun? <Link to="#">register</Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
