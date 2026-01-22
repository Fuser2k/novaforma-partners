'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Loader2, Lock, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z.string().min(12, 'Password must be at least 12 characters')
            .regex(/[A-Z]/, 'Must contain an uppercase letter')
            .regex(/[a-z]/, 'Must contain a lowercase letter')
            .regex(/[0-9]/, 'Must contain a number')
            .regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export default function SecurityPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordForm>({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmit = async (data: ChangePasswordForm) => {
        setIsLoading(true);
        try {
            await axios.post('/api/admin/auth/change-password', {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            });

            toast.success('Password changed successfully. Please log in again.');
            reset();
            // Redirect to login after short delay
            setTimeout(() => {
                router.push('/admin/login');
            }, 1000);
        } catch (error: any) {
            console.error('Password change error:', error);
            const msg = error.response?.data?.error || 'Failed to change password';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 flex items-center">
                <ShieldCheck className="w-8 h-8 mr-3 text-blue-600" />
                Security Settings
            </h1>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 max-w-2xl">
                <h2 className="text-xl font-semibold mb-6 flex items-center border-b pb-4">
                    <Lock className="w-5 h-5 mr-2 text-slate-500" />
                    Change Password
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-md mb-6">
                        <strong>Password Requirements:</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-blue-700">
                            <li>Minimum 12 characters</li>
                            <li>At least one uppercase and one lowercase letter</li>
                            <li>At least one number</li>
                            <li>At least one special character</li>
                        </ul>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                        </label>
                        <input
                            type="password"
                            {...register('currentPassword')}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.currentPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            {...register('newPassword')}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.newPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            {...register('confirmPassword')}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Change Password'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
