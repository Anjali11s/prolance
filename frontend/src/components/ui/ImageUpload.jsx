import { useRef, useState } from 'react';
import { HiOutlinePhotograph, HiOutlineX } from 'react-icons/hi';

export default function ImageUpload({ value, onChange, label = "Upload Image" }) {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = async (file) => {
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
        setLoading(true);

        try {
            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result);
                setLoading(false);
            };
            reader.onerror = () => {
                setError('Failed to read file');
                setLoading(false);
            };
            reader.readAsDataURL(file);
        } catch (err) {
            setError('Failed to process image');
            setLoading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        handleFileSelect(file);
    };

    const handleRemove = () => {
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            {value ? (
                <div className="relative group">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition opacity-0 group-hover:opacity-100"
                    >
                        <HiOutlineX size={16} />
                    </button>
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${isDragging
                            ? 'border-green-400 bg-green-50/30'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/30'
                        }`}
                >
                    {loading ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm text-gray-500 font-light">Processing...</p>
                        </div>
                    ) : (
                        <>
                            <HiOutlinePhotograph className="w-10 h-10 text-gray-300 mb-2" />
                            <p className="text-sm text-gray-600 font-light mb-1">{label}</p>
                            <p className="text-xs text-gray-400 font-light">
                                Drag & drop or click to browse
                            </p>
                            <p className="text-xs text-gray-400 font-light mt-1">
                                Max size: 5MB
                            </p>
                        </>
                    )}
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
            />

            {error && (
                <p className="text-xs text-red-500 mt-2 font-light">{error}</p>
            )}
        </div>
    );
}
