"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/app/components/button";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "@/app/components/Dropdown";
import EmailInput from "@/components/EmailInputOrigin";
import PassWordInput from "@/components/PasswordInputOrigin";
import PasswordCheckOrigin from "@/components/PasswordCheckOrigin";

type Option = { id: number; name: string };

type RegisterFormData = {
  fullName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  telephone: string;
  profession: string;
  speciality: string;
  country: string;
  city: string;
};

const countries: Option[] = [
  { id: 1, name: "Egypt" },
  { id: 2, name: "USA" },
  { id: 3, name: "UK" },
];

const cities: Option[] = [
  { id: 1, name: "Cairo" },
  { id: 2, name: "Alexandria" },
  { id: 3, name: "Giza" },
];

const professions: Option[] = [
  { id: 1, name: "Software Developer" },
  { id: 2, name: "Designer" },
  { id: 3, name: "Engineer" },
];

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [selectedCountry, setSelectedCountry] = useState<Option>(countries[0]);
  const [selectedCity, setSelectedCity] = useState<Option>(cities[0]);
  const [selectedProfession, setSelectedProfession] = useState<Option>(professions[0]);

  const onSubmit = (data: RegisterFormData) => {
    console.log({
      ...data,
      country: selectedCountry.name,
      city: selectedCity.name,
      profession: selectedProfession.name,
    });
  };

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  return (
    <div className="min-h-screen flex">
      {/* Left section */}
      <div className="hidden md:flex md:w-1/2 bg-purple-800 text-white flex-col justify-center items-center p-8">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-6 h-6 rounded-md bg-purple-400 mr-2"></div>
            <span className="text-lg font-medium">Untitled UI</span>
          </div>
          <p className="text-xl font-medium mb-6">
            We’ve been using Untitled to kick start every new project and can’t imagine working without it.
          </p>
          <div className="flex flex-col items-center">
            <Image
              src="/avatar.png"
              alt="Kelly Williams"
              width={48}
              height={48}
              className="rounded-full border-2 border-purple-300"
            />
            <p className="mt-2 font-medium">Kelly Williams</p>
            <p className="text-sm text-purple-200">Head of Design, Layers</p>
            <div className="flex mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
          </div>
          <p className="text-xs text-purple-300 mt-8">© Untitled UI 2077</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-gray-500 mb-6">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                {...register("fullName", { required: "Full Name is required" })}
                type="text"
                placeholder="Enter your Name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium">Age</label>
              <input
                {...register("age", { required: "Age is required" })}
                type="number"
                placeholder="Enter your Age"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <EmailInput
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <PassWordInput
                  {...register("password", { required: "Password is required" })}
                  placeholder="********"
                  label="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <div>
                <PasswordCheckOrigin
                  register={register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                  passwordValue={passwordValue}
                  confirmPasswordValue={confirmPasswordValue}
                  error={errors.confirmPassword?.message}
                />
              </div>
            </div>

            {/* Telephone */}
            <div>
              <label className="block text-sm font-medium">Telephone</label>
              <input
                {...register("telephone")}
                type="tel"
                placeholder="Enter your Telephone number"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Profession */}
            <Dropdown
              label="Profession"
              options={professions}
              value={selectedProfession}
              onChange={setSelectedProfession}
            />

            {/* Speciality */}
            <div>
              <label className="block text-sm font-medium">Speciality</label>
              <input
                {...register("speciality")}
                type="text"
                placeholder="Enter your Speciality"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Country & City */}
            <div className="grid grid-cols-2 gap-4 ">
              <Dropdown
                label="Country"
                options={countries}
                value={selectedCountry}
                onChange={setSelectedCountry}
              />
              <Dropdown
                label="City"
                options={cities}
                value={selectedCity}
                onChange={setSelectedCity}
              />
            </div>

            {/* Submit */}
            <Button type="submit" label="register">
              Sign UP
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center mt-4">
            have an account?{" "}
            <Link href="/auth/login" className="text-purple-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
