import { useRef, useState } from 'react';
import { HiOutlinePhotograph, HiOutlineX, HiOutlinePlus } from 'react-icons/hi';

export default function MultiImageUpload({ values = [], onChange, maxImages = 5 }) {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileSelect = async (files) => {
        if (!files || files.length === 0) return;

        const remainingSlots = maxImages - values.length;
        if (remainingSlots <= 0) {
            setError(`Maximum ${maxImages} images allowed`);
            return;
        }

        const filesToProcess = Array.from(files).slice(0, remainingSlots);
        setError('');
        setLoading(true);

        try {
            const processedImages = [];

            for (const file of filesToProcess) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    continue;
                }

                // Validate file size (5MB)
                if (file.size > 5 * 1024 * 1024) {
                    continue;
                }

                // Convert to base64
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                processedImages.push(base64);
            }

            onChange([...values, ...processedImages]);
        } catch (err) {
            setError('Failed to process images');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        handleFileSelect(e.target.files);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemove = (index) => {
        const newValues = values.filter((_, i) => i !== index);
        onChange(newValues);
    };

    const canAddMore = values.length < maxImages;

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {/* Existing Images */}
                {values.map((image, index) => (
                    <div key={index} className="relative group aspect-square">
                        <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg border border-gray-200"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition opacity-0 group-hover:opacity-100"
                        >
                            <HiOutlineX size={14} />
                        </button>
                    </div>
                ))}

                {/* Add More Button */}
                {canAddMore && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                        className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 hover:bg-gray-50/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <HiOutlinePlus className="w-8 h-8 text-gray-300 mb-1" />
                                <p className="text-xs text-gray-400 font-light">Add Image</p>
                                <p className="text-xs text-gray-400 font-light">
                                    {values.length}/{maxImages}
                                </p>
                            </>
                        )}
                    </button>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="hidden"
            />

            {error && (
                <p className="text-xs text-red-500 mt-2 font-light">{error}</p>
            )}

            <p className="text-xs text-gray-400 mt-2 font-light">
                Upload up to {maxImages} images (max 5MB each)
            </p>
        </div>
    );
}
