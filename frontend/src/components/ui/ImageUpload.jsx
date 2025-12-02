import { useState } from 'react';
import { HiOutlinePhotograph, HiOutlineX } from 'react-icons/hi';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function ImageUpload({ value, onChange, label = 'Upload Image' }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB');
            return;
        }

        setError('');
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('thumbnail', file);

            const token = localStorage.getItem('authToken');
            const response = await axios.post(
                `${API_BASE_URL}/api/upload/project-thumbnail`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: token
                    }
                }
            );

            if (response.data.success) {
                onChange(response.data.thumbnail);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange('');
        setError('');
    };

    return (
        <div>
            {value ? (
                <div className="relative group">
                    <img
                        src={value}
                        alt="Upload"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-2 bg-white text-red-600 rounded-full shadow-md hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
                    >
                        <HiOutlineX size={16} />
                    </button>
                </div>
            ) : (
                <label className="block w-full h-48 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploading}
                    />
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        {uploading ? (
                            <>
                                <div className="w-8 h-8 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin mb-2"></div>
                                <p className="text-sm font-light">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <HiOutlinePhotograph size={32} className="mb-2" />
                                <p className="text-sm font-light">{label}</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                            </>
                        )}
                    </div>
                </label>
            )}
            {error && (
                <p className="text-xs text-red-500 mt-2 font-light">{error}</p>
            )}
        </div>
    );
}
