'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

type FormData = {
    title: string;
    price: string;
    category: string;
    description: string;
    image: string | null;
    images: string[];
};

type UploadProgress = {
    [key: number]: number;
};

type UploadResponse = {
    location: string;
};

export default function CreatePage() {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        price: '',
        category: '',
        description: '',
        image: null,
        images: [],
    });

    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const uploadImage = async (file: File, index: number): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const response: AxiosResponse<UploadResponse> = await axios.post(
            'https://api.escuelajs.co/api/v1/files/upload',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress((prevProgress) => ({
                            ...prevProgress,
                            [index]: progress,
                        }));
                    }
                },
            }
        );

        return response.data.location;
    };

    // @ts-ignore
    const { mutateAsync: uploadFileMutation } = useMutation(uploadImage, {
        onSuccess: (data, variables) => {
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, data],
            }));
            setIsUploading(false);
        },
    });

    const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { id, value, files } = e.target as HTMLInputElement & HTMLTextAreaElement;

        if (files) {
            setIsUploading(true);
            setUploadProgress((prevProgress) => ({
                ...prevProgress,
                [index]: 0,
            }));

            const file = files[0];
            // @ts-ignore
            await uploadFileMutation(file, index);

            setUploadProgress((prevProgress) => ({
                ...prevProgress,
                [index]: 100,
            }));
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const productData = {
            ...formData,
            image: formData.images[0],
        };

        try {
            const response = await axios.post(
                'https://fakestoreapi.com/products',
                JSON.stringify(productData),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response.data);
            setSuccessMessage('Product added successfully!');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                <form className="grid gap-6" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter product title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.title}
                            onChange={(e) => handleChange(e, 0)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            id="price"
                            type="number"
                            placeholder="Enter product price"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.price}
                            onChange={(e) => handleChange(e, 1)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            id="category"
                            type="text"
                            placeholder="Enter product category"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.category}
                            onChange={(e) => handleChange(e, 2)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            placeholder="Enter product description"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.description}
                            onChange={(e) => handleChange(e, 3)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            id="image"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-700"
                            onChange={(e) => handleChange(e, 4)}
                            disabled={isUploading}
                        />
                        {uploadProgress[4] !== undefined && (
                            <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
                                    <div
                                        className="h-2.5 rounded-full"
                                        style={{
                                            width: `${uploadProgress[4]}%`,
                                            backgroundColor: uploadProgress[4] === 100 ? 'blue' : 'blue',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                    {formData.images.map((image, index) => (
                        <div key={index + 5} className="grid gap-2">
                            <label htmlFor={`additionalImage${index}`} className="block text-sm font-medium text-gray-700">Additional Image</label>
                            <input
                                id={`additionalImage${index}`}
                                type="file"
                                className="mt-1 block w-full text-sm text-gray-700"
                                onChange={(e) => handleChange(e, index + 5)}
                                disabled={isUploading}
                            />
                            {uploadProgress[index + 5] !== undefined && (
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
                                        <div
                                            className="h-2.5 rounded-full"
                                            style={{
                                                width: `${uploadProgress[index + 5]}%`,
                                                backgroundColor: uploadProgress[index + 5] === 100 ? 'blue' : 'blue',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={isUploading || formData.images.length === 0}
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
}
